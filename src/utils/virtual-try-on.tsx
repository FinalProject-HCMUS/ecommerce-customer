import { pipeline, env } from '@huggingface/transformers';

env.allowLocalModels = false;

interface SegmentationMask {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

interface SegmentationSegment {
  label: string;
  mask: SegmentationMask;
}

interface FaceData {
  originalImage: HTMLImageElement;
  faceMask: SegmentationMask;
  faceImageData: ImageData;
}

// New API interfaces
interface TryOnRequest {
  service: 'idm-vton' | 'gemini';
  humanImage: string; // base64 data URL (faceless)
  garmentImage: string; // base64 data URL
}

interface VirtualTryOnResult {
  success: boolean;
  data?: {
    outputImage: string; //base64
    maskedImage?: string; //base64
    description?: string;
    isRecoverable: boolean;
  };
  error?: string;
  service: string;
}

/**
 * Run image segmentation to get body part masks
 */
export async function runSegmentation(
  imageUrl: string,
  partsToSegment: string[] | null = null
): Promise<SegmentationSegment[]> {
  try {
    const modelOptions = {
      revision: 'main',
      cache_dir: './model_cache',
      quantized: false,
    };

    const segmenter = await pipeline(
      'image-segmentation',
      'Xenova/segformer_b2_clothes',
      modelOptions
    );

    const output = await Promise.race([
      segmenter(imageUrl),
      new Promise<Error>((_, reject) =>
        setTimeout(
          () => reject(new Error('Segmentation timed out after 60s')),
          60000
        )
      ),
    ]);

    if (Array.isArray(output)) {
      return partsToSegment && partsToSegment.length > 0
        ? output
            .filter(
              (segment) =>
                segment.label !== null && partsToSegment.includes(segment.label)
            )
            .map((segment) => ({
              label: segment.label as string,
              mask: segment.mask,
            }))
        : output.map((segment) => ({
            label: segment.label as string,
            mask: segment.mask,
          }));
    }

    throw new Error('Unexpected segmentation output format');
  } catch (error) {
    console.error('Segmentation error:', error);
    throw error;
  }
}

/**
 * Process segmentation masks into usable formats
 */
interface ProcessedMask {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  data: Uint8ClampedArray;
  imageData: ImageData;
  colorSpace: PredefinedColorSpace;
}

interface ProcessedMasksMap {
  [label: string]: ProcessedMask;
}

interface ProcessMasksResult {
  originalImage: HTMLImageElement;
  processedMasks: ProcessedMasksMap;
  width: number;
  height: number;
  compositeCanvas: HTMLCanvasElement;
  filteredSegments: SegmentationSegment[];
}

export async function processMasks(
  segmentationOutput: SegmentationSegment[],
  originalImageUrl: string,
  selectedParts: string[] | null = null
): Promise<ProcessMasksResult> {
  const originalImage = await loadImage(originalImageUrl);
  const processedMasks: ProcessedMasksMap = {};

  const filteredSegments: SegmentationSegment[] =
    selectedParts && selectedParts?.length > 0
      ? segmentationOutput.filter((segment) =>
          selectedParts.includes(segment.label)
        )
      : segmentationOutput;

  for (const segment of filteredSegments) {
    const { label, mask } = segment;

    const canvas = document.createElement('canvas');
    canvas.width = mask.width;
    canvas.height = mask.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas rendering context');
    }

    const imageData = createMaskImageData(mask);
    ctx.putImageData(imageData, 0, 0);

    processedMasks[label] = {
      canvas,
      width: mask.width,
      height: mask.height,
      data: mask.data,
      imageData,
      colorSpace: 'srgb',
    };
  }

  const compositeCanvas = await createCompositeView(
    filteredSegments,
    originalImage
  );

  return {
    originalImage,
    processedMasks,
    width: originalImage.width,
    height: originalImage.height,
    compositeCanvas,
    filteredSegments,
  };
}

async function createCompositeView(
  segments: SegmentationSegment[],
  originalImage: HTMLImageElement
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  canvas.className = 'main-composite-canvas';

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas rendering context');
  }
  ctx.drawImage(originalImage, 0, 0);

  const colorMap = new Map();
  segments.forEach((segment, index) => {
    if (!colorMap.has(segment.label)) {
      const hue = Math.floor(index * 137.5) % 360;
      colorMap.set(segment.label, `hsla(${hue}, 100%, 50%, 0.5)`);
    }

    const color = colorMap.get(segment.label);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = segment.mask.width;
    tempCanvas.height = segment.mask.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      throw new Error('Failed to get canvas rendering context');
    }

    const imageData = new ImageData(
      new Uint8ClampedArray(segment.mask.width * segment.mask.height * 4),
      segment.mask.width,
      segment.mask.height
    );

    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const colorStyle = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const rgbMatch = colorStyle.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/
    );

    if (!rgbMatch) {
      console.error('Failed to parse color:', color);
      return;
    }

    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) * 255 : 128;

    for (let i = 0; i < segment.mask.data.length; i++) {
      const value = segment.mask.data[i];
      if (value > 128) {
        imageData.data[i * 4] = r;
        imageData.data[i * 4 + 1] = g;
        imageData.data[i * 4 + 2] = b;
        imageData.data[i * 4 + 3] = a;
      }
    }

    tempCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
  });

  return canvas;
}

function createMaskImageData(mask: SegmentationMask): ImageData {
  const rgbaData = new Uint8ClampedArray(mask.width * mask.height * 4);

  for (let i = 0; i < mask.data.length; i++) {
    const value = mask.data[i];
    rgbaData[i * 4] = value;
    rgbaData[i * 4 + 1] = value;
    rgbaData[i * 4 + 2] = value;
    rgbaData[i * 4 + 3] = 255;
  }

  return new ImageData(rgbaData, mask.width, mask.height);
}

/**
 * Load an image from URL as a Promise
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Extract face data from segmentation results
 */
// Only updating the relevant parts of the file

/**
 * Extract face data from segmentation results
 */
export async function extractFaceData(
  originalImageUrl: string,
  segmentationOutput: SegmentationSegment[]
): Promise<FaceData | null> {
  // Be more flexible in finding the face segment - case insensitive
  const faceSegment = segmentationOutput.find(
    seg => seg.label.toLowerCase() === 'face'
  );
  
  if (!faceSegment) {
    console.warn("No face segment found in segmentation output");
    return null;
  }

  const originalImage = await loadImage(originalImageUrl);
  
  // Create canvas for face extraction
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas rendering context');
  }

  ctx.drawImage(originalImage, 0, 0);
  const faceImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Debug info
  console.log("Face mask dimensions:", faceSegment.mask.width, "x", faceSegment.mask.height);
  console.log("Image dimensions:", originalImage.width, "x", originalImage.height);
  
  // Validate mask has data
  if (faceSegment.mask.data.length === 0) {
    console.warn("Face mask has no data");
    return null;
  }

  return {
    originalImage,
    faceMask: faceSegment.mask,
    faceImageData,
  };
}

/**
 * Create faceless version of the image
 */
export async function createFacelessImage(
  originalImageUrl: string,
  faceData: FaceData
): Promise<string> {
  const originalImage = await loadImage(originalImageUrl);
  
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas rendering context');
  }

  ctx.drawImage(originalImage, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Calculate scaling factors between mask and image dimensions
  const { faceMask } = faceData;
  const widthScale = faceMask.width / canvas.width;
  const heightScale = faceMask.height / canvas.height;
  
  console.log("Faceless image creation - Scale factors:", widthScale, heightScale);
  
  // For debugging - count pixels that are part of the face
  let facePixelCount = 0;
  
  // Create a consistent blur effect for the face area
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      // Convert from image coordinates to mask coordinates
      const maskX = Math.floor(x * widthScale);
      const maskY = Math.floor(y * heightScale);
      
      // Ensure mask coordinates are within bounds
      if (maskX >= 0 && maskX < faceMask.width && 
          maskY >= 0 && maskY < faceMask.height) {
        
        const maskIndex = maskY * faceMask.width + maskX;
        
        // Check if this pixel is part of the face (using a threshold)
        if (maskIndex < faceMask.data.length && faceMask.data[maskIndex] > 128) {
          facePixelCount++;
          const pixelIndex = (y * canvas.width + x) * 4;
          
          // Apply a stronger blur to face area
          // Simple gaussian-like blur with bigger radius
          let r = 0, g = 0, b = 0, count = 0;
          const blurRadius = 5;
          
          for (let dy = -blurRadius; dy <= blurRadius; dy++) {
            for (let dx = -blurRadius; dx <= blurRadius; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              
              if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
                const nPixelIndex = (ny * canvas.width + nx) * 4;
                r += imageData.data[nPixelIndex];
                g += imageData.data[nPixelIndex + 1];
                b += imageData.data[nPixelIndex + 2];
                count++;
              }
            }
          }
          
          if (count > 0) {
            imageData.data[pixelIndex] = r / count;
            imageData.data[pixelIndex + 1] = g / count;
            imageData.data[pixelIndex + 2] = b / count;
          }
        }
      }
    }
  }
  
  console.log(`Processed ${facePixelCount} face pixels for blurring`);
  
  // If we didn't blur any pixels, something might be wrong
  if (facePixelCount === 0) {
    console.warn("No face pixels were blurred - check mask scaling");
  }

  ctx.putImageData(imageData, 0, 0);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create faceless image blob'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.95);
  });
}

/**
 * Convert image URL to base64 data URL
 */
export const imageUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image URL to base64:', error);
    throw error;
  }
};

/**
 * Process virtual try-on using your new API with faceless image
 */
export const processVirtualTryOn = async (
  facelessImageBase64: string,
  garmentImageUrl: string,
  apiUrl: string = 'https://vton-middle-api.vercel.app/api/tryon',
  service: 'idm-vton' | 'gemini' = 'idm-vton'
): Promise<VirtualTryOnResult> => {
  try {
    // Convert garment image to base64
    const garmentImageBase64 = await imageUrlToBase64(garmentImageUrl);

    const requestData: TryOnRequest = {
      service,
      humanImage: facelessImageBase64, // Already base64 faceless image
      garmentImage: garmentImageBase64,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: VirtualTryOnResult = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Virtual try-on failed');
    }

    return result;
  } catch (error) {
    console.error('Virtual try-on API error:', error);
    throw error;
  }
};

/**
 * Recover face in a try-on image using the original face data
 */
export async function recoverFace(
  tryOnImageBase64: string,
  faceData: FaceData
): Promise<string> {
  const { originalImage, faceMask, faceImageData } = faceData;

  // Convert base64 to image
  const tryOnImage = await loadImage(tryOnImageBase64);

  const canvas = document.createElement('canvas');
  canvas.width = tryOnImage.width;
  canvas.height = tryOnImage.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas rendering context');
  }

  ctx.drawImage(tryOnImage, 0, 0);
  const tryOnImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Blend face back into the try-on result
  blendFace(tryOnImageData, faceImageData, faceMask, canvas.width, canvas.height);

  ctx.putImageData(tryOnImageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create recovered face blob'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.95);
  });
}

function blendFace(
  targetImageData: ImageData,
  sourceImageData: ImageData,
  faceMask: SegmentationMask,
  targetWidth: number,
  targetHeight: number
): void {
  const targetData = targetImageData.data;
  const sourceData = sourceImageData.data;

  const widthScale = sourceImageData.width / targetWidth;
  const heightScale = sourceImageData.height / targetHeight;
  const maskWidthScale = faceMask.width / sourceImageData.width;
  const maskHeightScale = faceMask.height / sourceImageData.height;

  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const sourceX = Math.floor(x * widthScale);
      const sourceY = Math.floor(y * heightScale);

      const maskX = Math.floor(sourceX * maskWidthScale);
      const maskY = Math.floor(sourceY * maskHeightScale);
      const maskIndex = maskY * faceMask.width + maskX;
      const maskValue = faceMask.data[maskIndex];

      if (maskValue > 128) {
        const targetIndex = (y * targetWidth + x) * 4;
        const sourceIndex = (sourceY * sourceImageData.width + sourceX) * 4;

        const alpha = maskValue / 255;

        targetData[targetIndex] = Math.round(
          sourceData[sourceIndex] * alpha +
            targetData[targetIndex] * (1 - alpha)
        );
        targetData[targetIndex + 1] = Math.round(
          sourceData[sourceIndex + 1] * alpha +
            targetData[targetIndex + 1] * (1 - alpha)
        );
        targetData[targetIndex + 2] = Math.round(
          sourceData[sourceIndex + 2] * alpha +
            targetData[targetIndex + 2] * (1 - alpha)
        );
      }
    }
  }
}
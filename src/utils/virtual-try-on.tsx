import { pipeline, env } from '@huggingface/transformers';
import { Client } from '@gradio/client';

env.allowLocalModels = false;

/**
 * Run image segmentation to get body part masks
 * @param {string} imageUrl - URL of the image to segment
 * @param {string[] | null} partsToSegment - List of specific parts to segment (null for all parts)
 * @returns {Promise<Object[]>} The raw segmentation output
 */
export async function runSegmentation(
  imageUrl: string,
  partsToSegment: string[] | null = null
): Promise<SegmentationSegment[]> {
  try {
    // console.log("Starting segmentation for:", imageUrl);
    // console.log("Parts to segment:", partsToSegment);

    // Configure a specific cache directory to avoid potential permission issues
    const modelOptions = {
      revision: 'main',
      cache_dir: './model_cache',
      quantized: false,
    };

    // Load the segmentation model
    const segmenter = await pipeline(
      'image-segmentation',
      'Xenova/segformer_b2_clothes',
      modelOptions
    );

    // console.log("Model loaded successfully");
    // console.log("Processing image:", imageUrl);

    // Add timeout to handle potential slow loads
    const output = await Promise.race([
      segmenter(imageUrl),
      new Promise<Error>((_, reject) =>
        setTimeout(
          () => reject(new Error('Segmentation timed out after 60s')),
          60000
        )
      ),
    ]);

    // console.log("Segmentation complete, found segments:", output.length);

    // If parts to segment are specified, filter the output
    if (partsToSegment && partsToSegment.length > 0) {
      //   console.log("Filtering for parts:", partsToSegment);
      return output.filter((segment: any) =>
        partsToSegment.includes(segment.label)
      );
    }

    return output;
  } catch (error) {
    console.error('Segmentation error:', error);
    throw error;
  }
}

/**
 * Process segmentation masks into usable formats
 * @param {Object[]} segmentationOutput - Output from runSegmentation
 * @param {string} originalImageUrl - URL of the original image
 * @param {string[]|null} selectedParts - List of specific parts to include (null for all)
 * @returns {Promise<Object>} Processed masks info including composite view and individual segments
 */
interface SegmentationMask {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

interface SegmentationSegment {
  label: string;
  mask: SegmentationMask;
}

interface ProcessedMask {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  data: Uint8ClampedArray;
  imageData: ImageData;
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
  // console.log("Processing masks with selected parts:", selectedParts);

  // Load the original image to get dimensions
  const originalImage = await loadImage(originalImageUrl);

  // Create a map to store processed masks by label
  const processedMasks: ProcessedMasksMap = {};

  // Filter results based on selected parts if needed
  const filteredSegments: SegmentationSegment[] =
    selectedParts && selectedParts?.length > 0
      ? segmentationOutput.filter((segment) =>
          selectedParts.includes(segment.label)
        )
      : segmentationOutput;

  // console.log("Processing segments:", filteredSegments.map(s => s.label).join(", "));

  // Process each segment
  for (const segment of filteredSegments) {
    const { label, mask } = segment;

    // Create a canvas for this mask
    const canvas = document.createElement('canvas');
    canvas.width = mask.width;
    canvas.height = mask.height;
    const ctx = canvas.getContext('2d');

    // Convert mask data to RGBA
    const imageData = createMaskImageData(mask);

    // Put the image data on canvas
    ctx.putImageData(imageData, 0, 0);

    // Store processed mask
    processedMasks[label] = {
      canvas,
      width: mask.width,
      height: mask.height,
      data: mask.data,
      imageData,
    };
  }

  // Create the composite view with colored overlays
  const compositeCanvas = await createCompositeView(
    filteredSegments,
    originalImage,
    originalImageUrl
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

/**
 * Create composite view with colored overlays
 * @param {Object[]} segments - Filtered segmentation results
 * @param {HTMLImageElement} originalImage - Original loaded image
 * @param {string} imageUrl - URL of the original image (for error handling)
 * @returns {Promise<HTMLCanvasElement>} Canvas with composite view
 */
async function createCompositeView(segments, originalImage, imageUrl) {
  // console.log("Creating composite view");

  // Create canvas for the composite image
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  canvas.className = 'main-composite-canvas';

  const ctx = canvas.getContext('2d');

  // Draw the original image
  ctx.drawImage(originalImage, 0, 0);

  // console.log(`Creating overlays for ${segments.length} segments`);

  // Create a colormap
  const colorMap = new Map();
  segments.forEach((segment, index) => {
    if (!colorMap.has(segment.label)) {
      const hue = Math.floor(index * 137.5) % 360;
      colorMap.set(segment.label, `hsla(${hue}, 100%, 50%, 0.5)`);
    }

    const color = colorMap.get(segment.label);

    // Create temp canvas for the mask
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = segment.mask.width;
    tempCanvas.height = segment.mask.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Create color overlay
    const imageData = new ImageData(
      new Uint8ClampedArray(segment.mask.width * segment.mask.height * 4),
      segment.mask.width,
      segment.mask.height
    );

    // Parse color value to RGBA
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const colorStyle = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    // Extract RGB values
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

    // Create colored overlay
    for (let i = 0; i < segment.mask.data.length; i++) {
      const value = segment.mask.data[i];
      if (value > 128) {
        imageData.data[i * 4] = r;
        imageData.data[i * 4 + 1] = g;
        imageData.data[i * 4 + 2] = b;
        imageData.data[i * 4 + 3] = a;
      }
    }

    // Put mask on temp canvas
    tempCtx.putImageData(imageData, 0, 0);

    // Overlay on main canvas
    ctx.drawImage(tempCanvas, 0, 0);
  });

  return canvas;
}

/**
 * Create HTML elements to display individual segmentation results
 * @param {Object[]} segments - Filtered segments to display
 * @param {string} cssPrefix - Prefix for CSS classes (e.g. "seg-")
 * @returns {HTMLElement} Container with all segment visualizations
 */
export function createSegmentElements(segments, cssPrefix = '') {
  // Use the CSS prefix for all classes
  const containerClass = `${cssPrefix}segments-container`;
  const noResultsClass = `${cssPrefix}no-results`;
  const gridClass = `${cssPrefix}segments-grid`;
  const cardClass = `${cssPrefix}segment-card`;
  const canvasContainerClass = `${cssPrefix}segment-canvas-container`;
  const canvasClass = `${cssPrefix}segment-canvas`;
  const labelClass = `${cssPrefix}segment-label`;

  // Container for segments
  const segmentsContainer = document.createElement('div');
  segmentsContainer.className = containerClass;

  // Show message if no matching segments
  if (segments.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = noResultsClass;
    noResults.textContent = 'No matching segments found';
    segmentsContainer.appendChild(noResults);
    return segmentsContainer;
  }

  // Display each segment in a grid
  const segmentsGrid = document.createElement('div');
  segmentsGrid.className = gridClass;

  for (const segment of segments) {
    const segmentCard = document.createElement('div');
    segmentCard.className = cardClass;

    // Create a container for the canvas
    const canvasContainer = document.createElement('div');
    canvasContainer.className = canvasContainerClass;

    // Create canvas for the segment
    const canvas = document.createElement('canvas');
    canvas.width = segment.mask.width;
    canvas.height = segment.mask.height;
    canvas.className = canvasClass;

    const ctx = canvas.getContext('2d');

    // Convert mask data to image
    const rgbaData = new Uint8ClampedArray(
      segment.mask.width * segment.mask.height * 4
    );

    // Create a colored version of the mask
    const hue = Math.floor(segments.indexOf(segment) * 137.5) % 360;

    for (let i = 0; i < segment.mask.data.length; i++) {
      const value = segment.mask.data[i];
      if (value > 128) {
        // Use white for the mask
        rgbaData[i * 4] = 255; // R
        rgbaData[i * 4 + 1] = 255; // G
        rgbaData[i * 4 + 2] = 255; // B
      } else {
        // Use a colored background for better visibility
        const h = hue;
        const s = 80;
        const l = 40;

        // Simple HSL to RGB conversion for background
        const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l / 100 - c / 2;

        let r, g, b;

        if (h < 60) {
          [r, g, b] = [c, x, 0];
        } else if (h < 120) {
          [r, g, b] = [x, c, 0];
        } else if (h < 180) {
          [r, g, b] = [0, c, x];
        } else if (h < 240) {
          [r, g, b] = [0, x, c];
        } else if (h < 300) {
          [r, g, b] = [x, 0, c];
        } else {
          [r, g, b] = [c, 0, x];
        }

        rgbaData[i * 4] = Math.round((r + m) * 255); // R
        rgbaData[i * 4 + 1] = Math.round((g + m) * 255); // G
        rgbaData[i * 4 + 2] = Math.round((b + m) * 255); // B
      }

      // Always fully opaque
      rgbaData[i * 4 + 3] = 255; // A
    }

    const imageData = new ImageData(
      rgbaData,
      segment.mask.width,
      segment.mask.height
    );

    ctx.putImageData(imageData, 0, 0);
    canvasContainer.appendChild(canvas);
    segmentCard.appendChild(canvasContainer);

    // Add label below the canvas
    const label = document.createElement('div');
    label.className = labelClass;
    label.textContent = segment.label;
    segmentCard.appendChild(label);

    segmentsGrid.appendChild(segmentCard);
  }

  segmentsContainer.appendChild(segmentsGrid);
  return segmentsContainer;
}

/**
 * Create ImageData from a segmentation mask
 * @param {Object} mask - Mask object from segmentation
 * @returns {ImageData} ImageData for the mask
 */
function createMaskImageData(mask: objet) {
  // Convert single-channel mask to RGBA
  const rgbaData = new Uint8ClampedArray(mask.width * mask.height * 4);

  for (let i = 0; i < mask.data.length; i++) {
    const value = mask.data[i];
    rgbaData[i * 4] = value; // R
    rgbaData[i * 4 + 1] = value; // G
    rgbaData[i * 4 + 2] = value; // B
    rgbaData[i * 4 + 3] = 255; // A (fully opaque)
  }

  return new ImageData(rgbaData, mask.width, mask.height);
}

/**
 * Load an image from URL as a Promise
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>} Loaded image
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
 * Remove face from an image using segmentation masks
 * @param {Object} processedData - Data from processMasks
 * @param {string} blurMethod - Method to use (blur, blackout, pixelate)
 * @returns {Promise<Blob>} Image blob with face removed
 */
export async function removeFace(processedData) {
  const { originalImage, processedMasks, width, height } = processedData;

  // Check if we have face mask
  if (!processedMasks.Face) {
    throw new Error('No face detected in the image');
  }

  // Create a canvas for the faceless image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Draw original image
  ctx.drawImage(originalImage, 0, 0);

  // Get face mask
  const faceMask = processedMasks.Face;

  applyPixelation(ctx, faceMask, 10);

  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      'image/jpeg',
      0.95
    );
  });
}

/**
 * Apply pixelation to face area
 */
function applyPixelation(ctx, faceMask, blockSize) {
  // Get image data
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  // Create a map of pixels that are part of the face
  const facePixels = new Set();

  for (let y = 0; y < ctx.canvas.height; y++) {
    for (let x = 0; x < ctx.canvas.width; x++) {
      const maskX = Math.floor(x * (faceMask.width / ctx.canvas.width));
      const maskY = Math.floor(y * (faceMask.height / ctx.canvas.height));
      const maskIndex = maskY * faceMask.width + maskX;
      const maskValue = faceMask.data[maskIndex];

      if (maskValue > 128) {
        facePixels.add(`${x},${y}`);
      }
    }
  }

  // Apply pixelation to face pixels
  for (let y = 0; y < ctx.canvas.height; y += blockSize) {
    for (let x = 0; x < ctx.canvas.width; x += blockSize) {
      // Check if any pixel in this block is part of the face
      let hasFacePixel = false;

      for (let by = 0; by < blockSize && y + by < ctx.canvas.height; by++) {
        for (let bx = 0; bx < blockSize && x + bx < ctx.canvas.width; bx++) {
          if (facePixels.has(`${x + bx},${y + by}`)) {
            hasFacePixel = true;
            break;
          }
        }
        if (hasFacePixel) break;
      }

      if (hasFacePixel) {
        // Calculate average color for this block
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let by = 0; by < blockSize && y + by < ctx.canvas.height; by++) {
          for (let bx = 0; bx < blockSize && x + bx < ctx.canvas.width; bx++) {
            const pixelIndex = ((y + by) * ctx.canvas.width + (x + bx)) * 4;
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            count++;
          }
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        // Apply average color to all pixels in this block that are part of the face
        for (let by = 0; by < blockSize && y + by < ctx.canvas.height; by++) {
          for (let bx = 0; bx < blockSize && x + bx < ctx.canvas.width; bx++) {
            if (facePixels.has(`${x + bx},${y + by}`)) {
              const pixelIndex = ((y + by) * ctx.canvas.width + (x + bx)) * 4;
              data[pixelIndex] = r;
              data[pixelIndex + 1] = g;
              data[pixelIndex + 2] = b;
            }
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Convert image URL to blob
 * @param {string} url - URL of the image
 * @returns {Promise<Blob>} Image blob
 */
export const imageUrlToBlob = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url);
    return await response.blob();
  } catch (error) {
    console.error('Error converting image URL to blob:', error);
    throw error;
  }
};

/**
 * Process virtual try-on with HuggingFace using Gradio client
 * @param {string} personImageUrl - URL of the person image with protected face
 * @param {string} garmentImageUrl - URL of the garment image
 * @param {string} apiKey - HuggingFace API key
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} URL of the resulting try-on image
 */
export const processVirtualTryOn = async (
  personImageUrl: string,
  garmentImageUrl: string,
  apiKey: string,
  options: {
    modelEndpoint?: string;
    inferenceSteps?: number;
    guidanceScale?: number;
    seed?: number;
  } = {}
): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is required for HuggingFace service');
  }

  // Default options
  const {
    modelEndpoint = 'zhengchong/CatVTON',
    inferenceSteps = 20,
    guidanceScale = 2.5,
    seed = 10000,
  } = options;

  try {
    // console.log(`Connecting to HuggingFace model: ${modelEndpoint}`);

    // Convert image URLs to blobs
    const personBlob = await imageUrlToBlob(personImageUrl);
    const garmentBlob = await imageUrlToBlob(garmentImageUrl);

    // Initialize the Gradio client with the API endpoint
    const client = await Client.connect(modelEndpoint, {
      hf_token: apiKey,
    });

    // console.log("Gradio client connected, sending request");

    // Send the prediction request
    const result = await client.predict('/submit_function_p2p', [
      {
        // person_image
        background: personBlob,
        layers: [personBlob],
        composite: personBlob,
      },
      garmentBlob, // cloth_image
      inferenceSteps, // num_inference_steps
      guidanceScale, // guidance_scale
      seed, // seed
    ]);

    // console.log("Received response from HuggingFace model:", result);

    // Gradio client returns an array of results
    if (result && Array.isArray(result.data) && result.data.length > 0) {
      const imageData = result.data[0];
      //   console.log("Result image data:", imageData);

      // Check if the result is a FileData object with a URL property
      if (imageData && typeof imageData === 'object' && imageData.url) {
        // console.log("Found image URL in response:", imageData.url);

        // Check if URL is relative or absolute
        if (imageData.url.startsWith('http')) {
          return imageData.url;
        } else {
          const baseUrl = 'https://zhengchong-catvton.hf.space';
          const fullUrl = new URL(imageData.url, baseUrl).href;
          //   console.log("Constructed full URL:", fullUrl);
          return fullUrl;
        }
      }

      // Handle other possible formats
      if (typeof imageData === 'string') {
        if (imageData.startsWith('http') || imageData.startsWith('data:')) {
          return imageData;
        }

        try {
          const dataUrl = `data:image/jpeg;base64,${imageData}`;
          return dataUrl;
        } catch (error) {
          console.error('Failed to convert string to data URL:', error);
        }
      }

      // If it's a blob
      if (imageData instanceof Blob) {
        return URL.createObjectURL(imageData);
      }
    }

    console.error('Could not extract image URL from result:', result);
    throw new Error('Could not process HuggingFace result');
  } catch (error) {
    console.error('HuggingFace processing error:', error);
    throw error;
  }
};

/**
 * Recover face in a try-on image using the original face segmentation
 * @param {string} tryOnImageUrl - URL of the try-on image without face
 * @param {Object} faceData - Object containing face mask and original image
 * @returns {Promise<Blob>} Image blob with face recovered
 */
export async function recoverFace(tryOnImageUrl, faceData): Promise<Blob> {
  const { originalImage, faceMask } = faceData;

  // Load the try-on image
  const tryOnImage = await loadImage(tryOnImageUrl);

  // Create a canvas for the final image
  const canvas = document.createElement('canvas');
  canvas.width = tryOnImage.width;
  canvas.height = tryOnImage.height;
  const ctx = canvas.getContext('2d');

  // Draw the try-on image as background
  ctx.drawImage(tryOnImage, 0, 0);

  // Create a temporary canvas for the face
  const faceCanvas = document.createElement('canvas');
  faceCanvas.width = originalImage.width;
  faceCanvas.height = originalImage.height;
  const faceCtx = faceCanvas.getContext('2d');

  // Draw the original image to get the face
  faceCtx.drawImage(originalImage, 0, 0);

  // Get the face region
  const faceImageData = faceCtx.getImageData(
    0,
    0,
    faceCanvas.width,
    faceCanvas.height
  );
  const tryOnImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Blend the original face into the try-on image
  blendFace(tryOnImageData, faceImageData, faceMask);

  // Put the blended image data back
  ctx.putImageData(tryOnImageData, 0, 0);

  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      'image/jpeg',
      0.95
    );
  });
}

/**
 * Blend original face into try-on image
 * @param {ImageData} targetImageData - The try-on image data
 * @param {ImageData} sourceImageData - The original image data containing the face
 * @param {Object} faceMask - The face mask from segmentation
 */
function blendFace(targetImageData, sourceImageData, faceMask) {
  const targetData = targetImageData.data;
  const sourceData = sourceImageData.data;

  // Calculate scaling factors if images are different sizes
  const widthScale = sourceImageData.width / targetImageData.width;
  const heightScale = sourceImageData.height / targetImageData.height;

  // Blend the images
  for (let y = 0; y < targetImageData.height; y++) {
    for (let x = 0; x < targetImageData.width; x++) {
      // Map target coordinates to source coordinates
      const sourceX = Math.floor(x * widthScale);
      const sourceY = Math.floor(y * heightScale);

      // Map to mask coordinates
      const maskX = Math.floor(
        sourceX * (faceMask.width / sourceImageData.width)
      );
      const maskY = Math.floor(
        sourceY * (faceMask.height / sourceImageData.height)
      );
      const maskIndex = maskY * faceMask.width + maskX;
      const maskValue = faceMask.data[maskIndex];

      // If this is part of the face (mask value high)
      if (maskValue > 128) {
        const targetIndex = (y * targetImageData.width + x) * 4;
        const sourceIndex = (sourceY * sourceImageData.width + sourceX) * 4;

        // Apply feathering based on mask value for smooth blending at edges
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
        // Alpha remains unchanged
      }
    }
  }
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductImageResponse } from '../../../interfaces';
import { FACE_PARTS } from '../../../constants/vton';
import {
  runSegmentation,
  processMasks,
  removeFace,
  loadImage,
  processVirtualTryOn,
  recoverFace,
} from '../../../utils/virtual-try-on';
import { t, tUpperCase } from '../../../helpers/i18n';

interface VirtualTryOnProps {
  garment?: ProductImageResponse;
}

interface FaceData {
  originalImage: HTMLImageElement;
  faceMask: ImageData;
}

interface SegmentationSegment {
  label: string;
  mask: SegmentationMask;
}

interface SegmentationMask {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

// Type for different processing stages
type ProcessingStage = 'idle' | 'segmentation' | 'faceless' | 'tryon';

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ garment }) => {
  // Image states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [facelessImage, setFacelessImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [faceData, setFaceData] = useState<FaceData | null>(null);

  // Processing states
  const [processingStage, setProcessingStage] =
    useState<ProcessingStage>('idle');
  const [error, setError] = useState<string | null>(null);

  // API key
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

  // Derived state for detecting if any processing is happening
  const isProcessing = processingStage !== 'idle';

  // Handle image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !event.target.files[0]) return;

    try {
      // Reset all states
      setError(null);
      setFacelessImage(null);
      setResult(null);
      setFaceData(null);

      // Create and set uploaded image URL
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedImage(url);

      // Process the uploaded image
      await processOriginalImage(url);
    } catch (error) {
      console.error('Upload error:', error);
      setError(
        error instanceof Error ? error.message : 'Error uploading image'
      );
      setProcessingStage('idle');
    }
  };

  // Process original image to get faceless version
  const processOriginalImage = async (imageUrl: string) => {
    if (!imageUrl) return;

    // console.log("Processing original image...");
    setProcessingStage('segmentation');
    setError(null);

    try {
      // Step 1: Run segmentation to get the face mask
      // console.log("Running face segmentation...");
      const segmentationOutput = await runSegmentation(imageUrl, FACE_PARTS);

      if (
        !segmentationOutput.some(
          (seg: SegmentationSegment) => seg?.label === 'Face'
        )
      ) {
        throw new Error('No face detected in the image');
      }

      const processed = await processMasks(segmentationOutput, imageUrl);

      const originalImage: HTMLImageElement = await loadImage(imageUrl);

      const newFaceData: FaceData = {
        originalImage,
        faceMask: processed.processedMasks.Face,
      };
      setFaceData(newFaceData);

      // Step 3: Remove the face
      // console.log("Removing face from image...");
      setProcessingStage('faceless');
      const facelessBlob = await removeFace(processed);
      const facelessUrl = URL.createObjectURL(facelessBlob);
      setFacelessImage(facelessUrl);
      // console.log("Faceless image created:", facelessUrl);

      // Step 4: Explicitly proceed to try-on if garment is available
      // Make sure to check if garment is defined AND has a url property
      if (garment && garment.url) {
        // console.log("Proceeding to try-on with garment:", garment.url);
        setProcessingStage('tryon');
        await tryOnGarment(facelessUrl, garment, newFaceData);
      } else {
        // console.log("No garment available for try-on, process complete");
        setProcessingStage('idle');
      }
    } catch (error) {
      console.error('Processing error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during image processing'
      );
      setProcessingStage('idle');
    }
  };

  // Try on garment function
  const tryOnGarment = async (
    faceImageUrl: string,
    garmentItem: ProductImageResponse,
    faceDataParam: FaceData
  ) => {
    // console.log("tryOnGarment called with:", {
    //   faceImageUrl,
    //   garmentUrl: garmentItem?.url,
    //   hasFaceData: !!faceDataParam
    // });
    if (!faceImageUrl) {
      console.error('Missing faceImageUrl in tryOnGarment');
      return;
    }
    if (!garmentItem || !garmentItem.url) {
      console.error('Missing or invalid garmentItem in tryOnGarment');
      return;
    }
    if (!faceDataParam) {
      console.error('Missing faceData in tryOnGarment');
      return;
    }

    // console.log("Starting try-on process...");
    setError(null);

    try {
      // Try-on options
      const options = {
        modelEndpoint: 'zhengchong/CatVTON',
        inferenceSteps: 20,
        guidanceScale: 2.5,
        seed: Math.floor(Math.random() * 10000),
      };

      // console.log("Sending images to HuggingFace...");
      // Send to HuggingFace for processing
      const tryOnResult = await processVirtualTryOn(
        faceImageUrl,
        garmentItem.url,
        apiKey,
        options
      );

      // console.log("Try-on successful, recovering face...");
      // Process face recovery if we have a result
      if (tryOnResult && faceDataParam) {
        const recoveredBlob = await recoverFace(tryOnResult, faceDataParam);
        const recoveredUrl = URL.createObjectURL(recoveredBlob);
        setResult(recoveredUrl);
        // console.log("Face recovery complete");
      }
    } catch (error) {
      console.error('Try-on error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during virtual try-on'
      );
    } finally {
      setProcessingStage('idle');
    }
  };

  // Helper function to determine if a specific stage is loading
  const isStageLoading = (stage: ProcessingStage): boolean => {
    return processingStage === stage;
  };

  // Reusable image panel component
  const ImagePanel = ({
    image,
    placeholderText,
    isLoading,
    alt,
    delay,
  }: {
    image: string | null | undefined;
    placeholderText: string;
    isLoading: boolean;
    alt: string;
    delay: number;
  }) => (
    <motion.div
      className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            exit={{ opacity: 0 }}
          />
        ) : image ? (
          <motion.img
            key="image"
            src={image}
            alt={alt}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.span
            key="placeholder"
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {placeholderText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="bg-white flex flex-col items-center px-4 mt-10 mb-2">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tUpperCase('virtualTryOn')}
      </motion.h1>

      {error && (
        <motion.div
          className="w-full max-w-7xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Status indicator */}
      {isProcessing && (
        <motion.div
          className="w-full max-w-7xl bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {processingStage === 'segmentation' && 'Analyzing image...'}
          {processingStage === 'faceless' && 'Processing face...'}
          {processingStage === 'tryon' && 'Generating try-on result...'}
        </motion.div>
      )}

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Original Image Panel */}
        <ImagePanel
          image={uploadedImage}
          placeholderText="Your Photo"
          isLoading={false}
          alt="Original Photo"
          delay={0.1}
        />

        {/* Faceless Image Panel */}
        <ImagePanel
          image={facelessImage}
          placeholderText="Processed Photo"
          isLoading={
            isStageLoading('segmentation') || isStageLoading('faceless')
          }
          alt="Processed Photo"
          delay={0.2}
        />

        {/* Garment Panel */}
        <ImagePanel
          image={garment?.url}
          placeholderText="Select Garment"
          isLoading={false}
          alt="Garment"
          delay={0.3}
        />

        {/* Result Panel */}
        <ImagePanel
          image={result}
          placeholderText="Result"
          isLoading={isStageLoading('tryon')}
          alt="Result"
          delay={0.4}
        />
      </div>

      {/* Controls */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label
          className={`py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
            isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer'
          }`}
        >
          {t('uploadImage')}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isProcessing}
          />
        </label>

        {facelessImage && garment && faceData && (
          <button
            onClick={() => tryOnGarment(facelessImage, garment, faceData)}
            disabled={isProcessing}
            className={`py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
              isProcessing
                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Try Again'}
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default VirtualTryOn;

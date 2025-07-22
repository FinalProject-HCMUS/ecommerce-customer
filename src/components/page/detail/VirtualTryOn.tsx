import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductImageResponse } from '../../../interfaces';
import { FACE_PARTS } from '../../../constants/vton';
import {
  runSegmentation,
  extractFaceData,
  createFacelessImage,
  processVirtualTryOn,
  recoverFace,
  imageUrlToBase64,
} from '../../../utils/virtual-try-on';
import { t } from '../../../helpers/i18n';
import { VITE_HUGGINGFACE_API_KEY } from '../../../helpers/env';
import { VITE_VTON_API_URL } from '../../../helpers/env';

interface VirtualTryOnProps {
  garment?: ProductImageResponse;
}

interface FaceData {
  originalImage: HTMLImageElement;
  faceMask: SegmentationMask;
  faceImageData: ImageData;
}

interface SegmentationMask {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

type ProcessingStage = 'idle' | 'segmentation' | 'face-processing' | 'tryon' | 'face-recovery';

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ garment }) => {
  // Image states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [facelessImage, setFacelessImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [recoveredFaceResult, setRecoveredFaceResult] = useState<string | null>(null);
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const [isRecoverable, setIsRecoverable] = useState<boolean>(false);
  const [isFaceRecovered, setIsFaceRecovered] = useState<boolean>(false);
  const [, setDetailedProgress] = useState<string>('');
  const [facePercentage] = useState<number>(0.6);

  // Processing states
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<'idm-vton' | 'gemini'>('gemini');

  // API URL
  const apiUrl = VITE_VTON_API_URL || 'https://vton-middle-api.vercel.app/api/tryon';

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
      setResult(null);
      setRecoveredFaceResult(null);
      setFacelessImage(null);
      setFaceData(null);
      setIsRecoverable(false);
      setIsFaceRecovered(false);

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

  // Process original image to extract face and create faceless version
  const processOriginalImage = async (imageUrl: string) => {
    if (!imageUrl) return;
  
    setProcessingStage('segmentation');
    setError(null);
    setDetailedProgress('');
  
    try {
      // Step 1: Run segmentation to get face mask
      setDetailedProgress('Running image segmentation...');
      console.log("Running segmentation with face parts:", FACE_PARTS);
      const segmentationOutput = await runSegmentation(imageUrl, FACE_PARTS);
      console.log("Segmentation output:", segmentationOutput.map(s => s.label));
  
      setProcessingStage('face-processing');
  
      // Step 2: Extract face data with progress updates and face percentage
      const extractedFaceData = await extractFaceData(
        imageUrl, 
        segmentationOutput,
        (message) => setDetailedProgress(message),
        facePercentage // Pass the face percentage
      );
      
      if (extractedFaceData) {
        console.log("Face data extracted successfully");
        setFaceData(extractedFaceData);
        
        // Step 3: Create faceless image with progress updates
        const facelessImageBase64 = await createFacelessImage(
          imageUrl, 
          extractedFaceData,
          (message) => setDetailedProgress(message)
        );
        setFacelessImage(facelessImageBase64);
        
        // Step 4: Proceed to try-on if garment is available
        if (garment && garment.url) {
          // Pass the extracted face data directly to avoid state timing issues
          await tryOnGarment(facelessImageBase64, garment, extractedFaceData);
        } else {
          setProcessingStage('idle');
          setDetailedProgress('');
        }
      } else {
        // No face detected, use original image directly
        console.warn('No face detected in the image, using original image');
        setError('No face detected in the image. Try a photo with a clearer face.');
        setFaceData(null);
        setDetailedProgress('');
        
        // Convert original image to base64 for API
        const originalImageBase64 = await imageUrlToBase64(imageUrl);
        setFacelessImage(originalImageBase64);
        
        if (garment && garment.url) {
          // Pass null for face data since no face was detected
          await tryOnGarment(originalImageBase64, garment, null);
        } else {
          setProcessingStage('idle');
        }
      }
    } catch (error) {
      console.error('Processing error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during image processing'
      );
      setProcessingStage('idle');
      setDetailedProgress('');
    }
  };

  // Try on garment function using the new API with faceless image
  const tryOnGarment = async (
    facelessImageBase64: string,
    garmentItem: ProductImageResponse,
    currentFaceData?: FaceData | null // Add this parameter
  ) => {
    if (!facelessImageBase64 || !garmentItem?.url) {
      console.error('Missing required parameters for try-on');
      return;
    }

    setProcessingStage('tryon');
    setError(null);

    try {
      // Call the API with faceless image
      const result = await processVirtualTryOn(
        facelessImageBase64,
        garmentItem.url,
        apiUrl,
        service
      );

      if (result.success && result.data) {
        // Set the result image (base64)
        setResult(result.data.outputImage);
        
        // Reset face recovery states
        setRecoveredFaceResult(null);
        setIsFaceRecovered(false);
        
        // Use the passed faceData or fall back to state
        const faceDataToCheck = currentFaceData !== undefined ? currentFaceData : faceData;
        
        // Set recovery capability - debug logging
        const canRecover = result.data.isRecoverable && faceDataToCheck !== null;
        console.log('Face recovery capability:', {
          apiRecoverable: result.data.isRecoverable,
          hasFaceData: faceDataToCheck !== null,
          canRecover,
          currentFaceData: currentFaceData !== undefined ? 'passed' : 'from state'
        });
        setIsRecoverable(canRecover);
      } else {
        throw new Error(result.error || 'Virtual try-on failed');
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

  // Toggle face recovery function
  const handleToggleFaceRecovery = async () => {
    if (!result || !faceData) return;

    // If face is already recovered, toggle back to original
    if (isFaceRecovered) {
      setIsFaceRecovered(false);
      return;
    }

    // If we don't have recovered face result yet, generate it
    if (!recoveredFaceResult) {
      try {
        setProcessingStage('face-recovery');
        setError(null);
        setDetailedProgress('');

        const recoveredImageBase64 = await recoverFace(
          result, 
          faceData,
          (message) => setDetailedProgress(message)
        );
        setRecoveredFaceResult(recoveredImageBase64);
        setIsFaceRecovered(true);
      } catch (error) {
        console.error('Face recovery error:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'An error occurred during face recovery'
        );
      } finally {
        setProcessingStage('idle');
        setDetailedProgress('');
      }
    } else {
      // If we already have recovered face result, just toggle
      setIsFaceRecovered(true);
    }
  };

  // Helper function to determine if a specific stage is loading
  const isStageLoading = (stage: ProcessingStage): boolean => {
    return processingStage === stage;
  };

  // Get the current result image based on face recovery state
  const getCurrentResultImage = () => {
    if (isFaceRecovered && recoveredFaceResult) {
      return recoveredFaceResult;
    }
    return result;
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
    <div className="bg-white flex flex-col items-center px-4 mt-20 mb-20">
      <motion.h1
        className="text-2xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('virtualTryOn.title')}
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
          {processingStage === 'segmentation' && t('virtualTryOn.statusMessages.analyzingImage')}
          {processingStage === 'face-processing' && t('virtualTryOn.statusMessages.processingFace')}
          {processingStage === 'tryon' && t('virtualTryOn.statusMessages.generatingResult')}
          {processingStage === 'face-recovery' && t('virtualTryOn.statusMessages.recoveringFace')}
        </motion.div>
      )}

      {/* Service selector */}
      <div className="w-full max-w-7xl mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('virtualTryOn.selectService')}
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value as 'idm-vton' | 'gemini')}
          disabled={isProcessing}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="gemini">{t('virtualTryOn.fasterLessAccurate')}</option>
          <option value="idm-vton">{t('virtualTryOn.slowerMoreAccurate')}</option>
        </select>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Original Image Panel */}
        <ImagePanel
          image={uploadedImage}
          placeholderText={t('virtualTryOn.placeholders.yourPhoto')}
          isLoading={false}
          alt="Original Photo"
          delay={0.1}
        />

        {/* Faceless Image Panel */}
        <ImagePanel
          image={facelessImage}
          placeholderText={t('virtualTryOn.placeholders.facelessPhoto')}
          isLoading={isStageLoading('face-processing')}
          alt="Faceless Photo"
          delay={0.2}
        />

        {/* Garment Panel */}
        <ImagePanel
          image={garment?.url}
          placeholderText={t('virtualTryOn.placeholders.selectGarment')}
          isLoading={false}
          alt="Garment"
          delay={0.3}
        />

        {/* Result Panel - shows current result based on face recovery state */}
        <ImagePanel
          image={getCurrentResultImage()}
          placeholderText={t('virtualTryOn.placeholders.result')}
          isLoading={isStageLoading('tryon') || isStageLoading('face-recovery')}
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
          {t('virtualTryOn.uploadImage')}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isProcessing}
          />
        </label>

        {facelessImage && garment && (
          <button
            onClick={() => tryOnGarment(facelessImage, garment)}
            disabled={isProcessing}
            className={`py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
              isProcessing
                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
            }`}
          >
            {isProcessing ? t('virtualTryOn.processing') : t('virtualTryOn.tryOn')}
          </button>
        )}

        {/* Always show button when we have result and faceData, regardless of isRecoverable */}
        {result && faceData && isRecoverable && (
          <button
            onClick={handleToggleFaceRecovery}
            disabled={isProcessing}
            className={`py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
              isProcessing
                ? 'bg-green-300 text-green-100 cursor-not-allowed'
                : isFaceRecovered
                ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
            }`}
          >
            {isProcessing 
              ? t('virtualTryOn.processing')
              : isFaceRecovered 
                ? t('virtualTryOn.removeFace')
                : t('virtualTryOn.recoverFace')
            }
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default VirtualTryOn;
import type React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        setUploadedImage(result);

        // Simulate processing with a delay
        setTimeout(() => {
          setResult(result); // In a real app, this would be the processed result
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Virtual Try On
      </motion.h1>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Original Image Panel */}
        <motion.div
          className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {uploadedImage ? (
            <motion.img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : null}
        </motion.div>

        {/* Middle Panel (Processing) */}
        <motion.div
          className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {uploadedImage && !result ? (
            <motion.div
              className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
          ) : uploadedImage ? (
            <motion.img
              src={uploadedImage}
              alt="Processing"
              className="w-full h-full object-contain opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          ) : null}
        </motion.div>

        {/* Result Panel */}
        <motion.div
          className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {!uploadedImage && (
              <motion.span
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Result
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.img
                src={result}
                alt="Result"
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md cursor-pointer transition-colors duration-200">
          Upload your image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </motion.div>
    </div>
  );
};

export default App;

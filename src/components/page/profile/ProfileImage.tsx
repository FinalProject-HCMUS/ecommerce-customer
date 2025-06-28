import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader } from 'lucide-react';
import type React from 'react';

interface ProfileImageProps {
  previewImage: string;
  isEditing: boolean;
  isUploading?: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  previewImage,
  isEditing,
  isUploading = false,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (): void => {
    if (isEditing && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleImageClick}>
      <motion.div
        whileHover={{ scale: isEditing && !isUploading ? 1.05 : 1 }}
        whileTap={{ scale: isEditing && !isUploading ? 0.95 : 1 }}
        className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg"
      >
        <img
          src={previewImage || '/placeholder.svg'}
          alt="Profile"
          className="h-full w-full object-cover"
        />
        {isEditing && !isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="h-8 w-8 text-white" />
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
      </motion.div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
        disabled={!isEditing || isUploading}
      />
    </div>
  );
};

export default ProfileImage;

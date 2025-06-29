import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../../components/page/profile/ProfileHeader';
import ProfileImage from '../../components/page/profile/ProfileImage';
import ProfileForm from '../../components/page/profile/ProfileForm';
import { UserResponse } from '../../interfaces';
import { useUser } from '../../hooks/user';
import { useImage } from '../../hooks/image';
import { t } from '../../helpers/i18n';
import { UpdateUserRequest } from '../../interfaces/user/UpdateUserRequest';
import { showError, showSuccess } from '../../utils/messageRender';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../context/authSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchUserByToken, user, updateUser, loading } = useUser();
  const { uploadImage, uploading, error: imageError } = useImage();

  const [formData, setFormData] = useState<UserResponse | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await fetchUserByToken();
      if (fetchedUser) {
        setFormData(fetchedUser);
        setPreviewImage(fetchedUser.photo || null);
      }
    };

    fetchData();
  }, []);

  // Show image errors if any
  useEffect(() => {
    if (imageError) {
      showError(imageError);
    }
  }, [imageError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately for better UX
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);

      // Upload the image to the server
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
          showSuccess(t('profile.imageUploaded'));
        }
      } catch {
        showError(t('profile.imageUploadFailed'));
        // Revert to previous image if upload fails
        setPreviewImage(formData?.photo || null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);

    const formDataToUpdate: UpdateUserRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      height: formData.height,
      weight: formData.weight,
      // Include the uploaded image URL if available
      photo: uploadedImageUrl || formData.photo,
    };

    const updatedUser = await updateUser(formData.id, formDataToUpdate);
    if (updatedUser) {
      setFormData(updatedUser);
      setPreviewImage(updatedUser.photo || null);
      dispatch(updateUserInfo(updatedUser));
      setIsEditing(false);
      setShowSavedMessage(true);

      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    }

    setIsSaving(false);
  };

  const cancelEdit = (): void => {
    setIsEditing(false);
    setUploadedImageUrl(null);
    if (user) {
      setFormData(user);
      setPreviewImage(user.photo || null);
    }
  };

  if (loading || !formData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-3xl font-bold">
          {t('lbl.loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
      <div className="bg-white overflow-hidden relative">
        <ProfileHeader showSavedMessage={showSavedMessage} />

        <div className="px-4 sm:px-6 pb-6 relative mt-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6 sm:mb-8 relative">
            <ProfileImage
              previewImage={previewImage || ''}
              isEditing={isEditing}
              onImageChange={handleImageChange}
              isUploading={uploading}
            />

            <div className="sm:mt-0 sm:ml-6 text-center sm:text-left mb-10">
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-gray-600">{formData.email}</p>
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-auto">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-rose-500 text-white rounded-[12px] hover:bg-rose-600 transition-colors"
                >
                  {t('lbl.editProfile')}
                </motion.button>
              ) : null}
            </div>
          </div>

          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            isSaving={isSaving}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cancelEdit={cancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

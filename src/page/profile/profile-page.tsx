import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../../components/page/profile/ProfileHeader';
import ProfileImage from '../../components/page/profile/ProfileImage';
import ProfileForm from '../../components/page/profile/ProfileForm';
import { UserResponse } from '../../interfaces';
import { useUser } from '../../hooks/user';
import { t } from '../../helpers/i18n';
import { UpdateUserRequest } from '../../interfaces/user/UpdateUserRequest';

const ProfilePage: React.FC = () => {
  const { fetchUserByToken, user, updateUser, loading } = useUser(); // Use fetchUserByToken and user from the hook
  const [formData, setFormData] = useState<UserResponse | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => (prev ? { ...prev, image: result } : null));
      };
      reader.readAsDataURL(file);
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
    };

    const updatedUser = await updateUser(formData.id, formDataToUpdate);
    if (updatedUser) {
      setFormData(updatedUser);
      setPreviewImage(updatedUser.photo || null);
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
            />

            <div className="sm:mt-0 sm:ml-6 text-center sm:text-left mb-10">
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.firstName + formData.lastName}
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

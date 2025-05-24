import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import React from 'react';
import InputField from '../../shared/form/InputField';
import type { UserResponse } from '../../../interfaces/user/UserResponse';
import { t } from '../../../helpers/i18n';

interface ProfileFormProps {
  formData: UserResponse;
  isEditing: boolean;
  isSaving: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  cancelEdit: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  isEditing,
  isSaving,
  handleChange,
  handleSubmit,
  cancelEdit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField
            id="firstName"
            label={t('lbl.firstName')}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? '' : 'bg-gray-50 border-transparent'}
          />

          <InputField
            id="lastName"
            label={t('lbl.lastName')}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? '' : 'bg-gray-50 border-transparent'}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
            className={'bg-gray-50 border-transparent'}
          />

          <InputField
            id="phone"
            label={t('lbl.phone')}
            type="tel"
            name="phoneNum"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? '' : 'bg-gray-50 border-transparent'}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('lbl.address')}
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-2 border rounded-[10px] ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-transparent bg-gray-50'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-200`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <InputField
            id="weight"
            label={t('lbl.weight')}
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g. 70 kg"
            className={isEditing ? '' : 'bg-gray-50 border-transparent'}
          />

          <InputField
            id="height"
            label={t('lbl.height')}
            name="height"
            value={formData.height}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g. 175 cm"
            className={isEditing ? '' : 'bg-gray-50 border-transparent'}
          />
        </div>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-end"
        >
          <button
            type="button"
            onClick={cancelEdit}
            className="mr-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-[12px] hover:bg-gray-300 transition-colors"
          >
            {t('lbl.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center px-6 py-3 bg-rose-500 text-white rounded-[12px] hover:bg-rose-600 transition-colors ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('lbl.saving')}
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                {t('lbl.saveChanges')}
              </>
            )}
          </button>
        </motion.div>
      )}
    </form>
  );
};

export default ProfileForm;

import React, { useReducer } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { contactInfo } from '../../../data/contactInfo';
import InputField from '../../shared/form/InputField';
import { GeneralButton } from '../../shared/Button';
import emailjs from '@emailjs/browser';
import { messageRenderUtils } from '../../../utils';
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '../../../helpers/env';

import { t } from '../../../helpers/i18n';
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const Contact = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formState.firstName + ' ' + formState.lastName,
          from_email: formState.email,
          subject: 'Contact Form Submission',
          message: formState.message,
        },
        PUBLIC_KEY
      );
      dispatch({ type: 'RESET_FORM' }); // Reset the form after submission
      messageRenderUtils.showSuccess('Message sent successfully!');
    } catch {
      messageRenderUtils.showError(
        'Failed to send message. Please try again later.'
      );
    }
  };

  return (
    <section className="py-16 mx-8">
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{t('lbl.contact')}</h2>
            <p className="text-gray-600 mb-8">{t('lbl.contactText')}</p>

            <div className="space-y-6">
              <div className="flex items-center">
                <FiPhone className="w-6 h-6 mr-4 text-gray-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-6 h-6 mr-4 text-gray-600" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start">
                <FiMapPin className="w-6 h-6 mr-4 text-gray-600 mt-1" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          <form className="md:col-span-7 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                id="firstName"
                label={t('lbl.firstName')}
                type="text"
                value={formState.firstName}
                onChange={handleInputChange('firstName')}
                placeholder={t('placeholder.firstName')}
                required
              />
              <InputField
                id="lastName"
                label={t('lbl.lastName')}
                type="text"
                value={formState.lastName}
                onChange={handleInputChange('lastName')}
                placeholder={t('placeholder.lastName')}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                id="email"
                label={t('lbl.email')}
                type="email"
                value={formState.email}
                onChange={handleInputChange('email')}
                placeholder={t('placeholder.email')}
                required
              />
              <InputField
                id="phone"
                label={t('lbl.phone')}
                type="tel"
                value={formState.phone}
                onChange={handleInputChange('phone')}
                placeholder={t('placeholder.phone')}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t('lbl.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={handleInputChange('message')}
                className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder={t('placeholder.message')}
              />
            </div>

            <div className="text-right">
              <GeneralButton
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                {t('btn.sendMessage')}
              </GeneralButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

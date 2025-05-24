import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '../../helpers/i18n';

interface ErrorRenderProps {
  title: string;
  text: string;
}

const ErrorRender: React.FC<ErrorRenderProps> = (error) => {
  return (
    <div className="max-w-7xl mx-auto mt-10 mx-8 px-4 py-8">
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">{t(`error.${error.title}`)}</h2>
        <p className="text-gray-600 mb-6">{t(`error.${error.text}`)}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gray-800 text-white rounded-[10px] hover:bg-gray-700 transition-colors"
        >
          {t('btn.backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default ErrorRender;

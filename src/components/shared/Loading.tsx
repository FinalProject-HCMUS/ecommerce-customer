import React from 'react';
import { t } from '../../helpers/i18n';

const Loading: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-400">{t('lbl.loading')}</div>
      </div>
    </div>
  );
};
export default Loading;

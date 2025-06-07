import type React from 'react';
import Breadcrumb from '../../shared/Breadcrumb';
import PolicyContent from './PolicyContent';
import { t } from '../../../helpers/i18n';

const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Main content */}
      <div className="px-4 pb-12">
        {/* Breadcrumb navigation */}
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: t('breadcrumb.policy'), path: '/policy' },
          ]}
        />
        <PolicyContent title={t('lbl.policy')} />
      </div>
    </div>
  );
};

export default PolicyPage;

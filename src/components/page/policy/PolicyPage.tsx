import type React from 'react';
import Breadcrumb from '../../shared/Breadcrumb';
import PolicyContent from './PolicyContent';
import { policyContent } from '../../../data/policy';

const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Main content */}
      <div className="container mx-auto px-4 pb-12">
         {/* Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Policy', path: '/policy' },
        ]}
      />
        <PolicyContent title="Content about policy" sections={policyContent} />
      </div>
    </div>
  );
};

export default PolicyPage;

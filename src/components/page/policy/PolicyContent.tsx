import type React from 'react';
import { motion } from 'framer-motion';
import PolicySection from './PolicySection';
import { policy } from '../../../locales/en/shopData.json';

interface PolicyContentProps {
  title: string;
}

const PolicyContent: React.FC<PolicyContentProps> = ({ title }) => {
  return (
    <motion.div
      className="bg-gray-200 rounded p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-8">{title}</h1>

      <div className="space-y-6">
        {policy.map((section, index) => (
          <PolicySection key={index} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default PolicyContent;

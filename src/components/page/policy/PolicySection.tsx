import type React from 'react';
import { motion } from 'framer-motion';
import type { PolicySectionType } from '../../../interfaces/temp/policy';

interface PolicySectionProps {
  section: PolicySectionType;
  index: number;
}

const PolicySection: React.FC<PolicySectionProps> = ({ section, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="mb-6"
    >
      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
      <p className="text-gray-700">{section.content}</p>
    </motion.div>
  );
};

export default PolicySection;

import type React from 'react';
import { motion } from 'framer-motion';
import { t } from '../../../helpers/i18n';

interface PolicyContentProps {
  index: number;
}

const PolicySection: React.FC<PolicyContentProps> = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="mb-6"
    >
      <h2 className="text-xl font-semibold mb-2">
        {t(`policy.${index}.title`)}
      </h2>
      <p className="text-gray-700">{t(`policy.${index}.content`)}</p>
    </motion.div>
  );
};

export default PolicySection;

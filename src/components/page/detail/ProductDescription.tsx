import type React from 'react';
import { t } from '../../../helpers/i18n';
interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="mt-16 mb-8">
      <h2 className="text-xl font-bold mb-4">{t('lbl.description')}</h2>
      <div
        className="border border-gray-200 rounded-[12px] p-4"
        dangerouslySetInnerHTML={{ __html: description }} // Render HTML content
      ></div>
    </div>
  );
};

export default ProductDescription;

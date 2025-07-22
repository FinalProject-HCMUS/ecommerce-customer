import type React from 'react';
import { t } from '../../../helpers/i18n';
import { formatDateUtils } from '../../../utils';

interface ReviewCardProps {
  author: string;
  isVerified?: boolean;
  content: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  isVerified = false,
  content,
  date,
}) => {
  return (
    <div className="border border-gray-200 rounded-[12px] p-6 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="mb-2">
            
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">{author}</span>
            {isVerified && (
              <span className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </span>
            )}
            <p className="text-sm text-gray-500 mx-5">
              {t('lbl.postOn')} {formatDateUtils.formatDate(date)}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 my-2">{content}</p>
    </div>
  );
};

export default ReviewCard;

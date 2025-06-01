import type React from 'react';
import { statusConfig } from '../../../data/statusConfig';
import { Status } from '../../../interfaces';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.color} ${config.borderColor}`}
    >
      {config.icon}
      {config.text}
    </span>
  );
};

export default StatusBadge;

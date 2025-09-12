import React from 'react';
import { Search, FileText } from 'lucide-react';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, title, description }) => {
  const icon = type === 'initial' ? <Search size={48} /> : <FileText size={48} />;

  return (
    <div className="text-center py-12">
      <div className="clay-panel max-w-md mx-auto p-8">
        <div className="text-gray-400 mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
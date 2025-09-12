import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title, description, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="clay-panel max-w-md mx-auto p-8">
        <div className="text-red-500 mb-4 flex justify-center">
          <AlertCircle size={48} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
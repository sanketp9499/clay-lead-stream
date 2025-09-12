import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, Clock } from 'lucide-react';

interface DownloadPanelProps {
  csvReady: boolean;
  isRunning: boolean;
  runId: string | null;
  onDownload: () => void;
  totalRows?: number;
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({
  csvReady,
  isRunning,
  runId,
  onDownload,
  totalRows
}) => {
  const getStatusContent = () => {
    if (!runId) {
      return {
        icon: <Clock size={20} className="text-gray-400" />,
        title: "Ready to Start",
        description: "Configure filters and click 'Start Lead Generation' to begin.",
        buttonText: "No CSV Available",
        buttonDisabled: true
      };
    }

    if (isRunning) {
      return {
        icon: <Clock size={20} className="text-blue-500 animate-pulse" />,
        title: "Processing...",
        description: "Your CSV is being generated. This may take a few minutes.",
        buttonText: "CSV Not Ready",
        buttonDisabled: true
      };
    }

    if (csvReady) {
      return {
        icon: <CheckCircle size={20} className="text-green-500" />,
        title: "CSV Ready!",
        description: totalRows ? `${totalRows.toLocaleString()} leads found and ready for download.` : "Your leads are ready for download.",
        buttonText: "Download CSV",
        buttonDisabled: false
      };
    }

    return {
      icon: <FileText size={20} className="text-gray-400" />,
      title: "Run Completed",
      description: "The process completed but no CSV is available yet.",
      buttonText: "CSV Not Available",
      buttonDisabled: true
    };
  };

  const status = getStatusContent();

  return (
    <Card className="clay-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Download size={18} />
          Download Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="clay-panel p-6">
            <div className="space-y-3">
              {status.icon}
              <div>
                <h3 className="font-medium text-gray-900">{status.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{status.description}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onDownload}
            disabled={status.buttonDisabled}
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            <Download size={16} className="mr-2" />
            {status.buttonText}
          </Button>

          {csvReady && (
            <p className="text-xs text-gray-500">
              File format: CSV • Includes all lead data and contact information
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
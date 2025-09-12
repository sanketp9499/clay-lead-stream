import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RunControlsProps {
  runId: string | null;
  isRunning: boolean;
  onReset: () => void;
  onStop?: () => void;
}

export const RunControls: React.FC<RunControlsProps> = ({
  runId,
  isRunning,
  onReset,
  onStop
}) => {
  const { toast } = useToast();

  const copyRunId = async () => {
    if (runId) {
      await navigator.clipboard.writeText(runId);
      toast({
        title: "Copied",
        description: "Run ID copied to clipboard",
      });
    }
  };

  return (
    <Card className="clay-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-gray-700">
              {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
          <div className="flex gap-2">
            {onStop && (
              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                disabled={!isRunning}
                className="text-gray-600"
              >
                <Square size={14} className="mr-1" />
                Stop
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={isRunning}
              className="text-gray-600"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      {runId && (
        <CardContent className="pt-0">
          <div className="clay-panel">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-1">Run ID</p>
                <p className="font-mono text-sm text-gray-700 truncate">{runId}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyRunId}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <Copy size={14} />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
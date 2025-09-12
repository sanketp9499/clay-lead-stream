import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle, Info, Bug } from 'lucide-react';
import type { StatusEvent, LogLevel, Stage } from '@/lib/types';

interface LiveLogProps {
  logs: StatusEvent[];
  isRunning: boolean;
}

const getStageIcon = (stage: Stage) => {
  switch (stage) {
    case 'login':
      return '🔐';
    case 'filters':
      return '🔍';
    case 'export':
      return '📊';
    case 'upload':
      return '⬆️';
    case 'done':
      return '✅';
    default:
      return '📝';
  }
};

const getLevelIcon = (level: LogLevel) => {
  switch (level) {
    case 'error':
      return <AlertCircle size={14} className="text-red-500" />;
    case 'info':
      return <Info size={14} className="text-blue-500" />;
    case 'debug':
      return <Bug size={14} className="text-gray-400" />;
    default:
      return <Clock size={14} className="text-gray-400" />;
  }
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const LiveLog: React.FC<LiveLogProps> = ({ logs, isRunning }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="clay-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock size={18} />
          Live Status
          {isRunning && (
            <div className="ml-auto flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={scrollRef}
          className="h-96 overflow-y-auto space-y-1 clay-panel"
        >
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Clock size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Waiting for activity...</p>
              </div>
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className={`log-line ${log.level} rounded-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-xs text-gray-500 font-mono">
                      {formatTime(log.ts)}
                    </span>
                    {getLevelIcon(log.level)}
                    <span className={`status-badge ${log.stage}`}>
                      <span>{getStageIcon(log.stage)}</span>
                      <span className="capitalize">{log.stage}</span>
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-700">{log.message}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { FiltersCard } from '@/components/FiltersCard';
import { RunControls } from '@/components/RunControls';
import { LiveLog } from '@/components/LiveLog';
import { DownloadPanel } from '@/components/DownloadPanel';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { useToast } from '@/hooks/use-toast';
import type { Filters, RunState, StatusEvent } from '@/lib/types';

const Index = () => {
  const { toast } = useToast();
  const [runState, setRunState] = useState<RunState>({
    runId: null,
    isRunning: false,
    logs: [],
    csvReady: false,
    error: null,
  });

  // Simulate a run for demo purposes
  const handleRun = useCallback((filters: Filters) => {
    const runId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setRunState({
      runId,
      isRunning: true,
      logs: [],
      csvReady: false,
      error: null,
    });

    toast({
      title: "Lead generation started",
      description: `Run ${runId} has been initiated`,
    });

    // Simulate the process with fake logs
    const simulateLogs = [
      { stage: 'login' as const, message: 'Logging into Clay platform...', delay: 1000 },
      { stage: 'login' as const, message: 'Authentication successful', delay: 2000 },
      { stage: 'filters' as const, message: `Applying filters: Location=Ottawa, ${filters.keywords?.length || 0} keywords`, delay: 3000 },
      { stage: 'filters' as const, message: `Company size filter: ${filters.size || 'all sizes'}`, delay: 4000 },
      { stage: 'export' as const, message: 'Searching for matching companies...', delay: 6000 },
      { stage: 'export' as const, message: 'Generating CSV export...', delay: 8000 },
      { stage: 'upload' as const, message: 'Processing export data...', delay: 10000 },
      { stage: 'done' as const, message: `Found ${Math.floor(Math.random() * 500) + 100} leads matching your criteria`, delay: 11000 },
    ];

    simulateLogs.forEach(({ stage, message, delay }) => {
      setTimeout(() => {
        const logEvent: StatusEvent = {
          ts: Date.now(),
          level: 'info',
          stage,
          message,
        };

        setRunState(prev => ({
          ...prev,
          logs: [...prev.logs, logEvent],
          isRunning: stage !== 'done',
          csvReady: stage === 'done',
        }));

        if (stage === 'done') {
          toast({
            title: "CSV Ready!",
            description: "Your lead data is ready for download",
          });
        }
      }, delay);
    });
  }, [toast]);

  const handleReset = useCallback(() => {
    setRunState({
      runId: null,
      isRunning: false,
      logs: [],
      csvReady: false,
      error: null,
    });
    
    toast({
      title: "Reset complete",
      description: "Ready for a new lead generation run",
    });
  }, [toast]);

  const handleDownload = useCallback(() => {
    if (!runState.csvReady || !runState.runId) return;
    
    // Simulate CSV download
    const csvContent = "Company,Email,Phone,Industry,Size\n" +
                      "TechCorp Ottawa,contact@techcorp.ca,613-555-0123,Technology,51-200\n" +
                      "Ottawa Health Solutions,info@ohsolutions.ca,613-555-0456,Healthcare,11-50\n";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ottawa-leads-${runState.runId}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: "Your CSV file is being downloaded",
    });
  }, [runState.csvReady, runState.runId, toast]);

  return (
    <div className="min-h-screen bg-[hsl(var(--surface))]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[hsl(var(--primary-light))] rounded-lg">
              <Search className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Ottawa Leads Agent</h1>
              <p className="text-sm text-gray-600">Automated lead generation via Clay integration</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Filters */}
          <div className="space-y-6">
            <FiltersCard 
              onRun={handleRun}
              isRunning={runState.isRunning}
            />
          </div>

          {/* Right Column - Status & Results */}
          <div className="space-y-6">
            <RunControls
              runId={runState.runId}
              isRunning={runState.isRunning}
              onReset={handleReset}
            />

            <LiveLog
              logs={runState.logs}
              isRunning={runState.isRunning}
            />

            <DownloadPanel
              csvReady={runState.csvReady}
              isRunning={runState.isRunning}
              runId={runState.runId}
              onDownload={handleDownload}
              totalRows={runState.csvReady ? Math.floor(Math.random() * 500) + 100 : undefined}
            />
          </div>
        </div>

        {/* Empty State for first visit */}
        {!runState.runId && runState.logs.length === 0 && (
          <div className="mt-12">
            <EmptyState
              type="initial"
              title="Ready to Generate Ottawa Leads"
              description="Configure your filters on the left and click 'Start Lead Generation' to begin finding potential customers in the Ottawa area."
            />
          </div>
        )}

        {/* Error State */}
        {runState.error && (
          <div className="mt-12">
            <ErrorState
              title="Something went wrong"
              description={runState.error}
              onRetry={() => setRunState(prev => ({ ...prev, error: null }))}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

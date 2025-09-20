import { Suspense } from 'react';
import ResultsClient from './ResultsClient';

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    }>
      <ResultsClient />
    </Suspense>
  );
}

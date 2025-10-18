import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        <p className="text-muted-foreground">
          Please wait while we load your content.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
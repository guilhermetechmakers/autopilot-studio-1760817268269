import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <p className="text-muted-foreground">
              This page contains our terms of service and usage conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
import React from 'react';

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <p className="text-muted-foreground">
              Complete your purchase here. This page will contain the checkout form and payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
import React from 'react';

const ContentEditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Content Editor</h1>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Create & Edit Content</h2>
            <p className="text-muted-foreground">
              Use this editor to create and manage your content. This page will contain a rich text editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditorPage;
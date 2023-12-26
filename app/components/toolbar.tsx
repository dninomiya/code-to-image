import DownloadButton from '@/app/components/download-button';
import { ModeToggle } from '@/app/components/mode-toggle';
import React from 'react';

export default function ToolBar() {
  return (
    <div className="fixed shadow border bottom-6 gap-2 left-1/2 -translate-x-1/2 rounded-full flex items-center bg-muted p-2">
      <ModeToggle />
      <DownloadButton />
    </div>
  );
}

'use client';

import Editor from '@/app/components/editor';
import ImageDropzone from '@/app/components/image-dropzone';
import ImageGroup from '@/app/components/image-group';
import ToolBar from '@/app/components/toolbar';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <ImageDropzone>
      <div className="flex items-center justify-center flex-col min-h-[100dvh] bg-canvas-background">
        <div
          id="canvas"
          className={cn(
            'relative aspect-video p-20 flex gap-20 justify-center items-center'
          )}
        >
          <Editor />
          <ImageGroup />
        </div>

        <ToolBar />
      </div>
    </ImageDropzone>
  );
}

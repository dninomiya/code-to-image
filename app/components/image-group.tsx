'use client';

import { useApp } from '@/app/providers/app-provider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ImageGroup() {
  const { image, setImage } = useApp();

  if (!image) {
    return null;
  }

  return (
    <div className="relative group">
      <img
        src={image}
        alt=""
        className="shadow-2xl rounded-lg block max-w-lg max-h-60"
      />
      <Button
        size="icon"
        onClick={() => setImage(null)}
        className="absolute top-4 right-4 group-hover:flex hidden"
      >
        <X />
        <span className="sr-only">Remove Image</span>
      </Button>
    </div>
  );
}

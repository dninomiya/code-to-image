'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ImageGroup() {
  const [image, setImage] = useState<string | null>(
    '/code-to-image/placeholder.png'
  );

  useEffect(() => {
    async function handlePasteEvent(e: ClipboardEvent) {
      if (!e.clipboardData) return;

      const items = e.clipboardData.items;
      const item = items[0];

      if (item.type.indexOf('image') === 0) {
        e.preventDefault();
        alert();
        const blob = item.getAsFile();

        if (!blob) return;

        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      }
    }

    document.addEventListener('paste', handlePasteEvent);

    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, []);

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

import { useApp } from '@/app/providers/app-provider';
import { Button } from '@/components/ui/button';
import { ImageMinus, ImagePlus } from 'lucide-react';
import React, { ChangeEventHandler } from 'react';

export default function SetImageButton() {
  const { image, setImage } = useApp();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  if (image) {
    return (
      <Button onClick={() => setImage(null)} size="icon" variant="ghost">
        <ImageMinus size={20} />
        <span className="sr-only">Remove Image</span>
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="icon"
      variant="ghost"
      className="rounded-full cursor-pointer"
    >
      <label>
        <ImagePlus size={20} />
        <span className="sr-only">Set Image</span>
        <input
          onChange={handleOnChange}
          type="file"
          className="sr-only"
          accept="images/png,images/jpeg"
        />
      </label>
    </Button>
  );
}

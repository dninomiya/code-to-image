import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generate-image';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

export default function CopyButton() {
  const { resolvedTheme } = useTheme();
  const [showCheck, setShowCheck] = useState(false);

  return (
    <Button
      size="icon"
      onClick={() => {
        setShowCheck(true);
        generateImage(resolvedTheme === 'dark', true);

        setTimeout(() => {
          setShowCheck(false);
        }, 1000);
      }}
      disabled={showCheck}
      className="rounded-full"
    >
      {showCheck ? <Check size={20} /> : <Copy size={20} />}
      <span className="sr-only">Copy Image</span>
    </Button>
  );
}

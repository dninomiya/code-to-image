import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generate-image';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function CopyButton() {
  const { resolvedTheme } = useTheme();
  const [showCheck, setShowCheck] = useState(false);
  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      size="icon"
      onClick={() => {
        setShowCheck(true);
        handleCopy(isDark);
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

function handleCopy(isDark: boolean) {
  navigator.clipboard.write([
    new ClipboardItem({
      'image/png': generateImage(isDark, true),
    }),
  ]);
}

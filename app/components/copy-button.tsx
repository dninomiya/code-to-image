import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generate-image';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function CopyButton() {
  const [showCheck, setShowCheck] = useState(false);

  const handleCopy = useCallback(() => {
    setShowCheck(true);

    navigator.clipboard.write([
      new ClipboardItem({
        'image/png': generateImage(true),
      }),
    ]);

    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  }, []);

  return (
    <Button
      size="icon"
      onClick={handleCopy}
      disabled={showCheck}
      className="rounded-full"
    >
      {showCheck ? <Check size={20} /> : <Copy size={20} />}
      <span className="sr-only">Copy Image</span>
    </Button>
  );
}

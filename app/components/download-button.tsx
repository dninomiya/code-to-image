import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generate-image';
import { Download } from 'lucide-react';

export default function DownloadButton() {
  const downloadImage = async () => {
    const link = document.createElement('a');
    link.download = 'code-image.png';
    link.href = (await generateImage()) as string;
    link.click();
  };

  return (
    <Button size="icon" onClick={downloadImage} className="rounded-full">
      <Download size={20} />
      <span className="sr-only">Download Image</span>
    </Button>
  );
}

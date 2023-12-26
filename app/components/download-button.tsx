import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DownloadButton() {
  const { resolvedTheme } = useTheme();

  const downloadImage = async () => {
    const link = document.createElement('a');
    link.download = 'code-image.png';

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(
      'body > div:last-child img { display: inline-block; }'
    );
    const element = document.getElementById('canvas')!;
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    if (width && height && height * (16 / 9) > width) {
      element.style.width = `${height * (16 / 9)}px`;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: resolvedTheme === 'dark' ? '#0d1117' : '#fff',
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      scale: 4,
    });
    link.href = canvas.toDataURL('img/png');

    link.click();

    style.remove();
    element.style.width = 'auto';
  };

  return (
    <Button size="icon" onClick={downloadImage} className="rounded-full">
      <Download size={20} />
      <span className="sr-only">ダウンロード</span>
    </Button>
  );
}

import { Download } from 'lucide-react';
import React, { RefObject } from 'react';
import html2canvas from 'html2canvas';

export default function DownloadButton({
  target,
}: {
  target: RefObject<HTMLDivElement>;
}) {
  const downloadImage = async () => {
    const link = document.createElement('a');
    link.download = 'my-image-name.png';

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(
      'body > div:last-child img { display: inline-block; }'
    );

    const element = target.current!;
    const canvas = await html2canvas(element, {
      backgroundColor: 'red',
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      allowTaint: true,
      scale: 4,
    });
    link.href = canvas.toDataURL('img/png');

    // link.href = await toPng(target.current!, { quality: 0.95, pixelRatio: 10 });

    link.click();

    style.remove();
  };

  return (
    <button
      onClick={downloadImage}
      className="bg-zinc-900 mx-auto mt-4 w-10 h-10 grid place-content-center rounded-full shadow-lg text-zinc-400"
    >
      <Download size={20} />
      <span className="sr-only">ダウンロード</span>
    </button>
  );
}

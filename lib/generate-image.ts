import { copyBlobToClipboard } from 'copy-image-clipboard';
import html2canvas from 'html2canvas';

export const generateImage = async (isDark: boolean, shouldCopy?: boolean) => {
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
    backgroundColor: isDark ? '#0d1117' : '#fff',
    scale: 4,
  });

  style.remove();
  element.style.width = 'auto';

  if (shouldCopy) {
    canvas.toBlob((blob) => {
      copyBlobToClipboard(blob!).then(() => {
        alert('Copied to clipboard!');
      });
    });

    return '';
  }

  return canvas.toDataURL('img/png');
};

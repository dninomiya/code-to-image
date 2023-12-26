import html2canvas from 'html2canvas';

export const generateImage = async (
  isDark: boolean,
  blob?: boolean
): Promise<string | Blob> => {
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

  if (blob) {
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!));
    });
  }

  return canvas.toDataURL('img/png');
};

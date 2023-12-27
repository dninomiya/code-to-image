import { domToDataUrl, domToBlob } from 'modern-screenshot';

const options = {
  backgroundColor: 'var(--canvas-background)',
  scale: 4,
};

export const generateImage = async (blob?: boolean): Promise<string | Blob> => {
  const element = document.getElementById('canvas')!;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  if (width && height && height * (16 / 9) > width) {
    element.style.width = `${height * (16 / 9)}px`;
  }

  const result = blob
    ? await domToBlob(element, options)
    : await domToDataUrl(element, options);

  element.style.width = 'auto';

  if (blob) {
    return result;
  }

  return result;
};

import { domToDataUrl, domToBlob, Options } from 'modern-screenshot';

const options: Options = {
  scale: 4,
  features: {
    removeControlCharacter: false,
  },
};

export const generateImage = async (blob?: boolean): Promise<string | Blob> => {
  const element = document.getElementById('canvas')!;
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const aspect = 1200 / 675;

  if (width && height && height * aspect > width) {
    element.style.width = `${height * aspect}px`;
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

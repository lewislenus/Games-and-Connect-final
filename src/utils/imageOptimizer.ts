
import sharp from 'sharp';

export const optimizeImage = async (
  imagePath: string,
  options = { width: 800, quality: 80 }
) => {
  try {
    const optimized = await sharp(imagePath)
      .resize(options.width)
      .webp({ quality: options.quality })
      .toBuffer();
    return `data:image/webp;base64,${optimized.toString('base64')}`;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return imagePath;
  }
};

export const generateImageSrcSet = (imagePath: string) => {
  const sizes = [400, 800, 1200];
  return sizes.map(size => `${imagePath} ${size}w`).join(', ');
};

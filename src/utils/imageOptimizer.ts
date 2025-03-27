
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

export const generateImageSrcSet = async (imagePath: string) => {
  const sizes = [400, 800, 1200];
  const srcSet = await Promise.all(
    sizes.map(async (size) => {
      const optimized = await optimizeImage(imagePath, { width: size, quality: 80 });
      return `${optimized} ${size}w`;
    })
  );
  return srcSet.join(', ');
};

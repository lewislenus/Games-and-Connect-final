import { Cloudinary } from "@cloudinary/url-gen";
import {
  scale,
  fill,
  crop,
  thumbnail,
} from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";

// Initialize the URL generation SDK
const cld = new Cloudinary({
  cloud: {
    cloudName:
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_default_cloud_name",
  },
  url: {
    secure: true,
  },
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  original_filename: string;
}

export const cloudinaryService = {
  /**
   * Upload an image file to Cloudinary
   * @param file The file to upload
   * @param folder Optional folder path in Cloudinary
   * @returns Upload result with public_id and secure_url
   */
  async uploadImage(
    file: File,
    folder = "games-and-connect"
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      // Create a FormData object to prepare the file for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
          "games_and_connect_unsigned"
      );
      formData.append("folder", folder);

      // Use the Cloudinary upload endpoint
      fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(new Error(data.error.message));
          } else {
            resolve(data as CloudinaryUploadResult);
          }
        })
        .catch((error) => reject(error));
    });
  },

  /**
   * Generate a responsive image URL with automatic format and quality
   * @param publicId The public_id of the image
   * @param width Desired width of the image
   * @param height Desired height of the image
   * @returns Optimized image URL
   */
  getResponsiveImageUrl(
    publicId: string,
    width?: number,
    height?: number
  ): string {
    const image = cld.image(publicId);

    // Apply automatic format and quality optimization
    image.delivery(format(auto()));
    image.delivery(quality(autoQuality()));

    // Apply resizing if dimensions are provided
    if (width && height) {
      image.resize(fill().width(width).height(height));
    } else if (width) {
      image.resize(scale().width(width));
    } else if (height) {
      image.resize(scale().height(height));
    }

    return image.toURL();
  },

  /**
   * Extract public_id from a Cloudinary URL
   * @param url The Cloudinary URL
   * @returns The public_id
   */
  getPublicIdFromUrl(url: string): string | null {
    // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image.jpg
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");

      // Remove the first empty string, 'image', 'upload', and version segments
      const relevantParts = pathParts.slice(4);

      // Join the remaining parts to get the public_id
      return relevantParts.join("/").replace(/\.[^\.]+$/, ""); // Remove file extension
    } catch (error) {
      console.error("Error extracting public_id from URL:", error);
      return null;
    }
  },
};

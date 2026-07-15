export const API_URL = "http://localhost:5001";

export const getImageSrc = (image, fallback = "/products/image1.png") => {
  if (!image) return fallback;
  if (
    typeof image === "string" &&
    (image.startsWith("http") ||
      image.startsWith("/") ||
      image.startsWith("data:"))
  ) {
    return image;
  }
  return `${API_URL}/images/${image}`;
};

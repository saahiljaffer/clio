export function imageHelper(imageUrl) {
  if (imageUrl === "N/A") {
    return "%PUBLIC_URL%/black.jpg";
  }
  return imageUrl;
}

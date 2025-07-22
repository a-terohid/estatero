export function replaceDescriptionImageSrc(description: string, images: string[]) {
  let imageIndex = 0;

  const updatedDescription = description.replace(
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g,
    (match, src) => {
      if (src.startsWith("/store/") || src.startsWith("http")) return match;

      const newSrc = images[imageIndex] || src;
      imageIndex++;
      return match.replace(src, newSrc);
    }
  );

  return updatedDescription;
}
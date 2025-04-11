"use client";

import Image from "next/image";

// Reusable Image component with fallback, class support, and custom sizing via CSS
const ImageWithFallback = ({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: string;
}) => {

  const fallbackSrc = "/img/ProfilePicurePlaceHolder2.png";

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackSrc;
  };

  return (
      <img
        src={src || fallbackSrc}
        alt={alt}
        className={`${style} rounded-t-2xl`}
        onError={handleError}
      />
  );
};

export default ImageWithFallback;
"use client";

import { useState, useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  style?: string;
  type?: 'profile' | 'thumbnail';
};

const ImageWithFallback = ({ src, alt, style, type }: Props) => {  
  const fallbackSrc =
    type === "thumbnail"
      ? "/img/placeholder_image.webp"
      : "/img/ProfilePicurePlaceHolder2.png";

  const [imgSrc, setImgSrc] = useState(() => {
    const clean = src?.trim();
    return clean ? clean : fallbackSrc;
  });

  useEffect(() => {
    const clean = src?.trim();
    if (!clean || clean === "" || clean === "undefined") {
      setImgSrc(fallbackSrc);
    } else {
      setImgSrc(clean);
    }
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${style ?? ""} rounded-t-2xl`}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
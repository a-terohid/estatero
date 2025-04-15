"use client";

import { useState, useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  style?: string;
};

const ImageWithFallback = ({ src, alt, style }: Props) => {
  const fallbackSrc = "/img/ProfilePicurePlaceHolder2.png";
  const [imgSrc, setImgSrc] = useState(src?.trim() || fallbackSrc);

  // If src is empty or only spaces, show fallback from the beginning
  useEffect(() => {
    if (!src || src.trim() === "") {
      setImgSrc(fallbackSrc);
    } else {
      setImgSrc(src);
    }
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
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
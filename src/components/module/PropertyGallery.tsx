"use client";

import ImageWithFallback from "@/elements/ImageWithFallback";
import { useEffect, useRef, useState } from "react";
import Slider from "./Slider";

interface Props {
  images: string[];
  thumbnail: string;
  tags?: string[];
  description: string;
}

const PropertyGallery = ({ images, thumbnail, tags, description }: Props) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const showHandler = () => setShow(!show);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    if (show) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [show]);

  // Close when clicking outside slider
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:h-96">
        <div className="lg:w-3/5 relative">
          <ImageWithFallback
            src={thumbnail || ""}
            alt={description || "Property thumbnail"}
            type="thumbnail"
            style="w-full !rounded-2xl h-full"
          />
          <div className="top-2 left-2 absolute flex flex-col gap-y-1">
            {tags?.length
              ? tags.map((tag, index) => (
                  <p
                    key={index}
                    className="py-1 px-2 rounded-full bg-primary-50 w-fit text-Body-RL-XSmall hover:bg-primary-25"
                  >
                    {tag}
                  </p>
                ))
              : null}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:w-2/5">
          {images.slice(0, 3).map((img, idx) => (
            <ImageWithFallback
              key={idx}
              src={img}
              alt={description || "Property image"}
              type="thumbnail"
              style="w-full !rounded-2xl h-full"
            />
          ))}

          {images[3] && (
            <div className="relative">
              <ImageWithFallback
                src={images[3]}
                alt={description || "Property image"}
                type="thumbnail"
                style="w-full !rounded-2xl h-full"
              />
              <p
                onClick={showHandler}
                className="hover:cursor-pointer absolute top-0 bg-black/60 text-Neutral w-full h-full rounded-2xl text-center flex justify-center items-center"
              >
                Show All
              </p>
            </div>
          )}
        </div>
      </div>

      {show && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
        >
          <div ref={modalRef}>
            <Slider images={images} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
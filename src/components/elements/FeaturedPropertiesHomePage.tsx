"use client";

import { Property_Interface } from "@/types/modelTypes";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import PropertyCard from "./cards/PropertyCard";
import PropertyCardSkeleton from "./cards/PropertyCardSkeleton";

const FeaturedPropertiesHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [FeaturedProperties, SetFeaturedProperties] = useState<Property_Interface[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const isFirstSlide = currentSlide === 0;
  const isLastSlide =
    instanceRef.current?.track.details &&
    currentSlide >= instanceRef.current.track.details.maxIdx;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/property/Featured");
        if (!res.ok) throw new Error("Failed to fetch featured properties");

        const data = await res.json();
        SetFeaturedProperties(data.data);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [FeaturedProperties]);

  return (
    <div className="container">
      <div className="text-Greyscale-900">
        <h2 className="text-Heading-4 md:text-Heading-2">Featured Properties</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 mt-6 gap-y-6">
          <p className="text-Body-RL-XSmall md:text-Body-RL-Small md:mr-10">
            Passionate about connecting people with their dream properties, we combine expertise and integrity
          </p>
          <div className="flex gap-x-3 text-lg">
            <button
              disabled={isFirstSlide}
              onClick={() => instanceRef.current?.prev()}
              className={`p-2 ${
                isFirstSlide ? "border-Greyscale-300 bg-Greyscale-300" : "bg-Neutral border-Neutral"
              } border rounded-full w-fit h-fit`}
            >
              <HiArrowNarrowLeft />
            </button>
            <button
              disabled={isLastSlide}
              onClick={() => instanceRef.current?.next()}
              className={`p-2 ${
                isLastSlide ? "border-Greyscale-300 bg-Greyscale-300" : "bg-Neutral border-Neutral"
              } border rounded-full w-fit h-fit`}
            >
              <HiArrowNarrowRight />
            </button>
          </div>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider mt-12">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="keen-slider__slide !min-w-0">
                <PropertyCardSkeleton />
              </div>
            ))
          : FeaturedProperties.map((property, index) => (
              <div key={index} className="keen-slider__slide ">
                <PropertyCard property={property} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FeaturedPropertiesHomePage;
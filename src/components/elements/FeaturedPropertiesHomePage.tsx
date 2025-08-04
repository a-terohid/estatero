"use client"

import { Property_Interface } from "@/types/modelTypes";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import PropertyCard from "./cards/PropertyCard";
import PropertyCardSkeleton from "./cards/PropertyCardSkeleton";

const FeaturedPropertiesHomePage = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [loading, setLoading] = useState(true);
    const [ FeaturedProperties , SetFeaturedProperties ] = useState<Property_Interface[]>([])


    const [sliderRef, instanceRef] = useKeenSlider({
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
            setTotalSlides(slider.track.details.maxIdx); 
        }
    });

    useEffect( () => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/property/Featured");
                if (!res.ok) throw new Error("Failed to fetch featured properties");

                const data = await res.json();

                console.log(data.data)
                SetFeaturedProperties(data.data);
            } catch (error) {
                console.error("Error fetching featured properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();

    },[])

    return (
        <div className=" container">
            <div className="text-Greyscale-900">
                <h2 className="text-Heading-4 md:text-Heading-2">Featured Properties</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0  mt-6 gap-y-6">
                    <p className="text-Body-RL-XSmall md:text-Body-RL-Small md:mr-10">Passionate about connecting people with their dream properties, we combine expertiseand integrity </p>
                     <div className="flex gap-x-3 text-lg">
                        <button disabled={currentSlide=== 0 ? true : false} onClick={() => instanceRef.current?.prev()} className={`p-2 ${currentSlide=== 0 ? " border-Greyscale-300 bg-Greyscale-300" : "bg-Neutral border-Neutral" } border rounded-full  w-fit h-fit`}> <HiArrowNarrowLeft/></button>
                        <button disabled={currentSlide=== totalSlides ? true : false} onClick={() => instanceRef.current?.next()} className={`p-2 ${currentSlide=== totalSlides ? " border-Greyscale-300 bg-Greyscale-300" : "bg-Neutral border-Neutral"} border  rounded-full  w-fit h-fit`} ><HiArrowNarrowRight/></button>
                    </div>
                </div>
            </div>
            <div ref={sliderRef} className="keen-slider mt-12">
            {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="keen-slider__slide px-2 ">
                        <PropertyCardSkeleton />
                    </div>
                ))
                : FeaturedProperties.map((property, index) => (
                    <div key={index} className="keen-slider__slide bg-Neutral overflow-hidden rounded-2xl ">
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedPropertiesHomePage;
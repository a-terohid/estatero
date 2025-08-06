"use client"

import { Property_Interface } from "@/types/modelTypes";
import { useEffect, useState } from "react";
import PropertyCardSkeleton from "./cards/PropertyCardSkeleton";
import PropertyCard from "./cards/PropertyCard";
import Link from "next/link";

const PropertiesHomepage = () => {

    const [loading, setLoading] = useState(true);
    const [Properties, SetProperties] = useState<Property_Interface[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
          try {
            setLoading(true);
            const res = await fetch("/api/property");
            if (!res.ok) throw new Error("Failed to fetch properties");
    
            const data = await res.json();
            SetProperties(data.data);
          } catch (error) {
            console.error("Error fetching properties:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProperties();
      }, []);

    return (
        <div className=" container">
            <h1 className="text-Heading-4 md:text-Heading-2 lg:text-Heading-1 text-center md:px-16 lg:px-60">Turning Your Real Estate Dreams Into Reality</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                ? [...Array(6)].map((_, i) => (
                    <div key={i} className="">
                        <PropertyCardSkeleton />
                    </div>
                    ))
                : Properties.map((property) => (
                    <div key={property._id} className="">
                        <PropertyCard property={property} />
                    </div>
                    ))}
            </div>
            <div className="text-center text-Body-RL-Small md:text-Body-RL-Medium mt-12 flex flex-col gap-y-6 items-center justify-center md:px-16 lg:px-80">
                <p>Passionate about connecting people with their dream properties, we combine expertiseand integrity </p>
                <Link href="/property" className="py-2 px-3 border rounded-full w-full md:w-fit">See More</Link>
            </div>
        </div>
    );
};

export default PropertiesHomepage;
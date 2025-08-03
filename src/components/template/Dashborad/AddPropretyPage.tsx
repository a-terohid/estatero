"use client"

import Basicform from "@/elements/addPropertyFormTabs/Basicform";
import Facts_featuresForms from "@/elements/addPropertyFormTabs/Facts_featuresForms";
import LocationForm from "@/elements/addPropertyFormTabs/LocationForm";
import MediaForm from "@/elements/addPropertyFormTabs/MediaForm";
import TagForm from "@/elements/addPropertyFormTabs/TagForm";
import Loader from "@/elements/Loader";

import { ERROR } from "@/types/enums/MessageUnum";
import { propertyFormValidation } from "@/utils/propertyFormValidation";
import { propertyFormValidationResponse } from "@/utils/propertyFormValidationResponse";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const AddPropretyPage = () => {
    const router = useRouter(); // used for redirect after submission
    const hasMounted = useRef(false); // to avoid triggering effects on first render

    // Manage active tab for switching between form sections
    const [activeTab, setActiveTab] = useState<"basic" | "location" | "features" | "media" | "tag">("basic");

    // UI states
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Media states (thumbnail, floor plan, gallery)
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnail_Preview, setThumbnail_Preview] = useState<string | null>(null);
    const [floor_plan, setFloor_plan] = useState<File | null>(null);
    const [floor_plan_Preview, setFloor_plan_Preview] = useState<string | null>(null);
    const [images, setimages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // Property form data state
    const [data, setData] = useState({
        title: "", description: "", price: 0,
        property_type: "", property_Category: "", area: 0,
        property_size_unit: "sqm",
        bedrooms: 0, bathrooms: 0, parking_spaces: 0, year_built: "",
        status: "",
        Location: {
            country: "", state: "", city: "", zipcode: "", street: "", unparsedAddress: "",
            coordinates: { Latitude: "", Longitude: "" }
        },
        tags: [],
        facts_features: {
            F_description: '',
            outdoor_details: [],
            interior_details: [],
            utilities_central: [],
            other: [],
        }
    });

     const [DATA_Error , setDataError] = useState({
        title: "", description: "", price: 0,
        property_type: "", property_Category: "", area: '',
        bedrooms: '', bathrooms: '', parking_spaces: '', year_built: "",
        status: "",
        Location: {
            country: "", state: "", city: "", zipcode: "", street: "", unparsedAddress: "",
            coordinates: { Latitude: "", Longitude: "" }
        },
        tags: [],
        facts_features: {
            F_description: '',
            outdoor_details: [],
            interior_details: [],
            utilities_central: [],
            other: [],
        }
    });

    useEffect(() => {
        console.log(hasMounted);
        
            if (!hasMounted.current) {
                hasMounted.current = true;
                return
            }
    
            setDataError(propertyFormValidation(data, DATA_Error));
    
    }, [data]);

    // Switch form tab
    const switchTab = (tab: typeof activeTab) => setActiveTab(tab);

    // Basic input handler for simple fields
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    };

    // Reset thumbnail
    const ResetThumbnail = useCallback(() => {
        setThumbnail(null);
        setThumbnail_Preview(null);
    }, []);

    // Handle thumbnail upload + preview
    const ThumbnailChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnail(file);
            setThumbnail_Preview(URL.createObjectURL(file));
        }
    }, []);

    // Reset floor plan
    const ResetFloor_plan = useCallback(() => {
        setFloor_plan(null);
        setFloor_plan_Preview(null);
    }, []);

    // Handle floor plan upload + preview
    const Floor_planChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFloor_plan(file);
            setFloor_plan_Preview(URL.createObjectURL(file));
        }
    }, []);

    // Add gallery images
    const handleImageChange = (e: any) => {
        const selectedFiles = Array.from(e.target.files) as File[];
        setimages(prev => [...prev, ...selectedFiles]);
        setImagePreviews(prev => [...prev, ...selectedFiles.map(file => URL.createObjectURL(file))]);
    };

    // Remove a gallery image by index
    const removeImage = (index: number) => {
        setimages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Update location values (country, city, etc.)
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            Location: {
                ...prev.Location,
                [name]: value
            }
        }));
    };

    // Update latitude and longitude
    const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            Location: {
                ...prev.Location,
                coordinates: {
                    ...prev.Location.coordinates,
                    [name]: value
                }
            }
        }));
    };

    // Update description (text) inside facts_features
    const handleFeaturesTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            facts_features: {
                ...prev.facts_features,
                [name]: value
            }
        }));
    };

    // Toggle checkbox features (outdoor, interior, etc.)
    const toggleFeatureCheckbox = (
        field: keyof typeof data.facts_features,
        value: string
    ) => {
        setData(prev => {
            const current = prev.facts_features[field] as string[];
            return {
                ...prev,
                facts_features: {
                    ...prev.facts_features,
                    [field]: current.includes(value)
                        ? current.filter(v => v !== value)
                        : [...current, value]
                }
            };
        });
    };

    // Toggle tags (checkbox-based)
    const handleTagChange = (tag: string, checked: boolean) => {
        setData((prev:any) => ({
            ...prev,
            tags: checked
                ? [...prev.tags, tag]
                : prev.tags.filter((t:any) => t !== tag)
        }));
    };

    // Submit the full property form to the API
    const handlelAddProperty = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUploadProgress(0);

        const { isValid , response } = propertyFormValidationResponse(data)

        if( !isValid ){
            toast.error(response);
            setLoading(false);
            return
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        if (thumbnail) formData.append("thumbnail", thumbnail);
        if (floor_plan) formData.append("floor_plan", floor_plan);
        images.forEach(image => formData.append("images", image));

        try {
            const response = await axios.post('/api/property', formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                }
            });

            const resData = response.data;
            setLoading(false);
            setUploadProgress(null);

            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                router.replace("/dashboard/properties");
            }
        } catch (err: any) {
            setLoading(false);
            setUploadProgress(null);
            toast.error(ERROR.PROBLEM);
        }
    };

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Add property:</h1>

            {/* Tab switcher */}
            <div className="mb-6 border-b border-gray-300 text-Body-MD-XSmall md:text-Body-MD-Medium">
                <div className="flex gap-4">
                    {/* Tab buttons */}
                    <button onClick={() => switchTab("basic")} className={activeTab === "basic" ? "text-Secondary-100 border-b-2 border-Secondary-100 pb-2" : "text-gray-600 pb-2"}>Basic Info</button>
                    <button onClick={() => switchTab("location")} className={activeTab === "location" ? "text-Secondary-100 border-b-2 border-Secondary-100 pb-2" : "text-gray-600 pb-2"}>Location</button>
                    <button onClick={() => switchTab("features")} className={activeTab === "features" ? "text-Secondary-100 border-b-2 border-Secondary-100 pb-2" : "text-gray-600 pb-2"}>Features</button>
                    <button onClick={() => switchTab("tag")} className={activeTab === "tag" ? "text-Secondary-100 border-b-2 border-Secondary-100 pb-2" : "text-gray-600 pb-2"}>Tags</button>
                    <button onClick={() => switchTab("media")} className={activeTab === "media" ? "text-Secondary-100 border-b-2 border-Secondary-100 pb-2" : "text-gray-600 pb-2"}>Media</button>
                </div>
            </div>

            {/* Active tab content */}
            <div>
                {activeTab === "basic" && <Basicform data={data} DATA_Error={DATA_Error} changeHandler={changeHandler} />}
                {activeTab === "location" && <LocationForm data={data} DATA_Error={DATA_Error} locationHandler={handleLocationChange} CordinatesHandler={handleCoordinatesChange} />}
                {activeTab === "features" && <Facts_featuresForms data={data} DATA_Error={DATA_Error} toggleFeatureCheckbox={toggleFeatureCheckbox} addFeatureItem={handleFeaturesTextChange} />}
                {activeTab === "tag" && <TagForm data={data} DATA_Error={DATA_Error} handler={handleTagChange} />}
                {activeTab === "media" && <MediaForm prop={{
                    thumbnail,
                    thumbnail_Preview,
                    ResetThumbnail,
                    ThumbnailChangeHandler,
                    floor_plan,
                    floor_plan_Preview,
                    ResetFloor_plan,
                    Floor_planChangeHandler,
                    images,
                    imagePreviews,
                    handleImageChange,
                    removeImage,
                }} />}
            </div>

            {/* Submit button and loader */}
            <div className="mt-5 flex flex-col gap-y-4 mb-4">
                {loading ? (
                    <Loader />
                ) : (
                    <button
                        onClick={handlelAddProperty}
                        className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full hover:bg-primary-50"
                    >
                        Add
                    </button>
                )}

                {/* Upload progress bar */}
                {uploadProgress !== null && (
                    <div className="w-1/4 bg-gray-200 h-2 rounded mt-2">
                        <div
                            className="bg-blue-500 h-2 rounded transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPropretyPage;
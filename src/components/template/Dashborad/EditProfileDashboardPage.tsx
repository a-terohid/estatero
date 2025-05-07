"use client"

import ImageWithFallback from '@/elements/ImageWithFallback';
import INPUT from '@/elements/INPUT';
import { Agent_Interface, User_Interface } from '@/types/modelTypes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Cropper, { Area } from "react-easy-crop"
import ImageModule from '@/module/ImageModule';
import Loader from '@/elements/Loader';
import { editProfileFormsValidation } from '@/utils/forms';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { getCroppedImg } from '@/utils/cropImage';
import axios from 'axios';
import { ERROR } from '@/types/enums/MessageUnum';
import { mask } from '@/utils/mask';

// Component for editing user profile in the dashboard
const EditProfileDashboardPage = ({ user }: { user: User_Interface }) => {

    const router = useRouter(); // Next.js router
    const hasMounted = useRef(false); // Prevents validation on first render

   
    // Memoized initial form data based on the user prop
    const initialData = useMemo(() => ({
        name: user.name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
    }), [user]);

    const [dataError, setDataError] = useState({
        name_error: "",
        last_name_error: "",
        phone_number_error: "",
    });

    // Form data state
    const [data, setData] = useState(initialData);
    const { name, last_name, phone_number } = data;

    // State for managing profile picture file and its preview
    const [profile_picture, setProfile_picture] = useState<File | null>(null);
    const [profile_picture_Preview, setProfile_picture_Preview] = useState<string | null>(null);

    // Boolean for checkbox to reset existing profile picture
    const [isCheckedCoverImage, setIsCheckedCoverImage] = useState(false);

    // Modal visibility state for image cropping
    const [showCropModal, setShowCropModal] = useState(false);

    // Progress and loading states
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Run validation only after the component has mounted
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        setDataError(editProfileFormsValidation(data, dataError));
    }, [data]);

    // Handler for input changes (name, last name, phone number)
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev : any) => ({ ...prev, [name]: value }));
        };

    // Handler for file input changes (profile picture)
    const fileChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setProfile_picture(file);
        const previewUrl = URL.createObjectURL(file);
        setProfile_picture_Preview(previewUrl);
        setShowCropModal(true);
        }
    }, []);

  // Reset profile picture preview and file
    const ResetProfilePicture = useCallback(() => {
        setProfile_picture(null);
        setProfile_picture_Preview(null);
    }, []);

    // Handle checkbox for removing existing profile image
    const handleIsCheckedCoverImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedCoverImage(event.target.checked);
    }, []);

    // Submit handler to update user profile
    const handleEditProfile = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        
        const newdata = data;
        Object.assign(newdata, { 
            isCheckedCoverImage: String(isCheckedCoverImage) , 
            role : user.role,
            _id : user._id
        });
        
        formData.append("data", JSON.stringify(newdata) || "");
        if (profile_picture) formData.append("profile_picture", profile_picture);

        try {
            const response = await axios.patch('/api/auth/editUser', formData, {
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
                router.push("/dashboard/profile");
            }
        } catch (err: any) {
            setLoading(false);
            setUploadProgress(null);
            toast.error(ERROR.PROBLEM);
        }
    }, [user._id, name, last_name, phone_number, isCheckedCoverImage, profile_picture, router]);

    return (
        <div className='px-5 py-5 md:px-7'>
            <h1 className='text-Heading-4 mb-6'>Edit profile:</h1>
            <div>
                {/* Toggle to enable profile picture editing */}
                <div className="flex gap-x-2 items-center mt-3 text-Body-RL-Small lg:text-Body-RL-Medium w-full">
                    <input
                        type="checkbox"
                        checked={isCheckedCoverImage}
                        onChange={handleIsCheckedCoverImage}
                    />
                    <p>Delete and edit profile picture</p>
                </div>

                {/* If editing is enabled, show image selector and preview */}
                <div className="">
                    {isCheckedCoverImage ? (
                        <div className="mt-3 text-Body-RL-Small lg:text-Body-RL-Medium">
                            <p className="mb-4">Profile picture:</p>
                            <input
                                type="file"
                                id="coverImageInput"
                                accept="image/*"
                                onChange={fileChangeHandler}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="coverImageInput" className="bg-primary-100 hover:bg-primary-50   text-Greyscale-50 hover:text-Greyscale-600 py-2 px-3  w-full rounded-lg text-Body-RL-XSmall lg:text-Body-RL-Small">
                                {profile_picture ? profile_picture.name : "Select picture"}
                            </label>
                            {profile_picture_Preview && (
                                <div className="relative mt-4 w-fit">
                                    <img
                                        src={profile_picture_Preview}
                                        alt="Cover Image Preview"
                                        className="w-56 mt-5 object-cover rounded-lg"
                                    />
                                    <button onClick={ResetProfilePicture} className="absolute mt-2 mr-2 top-0 right-0 bg-Error-50 hover:bg-Error-300 text-Error-300 hover:text-Error-50 rounded-full p-1"><RiDeleteBin2Line /></button>
                                </div>
                            )}
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
                    ) : (
                        <div className='w-2/3 md:w-1/3 relative'>
                            <ImageWithFallback src={user.profile_picture || ""} alt={user.email} style={"rounded-b-2xl my-5"} />
                        </div>
                    )}
                </div>

                {/* Input fields for name, last name, and phone */}
                <div className="lg:w-1/2 mt-8 flex flex-col gap-y-4">
                    <INPUT
                        label="Name"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter your name here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={dataError.name_error || ""}
                    />
                    <INPUT
                        label="Last Name"
                        type="text"
                        name="last_name"
                        value={last_name}
                        placeholder="Enter your last name here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={dataError.last_name_error || ""}
                    />
                    <INPUT
                        label="Phone number"
                        type="text"
                        name="phone_number"
                        value={mask(phone_number , "(***) ***-****")}
                        placeholder="Enter your phone number here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={dataError.phone_number_error || ""}
                    />
                </div>

                {/* Submit button */}
                <div className='flex items-center justify-center mt-6'>
                    {loading ? (
                        <Loader />
                    ) : (
                        <button
                            onClick={handleEditProfile}
                            className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full hover:bg-primary-50"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Crop image modal */}
            {showCropModal && profile_picture_Preview && (
                <ImageModule 
                    title="Crop your profile picture" 
                    show={showCropModal} 
                    setShow={setShowCropModal}
                    image={profile_picture}
                    setImage = {setProfile_picture}
                    imagePriview={profile_picture_Preview}
                    setImagePreview={setProfile_picture_Preview }/>
            )}
            <Toaster />
        </div>
    );
};

export default EditProfileDashboardPage;
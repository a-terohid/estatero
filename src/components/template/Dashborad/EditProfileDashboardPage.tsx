"use client"

import ImageWithFallback from '@/elements/ImageWithFallback';
import INPUT from '@/elements/INPUT';
import { User_Interface } from '@/types/modelTypes';
import React, { useEffect, useRef, useState } from 'react';
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

// Component for editing user profile in the dashboard
const EditProfileDashboardPage = ({ user }: { user: User_Interface }) => {

    // States
    const [isCheckedCoverImage, setIsCheckedCoverImage] = useState(false); // Checkbox state for editing/deleting profile picture
    const [UploadProgress, setUploadProgress] = useState<number | null>(0); // Upload progress
    const [loading, setLoading] = useState<boolean>(false); // Loading indicator
    const [profile_picture, setProfile_picture] = useState<File | null>(null); // Selected file
    const [profile_picture_Preview, setProfile_picture_Preview] = useState<string | null>(user?.profile_picture || null); // Preview of the selected image

    // Cropper-related states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showCropModal, setShowCropModal] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    // Form data and error states
    const [data, setData] = useState({
        name: user.name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        profile_picture: ""
    });

    const [dataError, setDataError] = useState({
        name_error: "",
        last_name_error: "",
        phone_number_error: "",
    });

    const { name, last_name, phone_number } = data;

    const hasMounted = useRef(false); // Prevents validation on first render

    const router = useRouter(); // Next.js router

    // Run validation only after the component has mounted
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        setDataError(editProfileFormsValidation(data, dataError));
    }, [data]);

    // Handle form input changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file input change
    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0] as File;
        setProfile_picture(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setProfile_picture_Preview(previewUrl);
        }
        setShowCropModal(true); // Open crop modal
    };

    // Reset selected profile picture
    const ResetProfilePicture = (): void => {
        setProfile_picture(null);
        setProfile_picture_Preview(null);
    };

    // Handle checkbox change
    const handleIsCheckedCoverImage = (event: any): void => {
        setIsCheckedCoverImage(event.target.checked);
    };

    // Save cropped image
    const handleCropSave = async () => {
        if (!profile_picture_Preview || !croppedAreaPixels) return;
        const croppedBlob = await getCroppedImg(profile_picture_Preview, croppedAreaPixels);

        const croppedFile = new File([croppedBlob], profile_picture?.name || "cropped.jpg", { type: "image/jpeg" });

        setProfile_picture(croppedFile);
        const previewUrl = URL.createObjectURL(croppedFile);
        setProfile_picture_Preview(previewUrl);
        setShowCropModal(false);
    };

    // Cancel cropping
    const handleCropeCancle = (): void => {
        setShowCropModal(false);
        ResetProfilePicture();
    };

    // Handle zoom on cropper
    const handleZoom = (num: number): void => {
        setZoom(zoom + num);
    };

    // Submit form to edit profile
    const handleEditProfile = async (e: any) => {

        e.preventDefault();
        setLoading(true);
        setUploadProgress(0);

        // create form data and append data 
        const formData = new FormData();
        formData.append("_id", user._id || "");
        formData.append("name", name);
        formData.append("last_name", last_name);
        formData.append("phone_number", phone_number);
        formData.append("isCheckedCoverImage", String(isCheckedCoverImage));

        if (profile_picture) {
            formData.append("profile_picture", profile_picture);
        }

        // send data to server and get upload prosses to show to user
        try {
            const response = await axios.patch('/api/auth/editUser', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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
                router.push("/dashboard/profile"); // Redirect on success
            }
        } catch (err: any) {
            setLoading(false);
            setUploadProgress(null);
            toast.error(ERROR.PROBLEM); // Show generic error
        }
    };

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
                            {UploadProgress !== null && (
                                <div className="w-1/4 bg-gray-200 h-2 rounded mt-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded transition-all duration-300"
                                        style={{ width: `${UploadProgress}%` }}
                                    ></div>
                                    <p className="text-xs text-gray-500 mt-1">{UploadProgress}% uploaded</p>
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
                        value={phone_number}
                        placeholder="Enter your phone number here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={dataError.phone_number_error || ""}
                    />
                </div>

                {/* Submit button */}
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <button
                            onClick={handleEditProfile}
                            className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full mt-6 hover:bg-primary-50"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Crop image modal */}
            {showCropModal && profile_picture_Preview && (
                <ImageModule onClose={handleCropeCancle} title="Crop your profile picture" show={showCropModal}>
                    <div className="relative w-full h-96 bg-gray-800 rounded-xl overflow-hidden">
                        <Cropper
                            image={profile_picture_Preview}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={(croppedArea, croppedAreaPixels) => {
                                setCroppedAreaPixels(croppedAreaPixels);
                            }}
                        />
                    </div>
                    {/* Buttons for crop confirm/cancel would go here */}
                    <div className="flex justify-between mt-4 text-Body-RL-Small lg:text-Body-RL-Small">
                        <div className='flex items-center gap-x-2'>
                            <button onClick={()=>handleZoom(-0.25)} disabled={ zoom <= 1 ? true : false} className='bg-Greyscale-600 text-Greyscale-50 disabled:opacity-15 rounded-full hover:cursor-pointer w-6 h-6 hover:bg-Greyscale-500 hover:text-Greyscale-800'>-</button>
                            { zoom ? <span>{zoom}x</span> : null }
                            <button onClick={()=>handleZoom(0.25)}  className='bg-Greyscale-600 text-Greyscale-50 rounded-full hover:cursor-pointer w-6 h-6 hover:bg-Greyscale-500 hover:text-Greyscale-800'>+</button>
                        </div>
                       <div className='gap-3 flex items-center' >
                        <button
                                className="bg-red-500 text-white px-3 py-2 rounded"
                                onClick={handleCropeCancle}
                            >
                                Cancel</button>
                            <button
                                className="bg-green-600 text-white px-3 py-2 rounded"
                                onClick={handleCropSave}
                            >
                                Save
                            </button>
                       </div>
                    </div>
                </ImageModule>
            )}
            <Toaster />
        </div>
    );
};

export default EditProfileDashboardPage;
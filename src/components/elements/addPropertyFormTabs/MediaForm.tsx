import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';

const MediaForm = ({prop} : any) => {

    const {
        thumbnail,
        thumbnail_Preview,
        ResetThumbnail,
        ThumbnailChangeHandler,
        floor_plan,
        floor_plan_Preview,
        ResetFloor_plan,
        Floor_planChangeHandler,
        images , 
        imagePreviews,
        handleImageChange,
        removeImage,
    } = prop

    return (
        <div className='flex flex-col gap-y-5'>
            <div className=" text-Body-RL-Small lg:text-Body-RL-Medium">
                <p className="mb-4">Thumbnail:</p>
                <input
                    type="file"
                    id="thumbnailInput"
                    accept="image/*"
                    onChange={ThumbnailChangeHandler}
                    style={{ display: 'none' }}
                />
                <label htmlFor="thumbnailInput" className="bg-primary-100 hover:bg-primary-50 hover:cursor-pointer   text-Greyscale-50 hover:text-Greyscale-600 py-2 px-3  w-full rounded-lg md:text-Body-RL-XSmall lg:text-Body-RL-Small">
                    {thumbnail ? thumbnail.name : "Select picture"}
                </label>
                {thumbnail_Preview && (
                    <div className="relative mt-4 w-fit">
                        <img
                            src={thumbnail_Preview}
                            alt="thumbnail Preview"
                            className="w-56 mt-5 object-cover rounded-lg"
                        />
                        <button onClick={ResetThumbnail} className="absolute mt-2 mr-2 top-0 right-0 bg-Error-50 hover:bg-Error-300 text-Error-300 hover:text-Error-50 rounded-full p-1"><RiDeleteBin2Line /></button>
                    </div>
                )}
            </div>
            <div className=" text-Body-RL-Small lg:text-Body-RL-Medium">
                <p className="mb-4">Floor plan:</p>
                <input
                    type="file"
                    id="floorPlanInput"
                    accept="image/*"
                    onChange={Floor_planChangeHandler}
                    style={{ display: 'none' }}
                />
                <label htmlFor="floorPlanInput" className="bg-primary-100 hover:bg-primary-50 hover:cursor-pointer   text-Greyscale-50 hover:text-Greyscale-600 py-2 px-3  w-full rounded-lg md:text-Body-RL-XSmall lg:text-Body-RL-Small">
                    {floor_plan ? floor_plan.name : "Select picture"}
                </label>
                {floor_plan_Preview && (
                    <div className="relative mt-4 w-fit">
                        <img
                            src={floor_plan_Preview}
                            alt="Floor plan Preview"
                            className="w-56 mt-5 object-cover rounded-lg"
                        />
                        <button onClick={ResetFloor_plan} className="absolute mt-2 mr-2 top-0 right-0 bg-Error-50 hover:bg-Error-300 text-Error-300 hover:text-Error-50 rounded-full p-1"><RiDeleteBin2Line /></button>
                    </div>
                )}
            </div>
            <div className=" text-Body-RL-Small lg:text-Body-RL-Medium">
                <p className="mb-4">Property Images:</p>
                <input
                    type="file"
                    id="imagesInput"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"
                    style={{ display: 'none' }}
                />
                <label htmlFor="imagesInput" className="bg-primary-100 hover:bg-primary-50 hover:cursor-pointer   text-Greyscale-50 hover:text-Greyscale-600 py-2 px-3  w-full rounded-lg md:text-Body-RL-XSmall lg:text-Body-RL-Small">
                    {images.length > 0 ? `${images.length} slected images ` : "Select images"}
                </label>
                <div className="flex flex-wrap gap-4 mt-5">
                    {imagePreviews.map((preview : any, index: number) => (
                        <div key={index} className="relative flex flex-wrap items-center justify-center">
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="w-56 object-cover rounded-lg"
                            />
                            <button onClick={() => removeImage(index)} className="absolute mt-2 mr-2 top-0 right-0 bg-Error-50 hover:bg-Error-300 text-Error-300 hover:text-Error-50 rounded-full p-1"><RiDeleteBin2Line /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaForm;
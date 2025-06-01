import React from 'react';
import INPUT from '../INPUT';
import { property_interior_details_features, property_other_features, property_outdoor_details_features, property_utilities_central_features } from '@/types/enums/generalEnums';

const Facts_featuresForms = ({data , addFeatureItem , toggleFeatureCheckbox}:any) => {

    const {F_description , outdoor_details, interior_details, utilities_central, other}  =  data.facts_features

    const outdoorOptions = Object.values(property_outdoor_details_features);
    const interiorOptions = Object.values(property_interior_details_features);
    const utilitiesOptions = Object.values(property_utilities_central_features);
    const otherOptions = Object.values(property_other_features);

    return (
        <div className="lg:w-1/2 mt-8 flex flex-col gap-y-5">
                <INPUT
                    label="Features description:"
                    type="text"
                    name="F_description"
                    value={F_description}
                    placeholder="Enter description here"
                    changeHandler={addFeatureItem}
                    textarea={true}
                />
               <div>
                    <h3 className=" mb-2 text-Body-MD-Small">Outdoor Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-Body-MD-Small bg-Neutral p-3 border rounded-lg ">
                        {outdoorOptions.map(option => (
                            <label key={option} className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={outdoor_details.includes(option)}
                                className="w-4 h-4 appearance-none border rounded-md border-gray-500 checked:bg-Secondary-50 checked:border-Secondary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                onChange={() => toggleFeatureCheckbox('outdoor_details', option)}
                            />
                            <span>{option}</span>
                            </label>
                        ))}
                    </div>
               </div>
               <div>
                    <h3 className=" mb-2 text-Body-MD-Small">Interior Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-Body-MD-Small bg-Neutral p-3 border rounded-lg ">
                        {interiorOptions.map(option => (
                            <label key={option} className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={interior_details.includes(option)}
                                className="w-4 h-4 appearance-none border rounded-md border-gray-500 checked:bg-Secondary-50 checked:border-Secondary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                onChange={() => toggleFeatureCheckbox('interior_details', option)}
                            />
                            <span>{option}</span>
                            </label>
                        ))}
                    </div>
               </div>
               <div>
                    <h3 className=" mb-2 text-Body-MD-Small">Utilities central Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-Body-MD-Small bg-Neutral p-3 border rounded-lg ">
                        {utilitiesOptions.map(option => (
                            <label key={option} className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={utilities_central.includes(option)}
                                className="w-4 h-4 appearance-none border rounded-md border-gray-500 checked:bg-Secondary-50 checked:border-Secondary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                onChange={() => toggleFeatureCheckbox('utilities_central', option)}
                            />
                            <span>{option}</span>
                            </label>
                        ))}
                    </div>
               </div>
               <div>
                    <h3 className=" mb-2 text-Body-MD-Small">Other Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-Body-MD-Small bg-Neutral p-3 border rounded-lg ">
                        {otherOptions.map(option => (
                            <label key={option} className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={other.includes(option)}
                                className="w-4 h-4 appearance-none border rounded-md border-gray-500 checked:bg-Secondary-50 checked:border-Secondary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                onChange={() => toggleFeatureCheckbox('other', option)}
                            />
                            <span>{option}</span>
                            </label>
                        ))}
                    </div>
               </div>
        </div>
    );
};

export default Facts_featuresForms;
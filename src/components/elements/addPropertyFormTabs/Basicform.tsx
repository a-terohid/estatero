import React from 'react';
import INPUT from '../INPUT';
import { Property_Interface } from '@/types/modelTypes';
import DatePicker from 'react-multi-date-picker';
import { property_Categories, property_Status, Property_Types } from '@/types/enums/generalEnums';
import { TiArrowSortedDown } from 'react-icons/ti';

const Basicform = ({data , changeHandler}:{data:any , changeHandler:any}) => {

    const { title , description , price , property_type ,property_Category , area , property_size_unit ,bedrooms , bathrooms, parking_spaces ,year_built , status  } = data

    const propertyTypesOptions = Object.values(Property_Types);
    const propertyCategoryOptions = Object.values(property_Categories);
    const statusOptions = Object.values(property_Status);

    return (
        <div className="lg:w-1/2 mt-8 flex flex-col gap-y-5">
                <INPUT
                    label="Title:"
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter title here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Description:"
                    type="text"
                    name="description"
                    value={description}
                    placeholder="Enter description here"
                    changeHandler={changeHandler}
                    textarea={true}
                />
                <div className='w-full '>
                    <label className="block mb-2 text-Body-MD-Small">Property Type:</label>
                    <div className="relative inline-block w-full text-Greyscale-400 ">
                        <select 
                            name="property_type" 
                            value={property_type} 
                            onChange={changeHandler} 
                            className="appearance-none w-full lg:text-Body-RL-Small p-3 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall">
                                <option value="" disabled>Select a property type</option>
                                { propertyTypesOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <label className="block mb-2 text-Body-MD-Small">Property category:</label>
                    <div className="relative inline-block w-full text-Greyscale-400 ">
                        <select 
                            name="property_Category" 
                            value={property_Category} 
                            onChange={changeHandler} 
                            className="appearance-none w-full lg:text-Body-RL-Small p-3 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall">
                                <option value="" disabled>Select a property category</option>
                                { propertyCategoryOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <div className='w-full '>
                    <label className="block mb-2 text-Body-MD-Small">Status:</label>
                    <div className="relative inline-block w-full text-Greyscale-400 ">
                        <select 
                            name="status" 
                            value={status} 
                            onChange={changeHandler} 
                            className="appearance-none w-full lg:text-Body-RL-Small p-3 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall">
                                <option value="" disabled>Select a status</option>
                                { statusOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <INPUT
                    label="Price:"
                    type="number"
                    name="price"
                    value={price ? price : null}
                    placeholder="Enter price here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Area:"
                    type="number"
                    name="area"
                    value={area ? area : null}
                    placeholder="Enter area here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <div className='w-full '>
                    <label className="block mb-2 text-Body-MD-Small">property size unit:</label>
                    <div className="relative inline-block w-full text-Greyscale-400 ">
                        <select 
                            name="property_size_unit" 
                            value={property_size_unit} 
                            onChange={changeHandler} 
                            className="appearance-none w-full lg:text-Body-RL-Small p-3 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall">
                                <option value="" disabled>Select size unit</option>
                                <option value="sqm" >sqm</option>
                                <option value="sqft" >sqft</option>
                                
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <INPUT
                    label="Bedrooms:"
                    type="number"
                    name="bedrooms"
                    value={bedrooms ? bedrooms : null}
                    placeholder="Enter bedrooms here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Bathrooms:"
                    type="number"
                    name="bathrooms"
                    value={bathrooms ? bathrooms : null}
                    placeholder="Enter bathrooms here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Parking spaces:"
                    type="number"
                    name="parking_spaces"
                    value={parking_spaces ? parking_spaces : null}
                    placeholder="Enter parking spaces here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Year built:"
                    type="text"
                    name="year_built"
                    value={year_built}
                    placeholder="Enter Year built here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
        </div>
    );
};

export default Basicform;
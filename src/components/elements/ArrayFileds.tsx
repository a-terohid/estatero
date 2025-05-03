import { addToArray, handleArrayChange, HandleArrayDelete } from '@/utils/formsFunctions';
import React from 'react';
import INPUT from './INPUT';
import { MdDeleteForever } from 'react-icons/md';
import { ArrayFieldsProps_interface } from '@/types/pagesProps';

// Reusable component for rendering and managing an array of input fields
const ArrayFileds = ({ state, setState, value, name, lable }: ArrayFieldsProps_interface) => {
    return (
        <div>
            {/* Label for the field group */}
            <p className="mb-4">{lable}</p>

            {/* Render a list of input fields */}
            <div>
                {
                    value.map((item: string, index: number) => (
                        <div key={index} className="flex items-center justify-center gap-x-3 mb-3">
                            <div className="flex-1">
                                {/* Individual input field */}
                                <INPUT
                                    value={item}
                                    name="item"
                                    changeHandler={(e: any) => handleArrayChange(e, index, state, setState, name)}
                                    label={""}
                                    type="text"
                                    textarea={false}
                                    placeholder=""
                                />
                            </div>

                            {/* Delete button for the current field */}
                            <button
                                onClick={(e) => HandleArrayDelete(index, state, setState, name, e)}
                                className='flex items-center gap-x-1 bg-Error-200 text-Error-25 hover:bg-Error-50 hover:text-Error-200 p-2 rounded-lg'
                            >
                                <MdDeleteForever />
                            </button>
                        </div>
                    ))
                }
            </div>

            {/* Button to add a new input field */}
            <button
                onClick={(e) => addToArray(state, setState, name, "", e)}
                className='flex items-center gap-x-1 text-Body-RL-Small bg-Success-200 text-Success-0 hover:bg-Success-100 hover:text-Success-300 py-2 px-5 rounded-lg'
            >
                Add {lable}
            </button>
        </div>
    );
};

export default ArrayFileds;
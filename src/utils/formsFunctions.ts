/**
     * Adds a new item to an array within the state.
     *
     * @param state - The current state object.
     * @param setState - The state setter function.
     * @param dataKey - The key in the state object that holds the array.
     * @param newData - The new item to be added to the array.
     * @param e - The event object (to prevent default behavior).
 */

export const addToArray = (state: any, setState: Function, dataKey: any, newData: any, e: any) => {
    e.preventDefault();
    setState({ 
        ...state, 
        [dataKey]: [...(state[dataKey] || []), newData] // Append new data to the array
    });
};


/**
     * Updates a specific item in an array within the state by index.
     *
     * @param e - The event object containing the updated value.
     * @param index - The index of the array item to update.
     * @param state - The current state object.
     * @param setState - The state setter function.
     * @param dataKey - The key in the state object that holds the array.
 */

export const handleArrayChange = (e: any, index: number, state: any, setState: Function, dataKey: any) => {
    const { value } = e.target;
    const updatedArray = [...state[dataKey]]; 
    updatedArray[index] = value; // Replace the value at the given index
  
    setState({
      ...state,
      [dataKey]: updatedArray, // Update the array in the state
    });
};


/**
     * Deletes a specific item from an array within the state by index.
     *
     * @param index - The index of the array item to delete.
     * @param state - The current state object.
     * @param setState - The state setter function.
     * @param dataKey - The key in the state object that holds the array.
     * @param e - The event object (to prevent default behavior).
 */

export const HandleArrayDelete = (index: number, state: any, setState: Function, dataKey: any, e: any) => { 
    e.preventDefault();
    const newData = [...state[dataKey]];
    newData.splice(index, 1); // Remove the item at the given index
    setState({ ...state, [dataKey]: newData });
};
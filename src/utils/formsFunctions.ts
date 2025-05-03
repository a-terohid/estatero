export const addToArray = (state: any , setState:Function, dataKey: any, newData: any , e:any) => {
    e.preventDefault();
    setState({ ...state, [dataKey]: [...( state[dataKey] || [] ), newData ] })
}



export const handleArrayChange = ( e : any, index : number , state: any , setState:Function , dataKey: any ) =>{
    const { value } = e.target;
    const updatedArray = [...state[dataKey]]; 
    updatedArray[index] = value; 
  
    setState({
      ...state,
      [dataKey]: updatedArray, 
    });
}



export const HandleArrayDelete = (index : number , state: any , setState:Function , dataKey: any , e:any) => { 
    e.preventDefault();
    const newdata = [...state[dataKey]];
    newdata.splice(index, 1);
    setState({ ...state, [dataKey]: newdata });
};
import { ERROR } from "@/types/enums/MessageUnum";

export const BlogFormValidation =  (data:any , DATA_Error:any) : any => {
    const errors = {
        title: DATA_Error?.title, 
       description: DATA_Error?.description, 
    }

    if (!data.title) {
        errors.title = ERROR.REQUIRED_FIELD;
    } else {
        errors.title = "";
    }

    if (!data.description) {
        errors.description = ERROR.REQUIRED_FIELD;
    } else {
        errors.description = "";
    }
}



export const BlogFormValidationResponse = (data : any) : {isValid: boolean , response: string} => {
    let isValid = true
    let response = ""

     if (!data.title) {
            response = 'title field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.description) {
            response = 'description field must be filled.'
            isValid = false
            return { isValid , response}
        } 

    return {isValid , response}
}
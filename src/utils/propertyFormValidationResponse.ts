export const propertyFormValidationResponse = (data : any) : {isValid: boolean , response: string} => {
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
    
        if (!data.price) {
            response = 'price field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.property_type) {
            response = 'property type field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.property_Category) {
            response = 'property Category field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.area) {
            response = 'area field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.bedrooms) {
            response = 'bedrooms field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.bathrooms) {
            response = 'bathrooms field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.parking_spaces) {
            response = 'parking spaces field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.year_built) {
            response = 'year built field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.status) {
            response = 'status field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.country) {
            response = 'country field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.state) {
            response = 'state field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.city) {
            response = 'city field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.zipcode) {
            response = 'zipcode field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.street) {
            response = 'street field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.unparsedAddress) {
            response = 'unparsedAddress field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.coordinates.Latitude) {
            response = 'Latitude field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    
        if (!data.Location.coordinates.Longitude) {
            response = 'Longitude field must be filled.'
            isValid = false
            return { isValid , response}
        } 
    

    return {isValid , response}
}
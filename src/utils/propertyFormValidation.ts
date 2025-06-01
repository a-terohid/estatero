import { ERROR } from "@/types/enums/MessageUnum";

export const propertyFormValidation = (data:any , DATA_Error:any) : any => {

    const errors = {
        title: DATA_Error?.title, 
        description: DATA_Error?.description, 
        price: DATA_Error?.price,
        property_type: DATA_Error?.property_type, 
        property_Category: DATA_Error?.property_Category, 
        area: DATA_Error?.area,
        bedrooms: DATA_Error?.bedrooms, 
        bathrooms: DATA_Error?.bathrooms, 
        parking_spaces: DATA_Error?.parking_spaces, 
        year_built: DATA_Error?.year_built,
        status: DATA_Error?.status,
        Location: {
            country: DATA_Error?.Location.country, 
            state: DATA_Error?.Location.state, 
            city: DATA_Error?.Location.city, 
            zipcode: DATA_Error?.Location.zipcode, 
            street: DATA_Error?.Location.street, 
            unparsedAddress: DATA_Error?.Location.unparsedAddress,
            coordinates: { 
                Latitude: DATA_Error?.Location.coordinates.Latitude, 
                Longitude: DATA_Error?.Location.coordinates.Longitude 
            }
        },
        tags: DATA_Error?.tags,
        facts_features: {
            F_description: DATA_Error?.facts_features.F_description,
            outdoor_details: DATA_Error?.facts_features.outdoor_details,
            interior_details: DATA_Error?.facts_features.interior_details,
            utilities_central: DATA_Error?.facts_features.utilities_central,
            other: DATA_Error?.facts_features.other,
        }
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

    if (!data.price) {
        errors.price = ERROR.REQUIRED_FIELD;
    } else {
        errors.price = "";
    }

    if (!data.property_type) {
        errors.property_type = ERROR.REQUIRED_FIELD;
    } else {
        errors.property_type = "";
    }

    if (!data.property_Category) {
        errors.property_Category = ERROR.REQUIRED_FIELD;
    } else {
        errors.property_Category = "";
    }

    if (!data.area) {
        errors.area = ERROR.REQUIRED_FIELD;
    } else {
        errors.area = "";
    }

    if (!data.bedrooms) {
        errors.bedrooms = ERROR.REQUIRED_FIELD;
    } else {
        errors.bedrooms = "";
    }

    if (!data.bathrooms) {
        errors.bathrooms = ERROR.REQUIRED_FIELD;
    } else {
        errors.bathrooms = "";
    }

    if (!data.parking_spaces) {
        errors.parking_spaces = ERROR.REQUIRED_FIELD;
    } else {
        errors.parking_spaces = "";
    }

    if (!data.year_built) {
        errors.year_built = ERROR.REQUIRED_FIELD;
    } else {
        errors.year_built = "";
    }

    if (!data.status) {
        errors.status = ERROR.REQUIRED_FIELD;
    } else {
        errors.status = "";
    }

    if (!data.Location.country) {
        errors.Location.country = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.country = "";
    }

    if (!data.Location.state) {
        errors.Location.state = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.state = "";
    }

    if (!data.Location.city) {
        errors.Location.city = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.city = "";
    }

    if (!data.Location.zipcode) {
        errors.Location.zipcode = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.zipcode = "";
    }

    if (!data.Location.street) {
        errors.Location.street = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.street = "";
    }

    if (!data.Location.unparsedAddress) {
        errors.Location.unparsedAddress = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.unparsedAddress = "";
    }

    if (!data.Location.coordinates.Latitude) {
        errors.Location.coordinates.Latitude = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.coordinates.Latitude = "";
    }

    if (!data.Location.coordinates.Longitude) {
        errors.Location.coordinates.Longitude = ERROR.REQUIRED_FIELD;
    } else {
        errors.Location.coordinates.Longitude = "";
    }

    return errors
}
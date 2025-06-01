import React from 'react';
import INPUT from '../INPUT';

const LocationForm = ({data , locationHandler , CordinatesHandler}:any) => {

    const {country , state , city , zipcode , street , unparsedAddress , coordinates} = data.Location
    const {  Latitude , Longitude } = coordinates

    return (
        <div className="lg:w-1/2 mt-8 flex flex-col gap-y-5">
                <INPUT
                    label="Country:"
                    type="text"
                    name="country"
                    value={country}
                    placeholder="Enter country here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="State:"
                    type="text"
                    name="state"
                    value={state}
                    placeholder="Enter state here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="City:"
                    type="text"
                    name="city"
                    value={city}
                    placeholder="Enter city here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="Zipcode:"
                    type="text"
                    name="zipcode"
                    value={zipcode}
                    placeholder="Enter zipcode here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="Street:"
                    type="text"
                    name="street"
                    value={street}
                    placeholder="Enter street here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="UnparsedAddress:"
                    type="text"
                    name="unparsedAddress"
                    value={unparsedAddress}
                    placeholder="Enter unparsedAddress here"
                    changeHandler={locationHandler}
                    textarea={false}
                />
                <INPUT
                    label="Latitude:"
                    type="text"
                    name="Latitude"
                    value={Latitude}
                    placeholder="Enter Latitude here"
                    changeHandler={CordinatesHandler}
                    textarea={false}
                />
                <INPUT
                    label="Longitude:"
                    type="text"
                    name="Longitude"
                    value={Longitude}
                    placeholder="Enter Longitude here"
                    changeHandler={CordinatesHandler}
                    textarea={false}
                />
        </div>
    );
};

export default LocationForm;
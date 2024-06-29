import axios from 'axios';
import getEnvironmentVariable from '../utils/environment';
import { GeocodingResponse, RestaurantsResponse } from '../types';
import { ErrorMessages } from './errors-management';

/**
This function has an input address='Cali, Valle del Cauca, Colombia'
and returns the latitude and longitude of the address '3.4516467,-76.5319854'
*/
const geocodeAddress = async (address: string) => {
    let latitudeLongitude: string;
    const response = await axios.get<GeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
            address: address,
            key: getEnvironmentVariable('GOOGLE_MAPS_API_KEY'),
        },
    });

    if (!response?.data?.results?.length) {
        throw new Error(ErrorMessages.ADDRESS_NOT_FOUND);
    }

    latitudeLongitude = response?.data?.results[0]?.geometry?.location?.lat + ',' + response?.data?.results[0]?.geometry?.location?.lng;
    return latitudeLongitude;
}

/**
This function searches for restaurants near the given latitude and longitude latitudeLongitude: string = '3.4516467,-76.5319854'
pageToken is used to paginate the results and is provided by the Google Maps API
*/
const searchRestaurants = async (latitudeLongitude: string, pageToken?: string) => {
    const response = await axios.get<RestaurantsResponse>(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
            location: latitudeLongitude,
            key: getEnvironmentVariable('GOOGLE_MAPS_API_KEY'),
            radius: 500,
            type: 'restaurant',
            pagetoken: pageToken ?? '',
        },
    });

    return response?.data;
}

export {
    geocodeAddress,
    searchRestaurants,
};

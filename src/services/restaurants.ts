import { isLatLong } from '../utils/algorithms';

import { ErrorMessages } from '../utils/errors-management';
import { geocodeAddress, searchRestaurants } from '../utils/http-requests';
import { mapRestaurantsApiResponse } from '../utils/mappings';

/**
This function gets the restaurants near the given location and
pageToken is used to paginate the results and is provided by the Google Maps API
on the response
*/
const getRestaurantsService = async (location: string, pageToken?: string) => {
    let latitudeLongitude = location.trim();

    // If location is not a latitude and longitude, then must search for it
    if (!isLatLong(location)) {
        console.log('location is type address. Getting latitude and longitude');
        latitudeLongitude = await geocodeAddress(location);
    } else {
        if (latitudeLongitude !== location.replaceAll(' ', '')) {
            throw new Error(ErrorMessages.LOCATION_INCORRECT_FORMAT);
        }
    }

    console.log('latitudeLongitude', latitudeLongitude);

    const restaurantsApiResponse = await searchRestaurants(latitudeLongitude, pageToken);

    const response = mapRestaurantsApiResponse(restaurantsApiResponse);

    return {
        next_page_token: restaurantsApiResponse.next_page_token,
        restaurants: response,
    };
};

export { getRestaurantsService };

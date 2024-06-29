import { Restaurants, RestaurantsResponse } from '../types';
import { extractHref } from './algorithms';

/**
This function maps the response of the Google Maps API to the restaurants REST API type
*/
const mapRestaurantsApiResponse = (restaurantsApiResponse: RestaurantsResponse): Restaurants[] => {
    return restaurantsApiResponse.results.map((restaurant) => {
        /** 
        'mapReference' is used to display the map of the restaurant
        if the restaurant has a photo, the mapReference is the photo's attribution href.

        'restaurant.photos?.[0]?.html_attributions[n]' is a <a> HTML tag with the href attribute
        so we need to extract the href from the tag
        */
        let mapReference = '';
        const restaurantHasPhoto = restaurant.photos?.length;
        const restaurantHasPhotoAttribution = restaurant.photos?.[0]?.html_attributions?.length;
        if (restaurantHasPhoto && restaurantHasPhotoAttribution) {
            mapReference = restaurant.photos[0]?.html_attributions[0];
            if (mapReference === undefined) {
                mapReference = '';
            } else {
                mapReference = extractHref(mapReference);
            }
        }

        return {
            name: restaurant.name,
            address: restaurant.vicinity,
            rating: restaurant.rating,
            user_ratings_total: restaurant.user_ratings_total,
            icon: restaurant.icon,
            is_open_now: restaurant.opening_hours?.open_now,
            lat: restaurant.geometry?.location?.lat,
            lng: restaurant.geometry?.location?.lng,
            map_reference: mapReference,
        };
    });
};

export { mapRestaurantsApiResponse };

import { Restaurants, RestaurantsResponse } from "../types";
import { extractHref } from "./algorithms";

const mapRestaurantsApiResponse = (restaurantsApiResponse: RestaurantsResponse): Restaurants[] => {
    return restaurantsApiResponse.results.map((restaurant) => {

        let mapReference = "";
        const restaurantHasPhoto = restaurant.photos?.length;
        const restaurantHasPhotoAttribution = restaurant.photos?.[0]?.html_attributions?.length;
        if (restaurantHasPhoto && restaurantHasPhotoAttribution) {
            mapReference = restaurant.photos[0]?.html_attributions[0];
            if (mapReference === undefined) {
                mapReference = "";
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
            map_reference: mapReference
        }
    })

};

export {
    mapRestaurantsApiResponse,
};

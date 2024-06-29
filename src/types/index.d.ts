import { TransactionType } from '../models/transaction';

export interface SignUpRequestBody {
    username: string;
    password: string;
}

export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface CreateTransactionRequestBody {
    amount: number;
    type: TransactionType;
}

export interface JWTPayload {
    userId: number;
}

/** 
The param 'userId' is set by the JWT middleware
*/
export interface ParamsForAuthenticatedUser {
    userId: number;
}

/**
Google Maps API response
*/
export interface GeocodingResponse {
    results: Array<{
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }>;
}

/**
Google Maps API response
*/
export interface RestaurantsResponse {
    next_page_token: string;
    results: Array<{
        name: string;
        vicinity: string;
        rating: number;
        user_ratings_total;
        icon: string;
        opening_hours: {
            open_now: boolean;
        };
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
        photos: Array<{
            height: number;
            width: number;
            html_attributions: Array<string>;
        }>;
    }>;
}

export interface Restaurants {
    name: string;
    address: string;
    rating: number;
    user_ratings_total: number;
    icon: string;
    is_open_now: boolean;
    lat: number;
    lng: number;
    map_reference: string;
}

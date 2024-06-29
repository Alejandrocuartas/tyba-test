/**
This function checks if the ocation is a 'latitude,longitude' string
*/
const isLatLong = (location: string) => {
    const parts = location.split(',');

    // Check if there are exactly two parts like '70.453,-51.3444'
    if (parts.length !== 2) {
        return false;
    }

    // Parse the latitude and longitude
    const lat = parseFloat(parts[0].trim());
    const lon = parseFloat(parts[1].trim());

    // Check if both values are valid numbers and within the valid range
    const latitudeIsCorrect = !isNaN(lat) && lat >= -90 && lat <= 90;
    const longitudeIsCorrect = !isNaN(lon) && lon >= -180 && lon <= 180;

    if (latitudeIsCorrect && longitudeIsCorrect) {
        return true;
    }

    return false;
};

/**
This function extracts the href attribute from a <a> HTML string tag
*/
const extractHref = (htmlString: string) => {
    // Regular expression to match href attribute value from <a> tag
    const hrefRegex = /<a\s+href="([^"]*)"/;
    const match = htmlString.match(hrefRegex);

    // If a match is found, return the first capture group (the URL), otherwise return null
    return match ? match[1] : '';
};

export { isLatLong, extractHref };

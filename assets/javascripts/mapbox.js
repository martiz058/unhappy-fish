function getCoordinates(location_query) {
    if (!location_query) {
        return {
            properties: {
                name: ''
            }
        }
    }

    try {
        const selectLocation = JSON.parse(location_query);

        return {
            geometry: selectLocation.geometry,
            properties: {
                name: selectLocation.properties.name,
                place_formatted: selectLocation.properties.place_formatted,
                full_address: selectLocation.properties.full_address
            }
        };
    } catch {
        return {
            geometry: { type: 'Point', coordinates: [-74.0059945, 40.7127492] },
            properties: {
                name: 'N/A',
                place_formatted: 'N/A',
                full_address: 'N/A'
            }
        }
    }

}

module.exports = getCoordinates;

document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
});

function initializeMap() {
    const mapElement = document.getElementById('map');
    const mapToken = mapElement.getAttribute('data-map-token');
    const coordinates = JSON.parse(mapElement.getAttribute('data-coordinates'));

    mapboxgl.accessToken = mapToken;

    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 15
    });

    // Add marker
    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

    // Add controls
    addMapControls(map);
}

function addMapControls(map) {
    // Navigation control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    // Geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    });
    map.addControl(geolocate, 'top-left');

    // Fullscreen control
    const fullscreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullscreenControl, 'top-right');

    // Scale control
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
    });
    map.addControl(scale, 'bottom-right');
}

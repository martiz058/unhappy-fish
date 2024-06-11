document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    const mapToken = mapElement.getAttribute('data-map-token');
    const coordinates = JSON.parse(mapElement.getAttribute('data-coordinates'));

    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 15
    });

    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    });
    map.addControl(geolocate, 'top-left');

    const fullscreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullscreenControl, 'top-right');

    const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
    });
    map.addControl(scale, 'bottom-right');
});


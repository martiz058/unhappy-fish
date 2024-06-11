const script = document.getElementById('search-js');
script.onload = function () {
    const searchBox = document.querySelector('mapbox-search-box')

    searchBox.options = {
        language: 'es',
        country: 'US'
    }

    searchBox.addEventListener('retrieve', (e) => {
        const selectLocation = e.detail;
        document.getElementById('location').value = JSON.stringify(selectLocation.features[0]);
    });
}
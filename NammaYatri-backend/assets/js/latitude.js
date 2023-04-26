function GEO_LOCATION_LATITUDE() {
    let latitude = 0
    navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latiitude;

    })
    return latitude;
}

module.exports = { GEO_LOCATION_LATITUDE }
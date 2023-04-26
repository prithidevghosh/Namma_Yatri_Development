function GEO_LOCATION_LONGITUDE() {
    let longitude = 0
    navigator.geolocation.getCurrentPosition(position => {
        longitude = position.coords.longitude;

    })
    return longitude
}

module.exports = { GEO_LOCATION_LONGITUDE }
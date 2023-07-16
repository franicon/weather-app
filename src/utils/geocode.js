const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW9taS1hbHVrbyIsImEiOiJjbGszY2xranEwMGlwM2dubHI3NzJhcWY2In0.D68rmpxg_N5D7JzLMaH5-g&limit=1`
    request({ url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to fetch data', undefined)
        } else if (body.features.length === 0) {
            callback('No matching results', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode

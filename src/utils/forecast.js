const request = require('request');

const forecast = (location, callback) => {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?unitGroup=metric&key=8PPE55BMZVRALYB77Z7DQ5SD6&contentType=json"

    request({ url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body === 'Bad API Request:Must specify either location list or input datasource') {
            callback('Unable to find location', undefined)
        } else {
            const {conditions, temp, precipprob} = body.currentConditions
            callback(undefined, `${conditions}, It currently  ${temp} degrees out. there is a ${precipprob} chance of rain.`)
        }
    })
}

module.exports = forecast

const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/bc1b59e0cb0b16b4f9aac8bd6d404f2c/' + lat + ',' + long + '?units=si'

    request({url, json: true}, (error, {body}) => {
        
        if (error) {
            callback('Unable to connect to weather services')
        } else if (body.error) {
            callback('Invalid request')
        } else {
            const currentWeather = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '°C out. There is a ' + body.currently.precipProbability + '% chance of rain. The wind speed is ' + body.currently.windSpeed + ' m/s with gusts up to ' + body.currently.windGust + ' m/s.' 
            callback(undefined, currentWeather)
        }
    })
}

module.exports = forecast
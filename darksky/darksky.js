const request = require('request');
const darkSkyAPIKey = require('../APIs/apiKeys');

let getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${darkSkyAPIKey.darkSkyAPIKey}/${lat},${long}`,
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(`The current temperature is ${body.currently.temperature}, but it feels like ${body.currently.apparentTemperature}`);
        } else {
            callback("Unable to fetch weather");
        } 
    });
}

module.exports = {
    getWeather,
};
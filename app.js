const request = require('request');
const googleAPIKey = require('./APIs/apiKeys');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=' + googleAPIKey,
    json: true,
}, (error, response, body) => {
    console.log(body);
    
});
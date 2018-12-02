const request = require('request');
const yargs = require('yargs');
const googleAPIKey = require('./APIs/apiKeys');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true,
    }
})
.help()
.alias('help', 'h')
.argv;

let userInput = encodeURIComponent(argv.a);


request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=` + googleAPIKey,
    json: true,
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find address.');   
    } else if (body.status === 'OK') {
        console.log(`Latitude: ${body.results[0].geometry.location.lat}. Longitude: ${body.results[0].geometry.location.lng}.`); 
    }
});
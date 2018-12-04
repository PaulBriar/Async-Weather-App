const yargs = require('yargs');
const googleKey = require('./APIs/apiKeys');
const darkSkyKey = require('./APIs/apiKeys');
const axios = require('axios');

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

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=` + googleKey.googleAPIKey;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    } 
    
    let lat = response.data.results[0].geometry.location.lat;;
    let long = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${darkSkyKey.darkSkyAPIKey}/${lat},${long}`
    console.log(response.data.results[0].formatted_address); 
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemp}`);
    
}).catch((err) => {
    if(err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(err.message);   
    }
});


// let asyncAdd = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (typeof a === 'number' && typeof b === 'number') {
//                 resolve(a + b);
//             } else {
//                 reject('Arguments must be numbers');
//             }
//         }, 1500);
//     });
// };

// asyncAdd(5, '7').then((res) => {
//     console.log('Results: ', res);
//     return asyncAdd(res, 33);
// }).then((res) => {
//     console.log(res);
// }).catch( (errorMessage) => {
//     console.log(errorMessage);
// });

const request = require('request');
const googleAPIKey = require('../APIs/apiKeys');


let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=` + googleAPIKey.googleAPIKey,
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find address.');   
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });
            }
        });
        });
    
}

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});

// let somePromise = new Promise( (resolve, reject) => {
//     setTimeout( () => {
//         resolve('Hey it worked')
//         // reject('Promise broken');
//     }, 2000);
// });

// somePromise.then((message) => {
//     console.log('Success', message);
// }, (errorMessage) => {
//     console.log(`Error: ${errorMessage}`);
// });
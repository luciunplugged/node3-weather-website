const request = require('postman-request')


const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29yaXlhaGNvcnAiLCJhIjoiY2thYmtybHdwMWkzdDJzb3pzMDN1aGJ6dSJ9.WMyUiSWY6ZekngFXMc5uGQ&limit=1'

	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to location services!')
		} else if (body.features.length === 0) {
			callback('Unable to find location, please search again!', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

//export moduel usage reference
// geocode('San Leandro', (error, data) => {
// 	console.log('Error:', error)
// 	console.log('Data:', data)
// })

module.exports = geocode
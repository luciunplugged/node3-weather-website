const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=47bc0da1d3e59db9d17319578c832ecf&query=' + latitude + ',' + longitude +'&units=f'
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (body.success === false) {
			return('Unable to find location!', undefined)
		}
		else {
			callback(undefined,
				'Here is the weather for ' + body.location.name + ', ' + body.location.region +
				'. Currently it is ' + body.current.temperature + ' degress and feels like ' + body.current.feelslike +
				 '. It is ' + body.current.weather_descriptions[0].toLowerCase() + ' with ' + body.current.humidity + '% humidity and there is a ' + body.current.precip +
				'% chance of rain.'

			)
		}
	})
}






// //export module usage reference
// forecast(-75.7088, 44.1545, (error, data) => {
// 	console.log('Error', error)
// 	console.log('Data', data)
// })

module.exports = forecast
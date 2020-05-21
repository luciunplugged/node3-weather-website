const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//heroku default port var with local option
const port = process.env.PORT || 3000


// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve to browser
app.use(express.static(path.join(publicDirectoryPath)))


//page route handlers
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Lucky'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Lucky',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Section',
		message: 'How can we help you today?',
		name: 'Lucky'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send('Please provide an address!')
	} else {
		geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

			if (error) {
				return res.send('Can not connect to location services')
			}
			forecast(latitude, longitude,(error, forecastData) => {

				if (error) {
					return res.send('Can not connect to weather services')
				}
				res.send( {
					address: req.query.address,
					location,
					forecast: forecastData
				})
			})
		})
	}
})


//404 page which has to come after all pages in order

app.get ('/about/*', (req, res) =>{
	res.render('404', {
		title: '404',
		name: 'Lucky',
		errorMessage: 'You clearly know more about us than we do!'
	})
})

app.get ('/help/*', (req, res) =>{
	res.render('404', {
		title: '404',
		name: 'Lucky',
		errorMessage: 'Phoning Elon, hold on!'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Lucky',
		errorMessage: 'We can only get you the weather for this planet!'
	})
})

//server listener
app.listen(port, () => {
	console.log('Server is up on port' + port)
})




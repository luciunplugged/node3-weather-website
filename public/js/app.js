const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Awesome weather is on the way, just search.'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value

	// //get data from the browser and provide error message
	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = 'I mean, do you really want the weather?'
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})



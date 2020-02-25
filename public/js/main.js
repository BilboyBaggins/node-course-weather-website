// Uses Fetch API to get data from server

const getWeather = (userInputLocation) => {
    fetch('/weather?address=' + userInputLocation).then((response) => {
        response.json().then(( { error, location, forecast } ) => {
            if(error) {
                messageOne.textContent = error
                return console.log(error)
            }

            messageOne.textContent = location
            messageTwo.textContent = forecast
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#pOne')
const messageTwo = document.querySelector('#pTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    getWeather(location)
})
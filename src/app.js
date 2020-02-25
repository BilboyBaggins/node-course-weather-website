// app.get arguments = file location and function of what to do when that location is visited
// req has information about incoming request to the server; res is the response

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Renders one of the views from handlebars, passing an object with all the values the view can access
app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather',
        name: 'Bilbo'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Bilbo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Heckin Help Page',
        name: 'Bilbo',
        message: 'This is my help message which is not actually very helpful'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(lat, long, (error, response) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            res.send({
                location,
                forecast: response
            })
        })        
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Bilbo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page note found',
        name: 'Bilbo'
    })
})


app.listen(port, () => {
    console.log('The server is listening on port ' + port)
})

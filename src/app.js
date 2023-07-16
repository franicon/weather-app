const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (rq, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abayomi Aluko'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abayomi Aluko'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abayomi Aluko'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no Address is provided'
        })
    }
    geocode(req.query.address, (err, { location } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        forecast(location, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server running on port 3000')
})

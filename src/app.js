require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ryan Erswell'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if(error){
                return res.send({error});
            }
            const latLong = `${latitude},${longitude}`;
            forecast(latLong, (error, forecastData) => {
                if(error){
                    return res.send({error});
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ryan Erswell',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
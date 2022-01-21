const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request') 
const app = express()
const port = process.env.PORT || 3000

//load in utility files

const forcast = require('./utilities/forcast')

//define paths for express config
const publicDir = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

//setup handlebars engine and views directory
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Issa Mohamed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Issa Mohamed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help SOS PLEASE SEND EMERGENCY',
        title: 'help page',
        name: 'issa Mohamed'
    })
})



// app.get('/help', (req, res) => {
//     res.send({
//         name: 'issa',
//         age: 30
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
       
    } else {
        const location = req.query.address
        forcast(location, (error, {forcast, temperature, name, country} = {}) => {
            if (error) {
                return res.send({
                    error
                 })
            } else {
                res.send({
                    location:{
                        city: name,
                        country: country
                    },
                   forcast: forcast,
                   temperature: temperature
                    
                    
                })

            }
            })
    
    }
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'please provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('errorPage',{
        title: '404 Help',
        name: 'Issa Mohamed',
        error: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('errorPage',{
        title: '404',
        name: 'Issa Mohamed',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

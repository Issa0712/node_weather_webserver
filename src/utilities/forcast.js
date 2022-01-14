const request = require('request')

const forcast = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=94615ea0e53712c2f2bb5bea884fe288&units=metric`

    request({url, json: true}, (error, {body}) => {
        console.log(body.cod)
        if(body.cod !== 200) {
            callback('unable to connect to weather api', undefined)
            console.log('not found')
           
        } else if (body.error) {
            callback('location dont exsist', undefined)
        } else {
            callback(undefined, {
            
                    name: body.name,
                    country: body.sys.country,
                    forcast: body.weather,
                    temperature: body.main
                    
            })
        }
    })
}

module.exports = forcast
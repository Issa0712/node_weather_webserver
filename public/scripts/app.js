
console.log('client side JS has loaded')
const weatherForm = document.querySelector('.form')
const serverResponse = document.querySelector('#serverResponse')

//Icons

const sunShower = 
`<div class="icon sun-shower">
    <div class="cloud"></div>
    <div class="sun">
    <div class="rays"></div>
    </div>
    <div class="rain"></div>
</div>`

const thunderStorm = 
`<div class="icon thunder-storm">
    <div class="cloud"></div>
    <div class="lightning">
    <div class="bolt"></div>
    <div class="bolt"></div>
    </div>
</div>`

const cloudy = 
`<div class="icon cloudy">
    <div class="cloud"></div>
    <div class="cloud"></div>
</div>`

const snow =
`<div class="icon flurries">
    <div class="cloud"></div>
    <div class="snow">
    <div class="flake"></div>
    <div class="flake"></div>
    </div>
</div>`



const sunny = 
`<div class="icon sunny">
    <div class="sun">
    <div class="rays"></div>
    </div>
</div>`

const rainy = 
`<div class="icon rainy">
    <div class="cloud"></div>
    <div class="rain"></div>
</div>`

let icon;

const fetchWeather = (location) => {
    serverResponse.textContent = 'Loading...'
  
    
   

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            console.log(response)
            if(data.error) {
               
                serverResponse.textContent = `Error Unable to obtain location ...`
            } else {
            
                
                serverResponse.textContent = ''
                console.log(data.location.city)
                console.log(data)
                console.log(data.forcast[0].icon)

                if (data.forcast[0].main === 'Clouds'){
                    icon = cloudy
                } else if (data.forcast[0].main === 'Clear') {
                    icon = sunny
                } else if(data.forcast[0].main === 'Rain') {
                    icon = rainy
                } else if (data.forcast[0].main === 'Thunderstorm') {
                    icon = thunderStorm
                } else if (data.forcast[0].main === 'Snow') {
                    icon = snow
                } else {
                    icon = cloudy
                }

                const temp = Math.ceil(data.temperature.temp)
                const html =  ` 
                <div class="weather">
                 <div class="weather_icon">${icon}
                 </div>
                 
                 <h3>${data.forcast[0].description}<h3>
                 <h2 class="weatherInfo__temp">${temp}°</h2>
                 <h3 class="weatherInfo__location"> ${data.location.city}, ${data.location.country} </h3>
                 </div>
                 <div class="information">
                 <p>Min: ${Math.ceil(data.temperature.temp_min)}°C</p>
                 <p>Max: ${Math.ceil(data.temperature.temp_max)}°C</p>
                 <p>Feels Like: ${Math.ceil(data.temperature.feels_like)}°C</p>
                 <p>Humidity: ${Math.ceil(data.temperature.humidity)}%</p>
                 </div>
                `
                serverResponse.insertAdjacentHTML('beforeend', html)
               
               
             }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    const searchInput = document.querySelector('input')
    const location = searchInput.value
    e.preventDefault()
    fetchWeather(location)
    
})





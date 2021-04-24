let weather = {
    apiKey: "e10fc222094540e7b4c151538212404", 
    fetchWeather: function (city) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: (data) => {
       const { country, name } = data.location
       const { icon, text} = data.current.condition
       const { temp_c, humidity, wind_kph } = data.current
       document.querySelector(".city").innerHTML = `Weather in ${name} / ${country}`
       document.querySelector(".icon").src = `${icon}`
       document.querySelector(".description").innerHTML = `${text}`
       document.querySelector(".temp").innerHTML = `${temp_c}°C`
       document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`
       document.querySelector(".wind").innerHTML = `Wind speed: ${wind_kph} km/h`
       document.querySelector(".weather").classList.remove("loading")
       document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value) 
    },
}

document.querySelector(".button").addEventListener("click", function(){
    weather.search()
})

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search()
    }
})

let topCities = ["London","Paris","Moscow","Tokyo","Dubai","Singapore","Barcelona","New York City","Delhi","Mumbai","Madrid","İstanbul","Sofia","Ankara"]

let randomCity = topCities[Math.floor(Math.random()*topCities.length)]

weather.fetchWeather(randomCity)
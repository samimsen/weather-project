let weather = {
    apiKey: "52519dbfdf6da32600b74e18836f8538",
    fetchWeather: function (city) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: (data) => {
       const { country } = data.sys
       const { name } = data
       const { icon,description } = data.weather[0]
       const { temp,humidity } = data.main
       const { speed } = data.wind
       document.querySelector(".city").innerHTML = `Weather in ${name} / ${country}`
       document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`
       document.querySelector(".description").innerHTML = `${description}`
       document.querySelector(".temp").innerHTML = `${Math.floor(Number(temp))}°C`
       document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`
       document.querySelector(".wind").innerHTML = `Wind speed: ${speed} km/h`
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

let topCities = ["London","Paris","Moscow","Tokyo","Dubai","Singapore","Barcelona","New York City","Delhi","Mumbai","Madrid","İstanbul","Sofya","Ankara"]

let randomCity = topCities[Math.floor(Math.random()*topCities.length)]

weather.fetchWeather(randomCity)
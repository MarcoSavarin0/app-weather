const api = {
    key: "606dbbffc1f117da0e349c3abd1d3c15",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
console.log(searchBox);
searchBox.addEventListener('keypress', setQuery)

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchBox.value);
    }
}


function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&appid=${api.key}`)
    .then(weather =>{
        return weather.json()
    }).then(displayResults);
}

function displayResults (weather){
    let main = document.querySelector('main')
    main.classList.add('main')
    
    console.log(weather.length);
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name},${weather.sys.country}`
    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now)
    
    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round((weather.main.temp)- 273.15).toFixed(1)} <span>°C</span>`
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main
    let wm = weather.weather[0].main
    if(wm == 'Clear'){
        weather_el.innerHTML += '<i class="fa-solid fa-sun"></i>'
    }else if(wm == "Clouds"){
        weather_el.innerHTML += '<i class="fa-solid fa-cloud"></i>'
    }else if(wm == "Rain"){
        weather_el.innerHTML += '<i class="fa-solid fa-cloud-showers-heavy"></i>'
    }

    let hilow = document.querySelector('.hi-low')
    hilow.innerText =  `${(weather.main.temp_min - 273.15).toFixed(1)} °C / ${(weather.main.temp_max - 273.15) .toFixed(1)} °C`
    main.classList.add('fade-in-animation');
    setTimeout(() => {
        main.classList.remove('fade-in-animation');
      }, 1000);
}

function dateBuilder(d){
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
      let day = days[d.getDay()]
      let date = d.getDate()
      let month = months[d.getMonth()]
      let year = d.getFullYear()

      return`${day} ${date} ${month} ${year}`
}

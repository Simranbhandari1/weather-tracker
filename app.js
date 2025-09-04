const apiKey = "5d5d4138e5f242f0a6d195726253008";
const apiUrl ="https://api.weatherapi.com/v1/current.json?key=5d5d4138e5f242f0a6d195726253008&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const body = document.getElementsByTagName("body")[0];

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + "&aqi=yes");
	console.log(apiUrl + city + "&aqi=yes");
	if (response.status == 400) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else {
		var data = await response.json();
		console.log(data);
		document.querySelector(".city").innerHTML = data.location.name;
		document.querySelector(".temp").innerHTML =
			Math.round(data.current.temp_c) + "°C";
		document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
		document.querySelector(".wind").innerHTML = data.current.wind_kph + "Km/h";

		let condition = data.current.condition.text.toLowerCase();
		let weatherIcon = document.querySelector(".weather-icon");

		if (condition.includes("cloud")) {
			weatherIcon.src = "images/clouds.png";
			body.style.backgroundImage = "url('images/cloudy-bg.jpg')";
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundPosition = "center";
		} else if (condition.includes("clear") || condition.includes("sun")) {
			weatherIcon.src = "images/clear.png";
			body.style.backgroundImage = "url('images/clear-bg.jpg')";
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundPosition = "center";
		} else if (condition.includes("rain") || condition.includes("drizzle")) {
			weatherIcon.src = "images/rain.png";
			body.style.backgroundImage = "url('images/rainy-bg.jpg')";
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundPosition = "center";
		} else if (condition.includes("mist") || condition.includes("fog")) {
			weatherIcon.src = "images/mist.png";
			body.style.backgroundImage = "url('images/mist-bg.jpg')";
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundPosition = "center";
		} else {
			weatherIcon.src = "images/default.png";
			body.style.backgroundImage = "url('images/default-bg.jpeg')";
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundPosition = "center";
		}
		document.querySelector(".weather").style.display = "block";
	}
}
searchBtn.addEventListener("click", () => {
	checkWeather(searchBox.value);
});

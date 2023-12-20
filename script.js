var search = document.querySelector("#searchIpt");
var searchBtn = document.querySelector("#searchBtn");
var searchInput = "Bangalore";
var temp_c = document.querySelector("#temp_c");
var temp_f = document.querySelector("#temp_f");
var wind_kph = document.querySelector("#wind_kph");
var wind_mph = document.querySelector("#wind_mph");
var lat = document.querySelector("#lat");
var lon = document.querySelector("#lon");
var wind_dir = document.querySelector("#wind_dir");
var humidity = document.querySelector("#humidity");
var cloud = document.querySelector("#cloud");
var uv = document.querySelector("#uv");
var condImg = document.querySelector(".condition img");
var condition = document.querySelector(".condition h4");
var condVid = document.querySelector("#ConditionVideo video");

function loadingPage() {
  // var load = document.querySelector(".loading");
  // var count = 0;
  // var int = setInterval(function () {
  //   if (count < 100) {
  //     count++;
  //     load.style.width = `${count}%`;
  //   } else{
  //         clearInterval(int)
  //   }
  // }, 30);
  var tl = gsap.timeline();
  tl.from(".text h1", {
    y: 250,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from(".loader", {
    opacity: 0,
    duration: 0.6,
  });
  tl.from(".loading", {
    width: "10%",
    duration: 2.5,
    delay: 0.3,
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 1,
  });

  tl.from("#page1", {
    delay: 0.2,
    duration: 0.5,
    y: 1600,
    opacity: 0,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
}

function dataProccessing() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log("Latitude: " + latitude);
        // console.log("Longitude: " + longitude);
        var requestOptions = {
          method: "GET",
        };
        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=d4fdcbe04c4e44ca97aea0edc7c485d5`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            var city = result.features[0].properties.city;
            document.querySelector("#userdata h2").textContent = city;
            document.querySelector("#cityName").textContent = city;

            var requestOptions = {
              method: "GET",
            };
            fetch(
              `http://api.weatherapi.com/v1/current.json?key=50da71023c4243cb9ca113325231912&q=${city}&aqi=no`,
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                //  console.log(result);
                temp_c.textContent = result.current.temp_c;
                temp_f.textContent = result.current.temp_f;
                wind_kph.textContent = result.current.wind_kph;
                wind_dir.textContent = result.current.wind_dir;
                humidity.textContent = result.current.humidity;
                wind_mph.textContent = result.current.wind_mph;
                uv.textContent = result.current.uv;
                cloud.textContent = result.current.cloud;
                lat.textContent = result.location.lat;
                lon.textContent = result.location.lon;
                condImg.src = result.current.condition.icon;
                condition.textContent = `${result.location.name} is currently ${result.current.condition.text} weather`;

                if (
                  result.current.condition.text === "Partly cloudy" ||
                  result.current.condition.text === "Cloudy" ||
                  result.current.condition.text === "Overcast" ||
                  result.current.condition.text === "Mist"
                ) {
                  condVid.src = "clouds.mp4";
                } else if (
                  result.current.condition.text === "Patchy rain possible" ||
                  result.current.condition.text ===
                    "Patchy freezing drizzle possible" ||
                  result.current.condition.text === "Patchy light drizzle" ||
                  result.current.condition.text === "Freezing drizzle" ||
                  result.current.condition.text === "Heavy freezing drizzle" ||
                  result.current.condition.text === "Patchy light rain" ||
                  result.current.condition.text === "Light rain" ||
                  result.current.condition.text === "Light drizzle"
                ) {
                  condVid.src = "Rain.mp4";
                } else if (
                  result.current.condition.text === "Light sleet" ||
                  result.current.condition.text === "Patchy light snow" ||
                  result.current.condition.text === "Light snow" ||
                  result.current.condition.text === "Moderate snow" ||
                  result.current.condition.text === "Blizzard" ||
                  result.current.condition.text === "Blowing snow" ||
                  result.current.condition.text === "Patchy heavy snow" ||
                  result.current.condition.text === "Heavy snow" ||
                  result.current.condition.text === "Ice pellets" ||
                  result.current.condition.text === "Light sleet showers" ||
                  result.current.condition.text ===
                    "Light showers of ice pellets" ||
                  result.current.condition.text ===
                    "Moderate or heavy snow showers" ||
                  result.current.condition.text ===
                    "Moderate or heavy sleet showers" ||
                  result.current.condition.text ===
                    "Moderate or heavy showers of ice pellets" ||
                  result.current.condition.text ===
                    "Patchy light snow with thunder" ||
                  result.current.condition.text ===
                    "Moderate or heavy snow with thunder" ||
                  result.current.condition.text === "Patchy moderate snow"
                ) {
                  condVid.src = "snow.mp4";
                } else if (
                  result.current.condition.text ===
                    "Patchy light rain with thunder" ||
                  result.current.condition.text ===
                    "Thundery outbreaks possible" ||
                  result.current.condition.text ===
                    "Moderate or heavy rain with thunder"
                ) {
                  condVid.src = "thunder.mp4";
                } else if (
                  result.current.condition.text === "Moderate rain at times" ||
                  result.current.condition.text === "Moderate rain" ||
                  result.current.condition.text === "Heavy rain at times" ||
                  result.current.condition.text === "Light rain shower" ||
                  result.current.condition.text ===
                    "Moderate or heavy rain shower" ||
                  result.current.condition.text === "Torrential rain shower" ||
                  result.current.condition.text === "Heavy rain" ||
                  result.current.condition.text === "Light freezing rain" ||
                  result.current.condition.text ===
                    "Moderate or heavy freezing rain"
                ) {
                  condVid.src = "Raining.mp4";
                } else if (
                  result.current.condition.text === "Fog" ||
                  result.current.condition.text === "Freezing fog"
                ) {
                  condVid.src = "fog.mp4";
                } else {
                  condVid.src = "Sun.mp4";
                }
              })
              .catch((error) => console.log("error", error));
          })
          .catch((error) => console.log("error", error));
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      }
    );
  } else {
    console.error("Geolocation is not supported by your browser.");
  }

  setInterval(function () {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.querySelector("#time").innerHTML = formattedTime;
  }, 1000);

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  document.querySelector("#date").innerHTML = formattedDate;

  searchBtn.addEventListener("click", function () {
    searchInput = search.value;
    var requestOptions = {
      method: "GET",
    };
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=50da71023c4243cb9ca113325231912&q=${searchInput}&aqi=no`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        temp_c.textContent = result.current.temp_c;
        temp_f.textContent = result.current.temp_f;
        wind_kph.textContent = result.current.wind_kph;
        wind_dir.textContent = result.current.wind_dir;
        humidity.textContent = result.current.humidity;
        wind_mph.textContent = result.current.wind_mph;
        uv.textContent = result.current.uv;
        cloud.textContent = result.current.cloud;
        lat.textContent = result.location.lat;
        lon.textContent = result.location.lon;
        condImg.src = result.current.condition.icon;
        condition.textContent = `${result.location.name} is currently ${result.current.condition.text} weather`;

        if (
          result.current.condition.text === "Partly cloudy" ||
          result.current.condition.text === "Cloudy" ||
          result.current.condition.text === "Overcast" ||
          result.current.condition.text === "Mist"
        ) {
          condVid.src = "clouds.mp4";
        } else if (
          result.current.condition.text === "Patchy rain possible" ||
          result.current.condition.text ===
            "Patchy freezing drizzle possible" ||
          result.current.condition.text === "Patchy light drizzle" ||
          result.current.condition.text === "Freezing drizzle" ||
          result.current.condition.text === "Heavy freezing drizzle" ||
          result.current.condition.text === "Patchy light rain" ||
          result.current.condition.text === "Light rain" ||
          result.current.condition.text === "Light drizzle"
        ) {
          condVid.src = "Rain.mp4";
        } else if (
          result.current.condition.text === "Light sleet" ||
          result.current.condition.text === "Patchy light snow" ||
          result.current.condition.text === "Light snow" ||
          result.current.condition.text === "Moderate snow" ||
          result.current.condition.text === "Blizzard" ||
          result.current.condition.text === "Blowing snow" ||
          result.current.condition.text === "Patchy heavy snow" ||
          result.current.condition.text === "Heavy snow" ||
          result.current.condition.text === "Ice pellets" ||
          result.current.condition.text === "Light sleet showers" ||
          result.current.condition.text === "Light showers of ice pellets" ||
          result.current.condition.text === "Moderate or heavy snow showers" ||
          result.current.condition.text === "Moderate or heavy sleet showers" ||
          result.current.condition.text ===
            "Moderate or heavy showers of ice pellets" ||
          result.current.condition.text === "Patchy light snow with thunder" ||
          result.current.condition.text ===
            "Moderate or heavy snow with thunder" ||
          result.current.condition.text === "Patchy moderate snow"
        ) {
          condVid.src = "snow.mp4";
        } else if (
          result.current.condition.text === "Patchy light rain with thunder" ||
          result.current.condition.text === "Thundery outbreaks possible" ||
          result.current.condition.text ===
            "Moderate or heavy rain with thunder"
        ) {
          condVid.src = "thunder.mp4";
        } else if (
          result.current.condition.text === "Moderate rain at times" ||
          result.current.condition.text === "Moderate rain" ||
          result.current.condition.text === "Heavy rain at times" ||
          result.current.condition.text === "Light rain shower" ||
          result.current.condition.text === "Moderate or heavy rain shower" ||
          result.current.condition.text === "Torrential rain shower" ||
          result.current.condition.text === "Heavy rain" ||
          result.current.condition.text === "Light freezing rain" ||
          result.current.condition.text === "Moderate or heavy freezing rain"
        ) {
          condVid.src = "Raining.mp4";
        } else if (
          result.current.condition.text === "Fog" ||
          result.current.condition.text === "Freezing fog"
        ) {
          condVid.src = "fog.mp4";
        } else {
          condVid.src = "Sun.mp4";
        }
      })
      .catch((error) => console.log("error", error));
    // console.log(searchInput)
    search.value = "";
  });
}

loadingPage();
dataProccessing()

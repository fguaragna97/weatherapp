// Make the page load
window.addEventListener("load", () => {
  // define variables
  let longitude;
  let latitude;
  // if the user allow the geo location then
  if (navigator.geolocation) {
    function success(pos) {
      coordinates = pos.coords;
      longitude = coordinates.longitude;
      latitude = coordinates.latitude;

      // Api call OpenWeathermap
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09907f7848d7e14ba1a36ebd01699e57&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          // show wrapper and hide loading
          const wrapper = document.getElementById("wrapper");
          wrapper.style.display = "block";
          const loading = document.getElementById("loading");
          loading.style.display = "none";
          // get elements and replace the value with the api value
          const temp = document.getElementById("temp");
          temp.textContent = Math.floor(data.main.temp);

          const city = document.getElementById("city");
          city.textContent = data.name;

          const icon = document.getElementById("icon");
          icon.innerHTML = `<img src=\"http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;

          const description = document.getElementById("description");
          description.textContent = data.weather[0].description;
        });
    }

    navigator.geolocation.getCurrentPosition(success);
  }
  // if the user declines the geo location
  else {
  }
});

// We need to return a promise to use async function so we create a function
function getCurrentPosition() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        const {
          coords: { longitude, latitude },
        } = pos;
        resolve({ longitude, latitude });
      });
    } else {
      reject(new Error("Geolocatization is not available on this device"));
    }
  });
}

// Fectch return a promise
async function getData(latitude, longitude, units = "metric") {
  const APIKEY = "09907f7848d7e14ba1a36ebd01699e57";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=${units}`
  );
  return await response.json();
}

// Make the page load and make the function an async function that recieves promises
window.addEventListener("load", async () => {
  try {
    const { longitude, latitude } = await getCurrentPosition(); // we make the destructive method to create longitude and latitude and we await the function current position and save in the variables
    const data = await getData(latitude, longitude); // we created a variable data and an await from get data

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
  } catch (error) {
    console.error(error);
  }
});

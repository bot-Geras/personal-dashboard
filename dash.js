fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something is wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src="${data.image.small}" alt="">
            <span>${data.name}</span>
        `;

    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  });

function addTime() {
  const time = new Date();
  document.getElementById("time").textContent = time.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(addTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position.coords.latitude)
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("weather data not found");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      const iconUrl = ` http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      // console.log(iconUrl);
      document.getElementById("weather").innerHTML = `
                <img src="${iconUrl}">
                <p class="weather-temp">${Math.round(data.main.temp)}</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});

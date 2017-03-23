let showSpilter = false;

const getBackground = function() {
  fetch('https://moe.kiteorg.com/json?key=1f78d085c57d6550bdb5eff53011ed5d6c726732')
  .then(response => response.json())
  .then(data => {
    document.body.style.cssText = `background-image: url(${data.url})`;
  });
};

const getHitokoto = function() {
  fetch('http://api.hitokoto.us/rand?charset=utf-8')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.querySelector('.word').innerHTML = `${data.hitokoto}`;
  });
};

const leftPad = function(item) {
  if (item.toString) item = item.toString();
  return item.length < 2 ? `0${item}` : item;
};

const getTime = function() {
  showSpilter = !showSpilter;
  const date = new Date(Date.now());
  document.querySelector('.time').innerHTML = `${leftPad(date.getHours())} ${showSpilter ? ':' : '&nbsp;'} ${leftPad(date.getMinutes())}`;
};

const getLocation = function() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => resolve(pos));
  });
}

const getWeather = function() {
  getLocation()
  .then(pos => fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22(%20${pos.coords.latitude}%2C${pos.coords.longitude}%20)%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`))
  .then(response => response.json())
  .then(data => {
    // document.querySelector('.temperature')
  });
};



getBackground();
getHitokoto();
setInterval(getTime, 500);
getWeather();

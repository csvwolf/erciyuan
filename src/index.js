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

getBackground();
getHitokoto();
setInterval(getTime, 500);

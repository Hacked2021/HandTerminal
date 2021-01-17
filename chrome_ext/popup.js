let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function() { 
  chrome.tabs.create({url : "handmodule/dist/index.html"}); 
  changeColor.cancel();
}
  
var str = false;
var context;
var bufferLoader;
var source1;

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function () {
    loader.context.decodeAudioData(
      request.response,
      function (buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      }
    );
  }
  request.onerror = function () {
    alert('BufferLoader: XHR error');
  }
  request.send();
}

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
}

window.onload = function () {

  document.getElementById("justin").onclick = function () {
    source1.stop()
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
};

document.addEventListener('keydown', (event) => {
  (event.keyCode == 77 && str == false) ? str = true : str = false;
  str ? init() : source1.stop();
});

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(context,["../sounds/mariquita-mariquita.mp3"],finishedLoading);
  bufferLoader.load();
}
 
function finishedLoading(bufferList) {
  source1 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source1.connect(context.destination);
  source1.start(0);
}

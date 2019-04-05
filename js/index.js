window.onload = function() {
  var mainAudio = new Audio("../sounds/mariquita-mariquita-canciones-infantiles-littlebabybum-[AudioTrimmer.com].mp3")
  var audioplay = mainAudio.play()
  if (audioplay !== undefined) {
    audioplay.then(function() {
    console.log('adios')
    }).catch(function(error) {
    });
  }
  
  document.getElementById("justin").onclick = function() {
      mainAudio.pause()
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
 };
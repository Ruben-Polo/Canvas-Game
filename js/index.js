window.onload = function() {
  var mainAudio = new Audio("https://res.cloudinary.com/polo/video/upload/v1559054514/audio-intro_zmmroq.mp3")
  console.log(mainAudio)
  var audioplay = mainAudio.play()
  if (audioplay !== undefined) {
    audioplay.then(function() {
    }).catch(function(error) {
    });
  }
  
  document.getElementById("justin").onclick = function() {
      mainAudio.pause()
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
 };

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
 };
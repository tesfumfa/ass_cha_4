// console.log("hello world");

// Gets the score stored in local storage
var storedScoreArray = JSON.parse(localStorage.getItem("userScores"));

// Targets the ul to populate the scores list under
var highScores = document.getElementById("scores");
var clearHighScores = document.getElementById("clear-history");
var returnMain = document.getElementById("restart-quiz");
// when the page loads, the renderScore function  is executed
window.onload = function renderScores() {
  for (var i = 0; i < storedScoreArray.length; i++) {
    var scoreList = document.createElement("li");
    scoreList.setAttribute("class", "list-group-item list-group-item-primary");
    scoreList.textContent =
      i +
      1 +
      "." +
      " " +
      storedScoreArray[i].name +
      " - " +
      storedScoreArray[i].score;
    highScores.appendChild(scoreList);
  }
};
// Clears the highscores and removes from local storage.
clearHighScores.addEventListener("click", function (event) {
  event.preventDefault();
  window.localStorage.clear();
  while (highScores.firstChild) {
    highScores.removeChild(highScores.firstChild);
  }
});
// Allows the user to return to the quiz homepage
returnMain.addEventListener("click", function(){
  window.location.href = "index.html";
})
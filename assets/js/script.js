// console.log("hello world");
console.log(window);

// DOM variables defined
var timerDisplay = document.getElementById("timer");
var mainPage = document.getElementById("main-quiz-start");
var startButton = document.getElementById("start-quiz");
var headingQuestion = document.getElementById("heading");
var answerChoices = document.getElementById("answers");
var feedbackContainer = document.getElementById("answer-feedback");
var scorePage = document.getElementById("score-page");
var submitScoreButton = document.getElementById("submit-scores");
var inputScore = document.getElementById("input-form");

var timeLeft = 75;
var interval;
var questionIndex = 0;

// Variable that will have user feedback on whether the answer was correct or wrong
var answerFeedback;

// Variable to hold the user's score during the quiz
var finalScore;

// Array of objects with all of the questions, answer choices, and the correct answer for each question
var questionBank = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within _____.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. square brackets",
    ],
    answer: "3. parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    answer: "3. quotes",
  },
  {
    question:
      "A very useful  tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
];

var scoreArray = [];

function startQuiz() {
  // sets the display of the instruction page to none, hiding it from the user
  mainPage.style.display = "none";
  // renders the question
  renderQuestions(questionIndex);
}
function startTimer() {
  // Displays the timer
  timerDisplay.textContent = "Time: " + timeLeft;
  interval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;
    finalScore = timeLeft;
    if (timeLeft === 0) {
      clearInterval(interval);
      finalScore = 0;
      renderScoreScreen();
    }
  }, 1000);
}
// Displays the questions and answers for the quiz
function renderQuestions(index) {
  if (index === questionBank.length) {
    clearInterval(interval);
    renderScoreScreen();
  } else {
    answerChoices.innerHTML = "";
    headingQuestion.textContent = questionBank[index].question;
    // loops through all of the answer options in the choices array
    for (var i = 0; i < questionBank[index].choices.length; i++) {
      // Creates the answer button element
      var answerButtons = document.createElement("button");
      // Sets the text of the button to the first answer choice in the array
      answerButtons.textContent = questionBank[index].choices[i];
      answerButtons.setAttribute("class", "btn btn-primary rounded");
      answerButtons.setAttribute("data-index", i);
      answerChoices.appendChild(answerButtons);
    }
  }
}
function checkAnswer(event) {
  // Checks to see if the answer button clicked is equal to the correct answer for the question
  var answerIndex = event.target.getAttribute("data-index");
  event.preventDefault();
  if (
    event.target.matches("button") &&
    questionBank[questionIndex].choices[answerIndex] ===
      questionBank[questionIndex].answer
  ) {
    // If the answer is correct, the question index is incremented and the next question is displayed
    answerFeedback = "Correct!";
    questionIndex++;
    renderQuestions(questionIndex);
  } else {
    // If the answer is incorrect, 10 seconds are subtracted from the time, the question index is incremented and the next question is displayed
    answerFeedback = "Wrong!";
    timeLeft -= 10;
    questionIndex++;
    renderQuestions(questionIndex);
  }
}

// displays the score screen content after the game ends (either the user's time is up or they answer all questions).
function renderScoreScreen() {
  var quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";
  // shows the score-page content
  scorePage.style.visibility = "visible";
  inputScore.style.visibility = "visible";
  // gets the id of the paragraph element and outputs the user's score
  var scoreMessage = document.getElementById("score");
  scoreMessage.textContent = "Your final score is: " + finalScore;
}
// function to display either correct or wrong feedback to the user based on their answer choice
function displayFeedback(container) {
  var feedBack = document.createElement("div");
  feedBack.setAttribute("class", "feedback mt-3 pt-3");
  feedBack.setAttribute("id", "answer-feedback");
  feedBack.textContent = answerFeedback;
  container.appendChild(feedBack);
}


// Function to check whether the answer was correct or wrong
function answerStatus() {
  if (answerFeedback === "Correct!") {
    if (questionIndex === questionBank.length) {
      displayFeedback(feedbackContainer);
    }
    // displays the "Correct!" feedback message to the answerChoices container if the question is correct
    displayFeedback(answerChoices);
    feedbackTimer();
    console.log("Correct!");
  } else {
    if (questionIndex === questionBank.length) {
      displayFeedback(feedbackContainer);
    }
    // displays the "Wrong!" feedback message to the answerChoices container if the question is correct
    displayFeedback(answerChoices);
    console.log("Wrong!");
    console.log("Wrong!");
    feedbackTimer();
  }
}

// Timer removes the feedback information of correct or wrong after 1 second
function feedbackTimer() {
  var time = 1;
  var interval = setInterval(function () {
    time--;
    if (time === 0) {
      console.log("times up");
      var feedbackContent = document.getElementById("answer-feedback");
      feedbackContent.parentNode.removeChild(feedbackContent);
      clearInterval(interval);
    }
  }, 800);
}

// saves the user scores to an object in localStorage
function saveScores() {
  var initials = document.getElementById("initials").value;
  var storedScoreArray = JSON.parse(localStorage.getItem("userScores"));
  if (storedScoreArray !== null) {
    scoreArray = storedScoreArray;
  }
  scoreArray.push({ name: initials, score: finalScore });
  localStorage.setItem("userScores", JSON.stringify(scoreArray));
  console.log(scoreArray);
}

startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);
answerChoices.addEventListener("click", checkAnswer);
answerChoices.addEventListener("click", answerStatus);
submitScoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  saveScores();
  window.location.href = "highscores.html";
});
// Selecting timer element by class
var body = document.body;
var timerEl = document.querySelector(".timer");
var timerScoreContainer = document.querySelector(".score-timer-container");
var startContainer = document.getElementById("start-quiz-container");
var startButton = document.querySelector(".start-quiz");
var questionContainer = document.querySelector("#question-container");
var questionsElement = document.querySelector(".questions");
var answersElement = document.querySelector(".answers");
var feedbackElement = document.querySelector(".feedback");
var initialsContainer = document.getElementById("score-initial");
var finalScore = document.querySelector(".final-score");
var initialsElement = document.querySelector(".initials");
var highScoresButton = document.querySelector(".high-scores-btn");
var highScoresSection = document.getElementById("high-scores");
var savedScoresList = document.querySelector(".initial-high-score")
var submit = document.querySelector(".submit");
var isHighScores = false;
var secondsLeft = 31;
var score = 0;
var index = 0;
var listOfScoreHistory = [];
var inputValue = "";


// Declares an array of questions and answers
var questions = [
    { question: "Commonly used data types DO NOT include:", 
      answers: ["Strings", "Booleans", "Alerts", "Numbers"], 
      answer: "Alerts"},
    { question: "What language is used to style?",
      answers: ["JavaScript", "Python", "HTML", "CSS"], 
      answer: "CSS"},
    { question: "What does the acronym DOM stand for?",
      answers: ["Document Object Model", "Document Original Model", "Document Option Model", "Docuemnt Object Mode"], 
      answer: "Document Object Model"},
];

// Load existing high scores from local storage
var storedScores = localStorage.getItem("listOfScoreHistory");
if (storedScores) {
    listOfScoreHistory = JSON.parse(storedScores);
}


// Hides the feedback at page load
feedbackElement.setAttribute("style", "display: none;");

// Declares function that starts the quiz
function startQuiz() {
    isHighScores = false;
    // Hides the starting section with the button that starts the quiz
    startContainer.setAttribute("style", "display: none;");
    // Calls function to set the timer
    setTimer();
    
        // Calls function that renders the question
        renderQuestion();
        // Calls function that renders the answers
        renderAnswers();
}; 

function renderHighScore(){
    debugger;
    savedScoresList.innerHTML = "";

    for (var i = 0; i < listOfScoreHistory.length; i++) {
        var savedHighScore = localStorage.getItem("score");
        var renderedHighScore = listOfScoreHistory[i] + " - " + savedHighScore;
        var p = document.createElement("p");
        p.classList.add("logged-score");
        p.innerHTML = renderedHighScore;
        p.setAttribute("data-index", i);
        savedScoresList.appendChild(p);
    };
};

    function storeScores() {
    localStorage.setItem("listOfScoreHistory", JSON.stringify(listOfScoreHistory));
}

submit.addEventListener("click", function(){
    inputValue = document.querySelector('input').value;
    if(inputValue == ""){
        return;
    }
    listOfScoreHistory.push(inputValue);
    inputValue = "";
    // call function that stores 
    storeScores();
    // saveScore();
    renderHighScore();
    initialsContainer.setAttribute("style", "display: none");
    highScoresSection.setAttribute("style", "display: block");

});



highScoresButton.addEventListener("click", function(){
    isHighScores = true;
    clearInterval(highScoresButton);
    timerScoreContainer.setAttribute("style", "display: none");
    questionContainer.setAttribute("style", "display: none");
    startContainer.setAttribute("style", "display: none");
    initialsContainer.setAttribute("style", "display:none");
    highScoresSection.setAttribute("style", "display: block");

})

// Declares a function that renders the answers
function renderAnswers() {
    // Clears the content inside the answer element when new questions are generated
    answersElement.innerHTML = "";
    for (var i = 0; i < questions[index].answers.length; i++) {
        var renderedAnswer = document.createElement("li");
        renderedAnswer.textContent = questions[index].answers[i];
        answersElement.appendChild(renderedAnswer);
    };
};

function isQuizOver(){
    if(index == questions.length){
        endQuiz();
    }
}

function saveScore(){
    var initials = initialsElement.value.trim();
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
}


function endQuiz(){
    questionContainer.setAttribute("style", "display: none");
    initialsContainer.setAttribute("style", "display: block");
    finalScore.textContent = "Your final score is " + score + "!";
    saveScore();
}



// Declares a function that renders the questions
function renderQuestion() {
    feedbackElement.setAttribute("style", "display: none;");
    questionsElement.innerHTML = "";
        var renderedQuestion = document.createElement("h2");
        renderedQuestion.textContent = questions[index].question;
        questionsElement.appendChild(renderedQuestion);
};

function decrementTime() {
    if (secondsLeft < 10){
        endQuiz();
    }else {
    secondsLeft = secondsLeft - 10;
    };
};


//Adds event listener to answers parent element 
answersElement.addEventListener("click", function(event){
    // If statement makes sure if the parent container is clicked, nothing happens to ensure user clicks an answer option only
    if (event.target.textContent === answersElement.textContent){
        return;
    }
    // Checks if user selected wrong answer
    if (event.target.textContent !== questions[index].answer){ 
        console.log("Wrong"); 
        feedbackElement.setAttribute("style", "display: true;");
        feedbackElement.textContent = "Wrong!";
        decrementTime();
    // This code only runs if the correct answer is clicked
    } else {
    console.log("Correct");
    // Makes feedback element visible
    feedbackElement.setAttribute("style", "display: true;");
    feedbackElement.textContent = "Correct!";
    score = score + 10;
    }
    index ++;
    if(index !== questions.length){
        setTimeout(() => {
            renderQuestion();
            renderAnswers();
      }, 1000);
    };
});

// Declares function that sets timer
function setTimer() {
    // Declares variable for timer interval with a value of a setInterval function that makes the time countdown and displays the current time with textContent
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        
        // If statement checks if timer is at 0 to run the function that stops the timer at 0;
        if(secondsLeft === 0 || index == questions.length || isHighScores == true) {
        // Stops the timer at 0 when if conditional is true
            clearInterval(timerInterval);
            isQuizOver();
        }
    }, 1000);
};

// declares function that adds 20 points to score
function correct() {
    score + 20;
};

// Adds event listener to wait for the button to be clicked to call the setTimer function to begin countdown
startButton.addEventListener("click", function() {
    startQuiz();
});

  
  


  

  
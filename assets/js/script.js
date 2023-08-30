// Selecting timer element by class
var timerEl = document.querySelector(".timer");
var startContainer = document.getElementById("start-quiz-container");
var startButton = document.querySelector(".start-quiz");
var questionContainer = document.querySelector("#question-container");
var questionsElement = document.querySelector(".questions");
var answersElement = document.querySelector(".answers");
var secondsLeft = 76;
var score = 0;
var index = 0;

// Declares an array of questions and answers
var questions = [
    { question: "Commonly used data types DO NOT include:", 
      answers: ["Strings", "Booleans", "Alerts", "Numbers"], 
      answer: 2},
    { question: "What language is used to style?",
      answers: ["JavaScript", "Python", "HTML", "CSS"], 
      answer: 3},
    { question: "What does the acronym DOM stand for?",
      answers: ["Document Object Model", "Document Original Model", "Document Option Model", "Docuemnt Object Mode"], 
      answer: 0},
];

// Navigates through questions
function navigate(direction) {
    index = index + direction;
    if (index < 0) { 
      index = questions.length - 1; 
    } else if (index > questions.length - 1) { 
      index = 0;
    }
    questionsElement = questions[index];
}
  


// declares function that starts the quiz
function startQuiz() {
    // Hides the starting section with the button that starts the quiz
    startContainer.setAttribute("style", "display: none;");
    // Calls function to set the timer
    setTimer();
    
        // Calls function that renders the question
        renderQuestion();
        // Calls function that renders the answers
        renderAnswers();

}  

// Declares a function that renders the questions
function renderQuestion() {
    questionsElement.textContent = questions[index].question;
}


// Declares a function that renders the answers
function renderAnswers() {
    answersElement.innerHTML = "";
    for (var i = 0; i < questions[index].answers.length; i++) {
        var renderedAnswer = document.createElement("li");
        renderedAnswer.textContent = questions[index].answers[i];
        answersElement.appendChild(renderedAnswer);
    }

    answersElement.addEventListener("click", function(){
        if (answer = 2){
            console.log("Correct!");
        } else {
            console.log("Wrong!");
        }
    });
};

// Declares function that sets timer
function setTimer() {
    // Declares variable for timer interval with a value of a setInterval function that makes the time countdown and displays the current time with textContent
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        

        // If statement checks if timer is at 0 to run the function that stops the timer at 0;
        if(secondsLeft === 0) {
        // Stops the timer at 0 when if conditional is true
            clearInterval(timerInterval);
        }
    }, 1000);
}

// declares function that adds 20 points to score
function correct() {
    score + 20;
}


// Adds event listener to wait for the button to be clicked to call the setTimer function to begin countdown
startButton.addEventListener("click", function(event) {
    startQuiz();
    navigate(1);
});

  
  


  

  
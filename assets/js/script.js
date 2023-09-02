// Selecting timer element by class
var body = document.body;
var timerEl = document.querySelector(".timer");
var startContainer = document.getElementById("start-quiz-container");
var startButton = document.querySelector(".start-quiz");
var questionContainer = document.querySelector("#question-container");
var questionsElement = document.querySelector(".questions");
var answersElement = document.querySelector(".answers");
var feedbackElement = document.querySelector(".feedback");
var initialsContainer = document.getElementById("score-initial");
var finalScore = document.querySelector(".final-score");
var secondsLeft = 76;
var score = 0;
var index = 0;


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


// Hides the feedback at page load
feedbackElement.setAttribute("style", "display: none;");

// Declares function that starts the quiz
function startQuiz() {
    // Hides the starting section with the button that starts the quiz
    startContainer.setAttribute("style", "display: none;");
    // Calls function to set the timer
    setTimer();
    
        // Calls function that renders the question
        renderQuestion();
        // Calls function that renders the answers
        renderAnswers();
}; 

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

function endQuiz(){
    questionContainer.setAttribute("style", "display: none");
    initialsContainer.setAttribute("style", "display: block");
    finalScore.textContent = "Your final score is " + score + "!";
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
        debugger;
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
        if(secondsLeft === 0 || index == questions.length) {
        // Stops the timer at 0 when if conditional is true
            clearInterval(timerInterval);
            endQuiz();
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

  
  


  

  
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
var savedScoresList = document.querySelector(".initial-high-score");
var clearScoresButton = document.querySelector(".clear-scores");
var tryAgainButton = document.querySelector(".try-again");
var submit = document.querySelector(".submit");
var isNewQuiz = false;
var p;
var isHighScores = false;
var secondsLeft = 31;
var score = 0;
var index = 0;
var listOfNameHistory = [];
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

// Hides the feedback at page load so top border doesn't show
feedbackElement.setAttribute("style", "display: none;");

// Declares function that starts the quiz
function startQuiz() {
    isHighScores = false;
    if(isNewQuiz == true){
        questionContainer.setAttribute("style", "display: block");
    }
    highScoresSection.setAttribute("style", "display: none;");
    // Hides the starting section with the button that starts the quiz
    startContainer.setAttribute("style", "display: none;");
    // Calls function to set the timer
    setTimer();
    
        // Calls function that renders the question
        renderQuestion();
        // Calls function that renders the answers
        renderAnswers();
}; 

// Adds event listener with function to clear scores and stored arrays
clearScoresButton.addEventListener("click", function() {
    savedScoresList.innerHTML = "";
    localStorage.clear();
    listOfNameHistory = [];
    listOfScoreHistory = [];
});

// Resets values to restart quiz
function resetQuiz(){
    secondsLeft = 31;
    score = 0;
    index = 0;
    isNewQuiz = true;
    timerScoreContainer.setAttribute("style", "display: flex");
}

// Adds event listener to restart quiz
tryAgainButton.addEventListener("click", function() {
    resetQuiz();
    startQuiz();
})

// Displays High Scores to the page
function renderHighScore(){
    savedScoresList.innerHTML = "";

    for (var i = 0; i < listOfNameHistory.length; i++) {
        var savedHighScore = listOfScoreHistory[i];
        var renderedHighScore = listOfNameHistory[i] + " - " + savedHighScore;
        p = document.createElement("p");
        p.classList.add("logged-score");
        p.innerHTML = renderedHighScore;
        p.setAttribute("data-index", i);
        savedScoresList.appendChild(p);
    };
};

// Stores scores and names to local storage
function storeScores() {
    localStorage.setItem("listOfNameHistory", JSON.stringify(listOfNameHistory));
    localStorage.setItem("listOfScoreHistory", JSON.stringify(listOfScoreHistory));
}

// Adds functions to submit button 
submit.addEventListener("click", function(){
    saveAndRenderScores();
});

// Adds function to display high scores page when view high scores button is clicked
highScoresButton.addEventListener("click", function(){
    isHighScores = true;
    clearInterval(highScoresButton);
    timerScoreContainer.setAttribute("style", "display: none");
    questionContainer.setAttribute("style", "display: none");
    startContainer.setAttribute("style", "display: none");
    initialsContainer.setAttribute("style", "display:none");
    highScoresSection.setAttribute("style", "display: block");

});

// Declares a function that renders the answers
function renderAnswers() {
    // Clears the content inside the answer element when new questions are generated
    answersElement.innerHTML = "";
    // creates li elements to display high scores on the page
    for (var i = 0; i < questions[index].answers.length; i++) {
        var renderedAnswer = document.createElement("li");
        renderedAnswer.textContent = questions[index].answers[i];
        answersElement.appendChild(renderedAnswer);
    };
};

// Function checks if the quiz is over by comparing the index value to the questions array length, or, if time runs out
function isQuizOver(){
    if(index == questions.length || secondsLeft === 0){
        endQuiz();
    };
};

// This function ends the quiz by hiding the questions container and displaying the final page
function endQuiz(){
    questionContainer.setAttribute("style", "display: none");
    initialsContainer.setAttribute("style", "display: block");
    finalScore.textContent = "Your final score is " + score + "!";
    listOfScoreHistory.push(score);
    initialsElement.value = "";

}

// Declares a function that renders the questions
function renderQuestion() {
    feedbackElement.setAttribute("style", "display: none;");
    questionsElement.innerHTML = "";
        var renderedQuestion = document.createElement("h2");
        // Sets the rendered question id to the index value
        renderedQuestion.id = index; 
        renderedQuestion.textContent = questions[index].question;
        questionsElement.appendChild(renderedQuestion);
};

// Function first checks if the time is less than 10 seconds to check if quiz is over and eventually ends the quiz, else, penalizes 10 seconds to the time
function decrementTime() {
    if (secondsLeft < 10){
        isQuizOver();
    }else {
        secondsLeft = secondsLeft - 10;
    };
};

//Adds event listener to answers parent element 
answersElement.addEventListener("click", function(event){
    // Navigates through the DOM to get to the question element and extract it’s id
    var currentDisplayed = event.target.parentElement.parentElement.children[0].children[0].id
    // If index and the current displayed question id match, run code that accepts answer. This prevents the user from clicking an answer between questions being switched during the setTimeout delay
    if (index == currentDisplayed) {
    // If statement makes sure if the parent container is clicked, nothing happens to ensure user clicks an answer option only
        if (event.target.textContent === answersElement.textContent){
            return;
        }
        // Checks if user selected wrong answer
        if (event.target.textContent !== questions[index].answer){ 
            event.preventDefault();
            console.log("Wrong"); 
            feedbackElement.setAttribute("style", "display: true;");
            feedbackElement.textContent = "Wrong!";
            decrementTime();
        // This code only runs if the correct answer is clicked
        } else {
            event.preventDefault();
        console.log("Correct");
        // Makes feedback element visible
        feedbackElement.setAttribute("style", "display: true;");
        feedbackElement.textContent = "Correct!";
        score = score + 10;
        }
        index ++;
        // if statement checks if index value is not equal to length of questions to display the next question, other wise function ends and no new question is rendered
        if(index !== questions.length){
            // setTimeout adds a delay before the next question is rendered so the feedback text is able to be read before page updating
            setTimeout(() => {
                isClickAllowed = false;
                renderQuestion();
                renderAnswers();
            }, 1000);
        };
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

// Declares function that adds 20 points to score
function correct() {
    score + 20;
};

// Adds event listener to the Start Quiz button to call the startQuiz function 
startButton.addEventListener("click", function() {
    startQuiz();
});  

// On key down the function is referenced and assigned
initialsElement.onkeydown = checkForEnter;

// Function that checks if the enter button was pressed, if true, the saveAndRenderScores function runs
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveAndRenderScores();
    };
};

// Saves and renders scores by pushing the inputValue to the list of names history
function saveAndRenderScores(){
    inputValue = document.querySelector('input').value;
    // If user doesn't enter anything in the input box don't do anything
    if(inputValue == ""){
        return;
    }
    listOfNameHistory.push(inputValue);
    inputValue = "";
    // call function that stores 
    storeScores();
    renderHighScore();
    initialsContainer.setAttribute("style", "display: none");
    highScoresSection.setAttribute("style", "display: block");
};

// This function is being called when the page loads
function init() {
    // Gets local storage data and parsing it (turning it back to an object)
    var storedHistoryN = JSON.parse(localStorage.getItem("listOfNameHistory"));
    var storedHistoryS = JSON.parse(localStorage.getItem("listOfScoreHistory"));
  
    // If the data is not null, meaning there is data in local storage, then set the listOfNameHistory and listOfScoreHistory variables equal to the local storage data
    if (storedHistoryN !== null && storedHistoryS !== null) {
      listOfNameHistory = storedHistoryN;
      listOfScoreHistory = storedHistoryS;
    }
    // Calls the renderHighScore function
    renderHighScore();
  }

  init();
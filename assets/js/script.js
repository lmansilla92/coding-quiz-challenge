// Selecting timer element by class
var timerEl = document.querySelector(".timer");
var secondsLeft = 76;
var startContainer = document.getElementById("start-quiz-container");
var startButton = document.querySelector(".start-quiz");
var questionContainer = document.getElementById("question-container");
var score = 0;
var correctAnswer = document.getElementsByClassName(".correct");

// Hides question section
questionContainer.setAttribute("style", "display: none")

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

// declares function that starts the quiz
function startQuiz() {
    startContainer.setAttribute("style", "display: none;");
    setTimer();

    if(startContainer){
        questionContainer.setAttribute("style", "display: flex;");
    }  

    correctAnswer.addEventListener("click", correct);
}

// declares function that adds 20 points to score
function correct() {
    score + 20;
}


// Adds event listener to wait for the button to be clicked to call the setTimer function to begin countdown
startButton.addEventListener("click", startQuiz);

// adds event listener to the correct answer
// correctAnswer.addEventListener("click", correct);


    // TODO: 
    // If user answers correctly
    // add 20 points to score (make score var)
    // tool tip shows up that says Correct!
    // If user answers incorrectly
    // Subtract 20 seconds from timer
    // tool tip shows up that says Wrong!
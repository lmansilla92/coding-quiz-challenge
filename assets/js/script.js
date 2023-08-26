// Selecting timer element by class
var timerEl = document.querySelector(".timer");
var secondsLeft = 75;
var startContainer = document.getElementById("#start-quiz-container");
var startButton = document.querySelector(".start-quiz");


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
    }  



// function that hides the main page


// Adds event listener to wait for the button to be clicked to call the setTimer function to begin countdown
startButton.addEventListener("click", startQuiz);



# Coding Quiz

## Repository

In this repository you will find the application code to a coding quiz. The purpose of this application is to test your knowledge in coding with a timed quiz that gives you 20 points per correct answer, and deducts 10 seconds from the timer for every wrong answer. This coding quiz is functioning with JavaScript by traversing through the DOM to add user interaction that makes the exeprience dynamic. The basic funtionality for this application is as follows:

- The main page is displayed explaining the rules of the quiz. 
- When the user clicks the Start Quiz button, the timer is set, and questions are pulled form an array, as well as elements are created to display the content inside an array of answer choices based on the question in the current index. 
- If the user chooses a correct answer, 20 points will be awarded. If an incorrect answer is chosen, 10 seconds are deducted from the time.
- When the quiz is over, a page is visible that shows the user's final score, and allows the user to enter their initials to log their score.
- After the initials are logged, a High Scores page displays all the current high scores along with the newly submitted score.
- At this point, the high scores can be cleared from local storage, or the user has an option to restart the quiz and try again.

While writing this code, I found myself checking the dev tools to make sure every new feature was functioning property. I ran into a lot of errors that caused me to refactor my code a bit and make it more efficient. A lot of the errors were caused by my own changes but it helped me dive deep into the functionality to truly understand what was happening. My biggest hurdle was fixing a bug that was happening during the setTimeout delay that allows the feedback to be displayed for a couple of seconds before the next question and answers were rendered. The issue was that during this delay, the user was able to continue clicking on the answer choices and causing errors and the quiz to end prematurely. A Learning Assistant named Alex helped me overcome this issue by suggesting I add an id with the index value so that when the event listener that has the setTimeout function is ran, the index of the question does not match the current index during the event listener, which basically does not allow the user to click multiple times on answers during the delay, which was causing the quiz to end prematurely and sending errors in the console.

## Table of Contents

- [Contribute](#contribute)
- [Appearance](#appearance)
- [Changes](#changes)
- [Features](#features)
- [Credits](#credits)
- [License](#license)

## Contribute

To view the repository of this password generator and contribute to this application click the following link:  [Coding Quiz Challenge](https://github.com/lmansilla92/coding-quiz-challenge)

If you need help on how to clone a GitHub repository into your local repository, visit the following GitHub link: [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) 

## Appearance

Start Quiz Page:
    ![Start Quiz](assets/images/start-quiz.png)

Questions and Answers rendered:
    ![Question Render](assets/images/question-render.png)

Feedback displays when a correct/incorrect answer is chosen:
    ![Feedback](assets/images/feedback-render.png)

When quiz is over, the final score is displayed:
    ![Quiz End](assets/images/quiz-end.png)

After user inputs initials, the locally stored past high scores are displayed along with the most recent one logged:
    ![High Scores](assets/images/high-score-render.png)

To view the deployed webpage click the following link: [Deployed Webpage](https://lmansilla92.github.io/coding-quiz-challenge)

## Changes

I would like to make the following changes to add features to this coding quiz:

- Using colors to represent the different feedbacks that can be rendered
- Adding a feature that mixes up the answer choices everytime the quiz is restarted
- Add a feature when the wrong answer is chose, the correct answer is highlighted in green during the setTimeout delay


## Features

Some of the features in this application include:

- Set Timeout delay that allows the feedback of "Wrong" and "Correct" to display on the page for a couple of seconds before the next question is rendered
- Create an element method is used to dyanmically render the new answers upon each new question display
- Use of Local Storage is used to store scores and have them persist on the page even after the page is refreshed.

## Credits

askBCS was FUNDAMENTAL in helping me get through this challenge! It was the first application I had to really rely on this to help me understand why I was getting errors. 

## License

Link to [The MIT License (MIT)](https://github.com/lmansilla92/coding-quiz-challenge/blob/main/LICENSE)
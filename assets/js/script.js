// initial declarations
var headerEl = document.querySelector(".header");
var highscoreLinkEl = document.querySelector(".highscore-link");
var headerTimerEl = document.querySelector(".timer");
var initialMsg = document.querySelector(".initial-msg")


//header
//highscoreLinkEl.addEventListener('click', viewScore);
headerEl.appendChild(highscoreLinkEl);
headerEl.appendChild(headerTimerEl);


//main content



function mainScreen() {

    let initialScreen = document.createElement("h1");
    initialScreen.textContent = "Coding Quiz Challenge";

    let description = document.createElement("p");
    description.textContent = `Try to answer the following code-related questions within the time
    limit. Keep in mind that incorrect answers will penalize your score
    time by ten seconds!`;

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start Quiz";
    startBtn.type = "button";
    startBtn.name = "startBtn";
    startBtn.style.textAlign = "center";

    startBtn.onclick = timer;
    //startBtn.addEventListener("click", displayQuestions);

    initialMsg.appendChild(initialScreen);
    initialMsg.appendChild(description);
    initialMsg.appendChild(startBtn);


    // timer
    var timer = function countdown() {
        var timeLeft = 100;

        // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
        var timeInterval = setInterval(function () {
            // As long as the `timeLeft` is greater than 1
            if (timeLeft > 1) {
                // Set the `textContent` of `timerEl` to show the remaining seconds
                headerTimerEl.textContent = timeLeft + ' seconds remaining';
                // Decrement `timeLeft` by 1
                timeLeft--;
            } else if (timeLeft === 1) {
                // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
                headerTimerEl.textContent = timeLeft + ' second remaining';
                timeLeft--;
            } else {
                // Once `timeLeft` gets to 0, set `timerEl` to an empty string
                headerTimerEl.textContent = '';
                // Use `clearInterval()` to stop the timer
                clearInterval(timeInterval);
            }
        }, 1000);
    }

}

mainScreen();







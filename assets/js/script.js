let containerEl = document.querySelector("#container");
let headerEl = document.querySelector(".header");
let ScoreEl = document.querySelector(".score");
let ContentEl = document.querySelector("#content");
let initialEl = document.querySelector("#initial-screen");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
let answerEl = document.querySelector("#answer");
let resultEl = document.querySelector("#results");
let highScoreEl = document.querySelector("#highscore");
let scoreListEl = document.querySelector("#scoreList");
let timerEl = document.querySelector("#timer");
let isQuizDone = true;

const quizData = [
    {
        question: "Commonly used data types DO NOT include",
        choices: { 1: "alerts", 2: "booleans", 3: "numbers", 4: "strings" },
        answer: "1",
    },
    {
        question: "The condition in an if / else statement in enclosed with _____",
        choices: {
            1: "quotes",
            2: "curly brackets",
            3: "parentheses",
            4: "square brackets",
        },
        answer: "3",
    },
    {
        question: "Arrays is Javascript can be used to store _____",
        choices: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        },
        answer: "4",
    },
    {
        question:
            "String variables must be enclosed within _____ when being assigned to variables",
        choices: {
            1: "commas",
            2: "quotes",
            3: "curly brackets",
            4: "parentheses",
        },
        answer: "2",
    },
];

ScoreEl.addEventListener('click', viewScore);
headerEl.appendChild(ScoreEl);
headerEl.appendChild(timerEl);


let submitScore = document.createElement("button");
submitScore.textContent = "Submit";



display();

function display() {
    let initialScreen = document.createElement("h1");
    initialScreen.textContent = "Coding Quiz Challenge";

    let paraScreen = document.createElement("p");
    paraScreen.textContent = `Try to answer the following code-related questions within the time
  limit. Keep in mind that incorrect answers will penalize your score
  time by ten seconds!`;

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start Quiz";
    startBtn.type = "button";
    startBtn.name = "startBtn";
    startBtn.style.textAlign = "center";

    startBtn.addEventListener("click", startTimer);
    startBtn.addEventListener("click", displayQuestions);

    initialEl.appendChild(initialScreen);
    initialEl.appendChild(paraScreen);
    initialEl.appendChild(startBtn);
}




const lastQuestion = quizData.length - 1;
let questionsCtr = 0;
let totalTime = 100;
let score = 100;
let timer;


function startTimer() {
    timer = setInterval(() => {
        isQuizDone = false;
        totalTime -= 1;
        timerEl.innerHTML = `Time: ${totalTime}`;

        score = totalTime;
        if (totalTime <= 0) {
            isQuizDone = true;
            showScore(score);
            score = 0;
            clearInterval(timer);

        }
    }, 1000);
}


function displayQuestions() {


    const output = [];


    const choices = [];

    let question = quizData[questionsCtr];

    for (choice in question.choices) {
        choices.push(
            `<div>
          <button name="question${questionsCtr}" onclick='checkAnswer(${choice})'>${choice} ${question.choices[choice]}</button>
          <br>
          <br>
        </div>
        `
        );
    }

    output.push(
        `   <div id="questions"><h2> ${question.question} </h2></div>
        <div id="choices"> ${choices.join("")} </div>
      `
    );


    ContentEl.innerHTML = output.join("");
}


function checkAnswer(answer) {
    if (answer === parseInt(quizData[questionsCtr].answer)) {
        displayResult("CORRECT");
    } else {
        displayResult("WRONG");
        if (score <= 9) {
            isQuizDone = true;
            totalTime = 0;
            score = totalTime;
        } else {
            totalTime -= 10;
            score = totalTime;
        }

        timerEl.innerHTML = `Time: ${totalTime}`;
    }

    if (questionsCtr < lastQuestion) {
        questionsCtr++;
        displayQuestions();
    } else {
        clearTimeout(timer);
        showScore(score);
    }
}


function displayResult(ans) {

    answerEl.innerHTML = `<div><hr><p>${ans}</p></div>`;
    setInterval(() => {
        answerEl.innerHTML = "";
    }, 1000);

    containerEl.appendChild(answerEl);
}

function showScore(score) {
    isQuizDone = true;
    document.getElementById("questions").style.display = "none";
    document.getElementById("choices").style.display = "none";

    let scoreDiv = document.createElement("div");
    let scoreH1El = document.createElement("h1");
    scoreH1El.innerHTML = "All done!";

    let scoreResult = document.createElement("p");
    scoreResult.textContent = `Your final score is: ${score}`;

    let nameLabel = document.createElement("span");
    nameLabel.textContent = "Enter your NAME: ";

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "nameId");

    scoreDiv.appendChild(scoreH1El);
    scoreDiv.appendChild(scoreResult);
    scoreDiv.appendChild(nameLabel);
    scoreDiv.appendChild(nameInput);
    scoreDiv.appendChild(submitScore);
    resultEl.appendChild(scoreDiv);
    containerEl.appendChild(resultEl);
}


function saveScore() {
    let initials = document.getElementById("nameId").value;


    let existingData = localStorage.getItem("scores");

    let existing = existingData ? JSON.parse(existingData) : [];
    let newData = { score: score, name: initials };


    existing.push(newData);


    localStorage.setItem("scores", JSON.stringify(existing));

    displayScores();
}


function displayScores() {

    resultEl.style.display = "none";
    headerEl.style.display = "none";

    let scoreH1El = document.createElement("h1");
    let scoreList = document.createElement("div");
    let tempList = [];
    let tempListEl = document.createElement("div");


    let goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    goBack.className = "btn edit-btn";
    goBack.setAttribute("id", "goback");
    goBack.setAttribute("click", "goBackToHome");


    let clearScore = document.createElement("button");
    clearScore.textContent = "Clear Highscore";
    clearScore.className = "btn edit-btn";
    clearScore.setAttribute("id", "clearscore");

    scoreH1El.textContent = "Highscores";
    highScoreEl.appendChild(scoreH1El);
    scoreList.setAttribute("id", "scoreList");
    highScoreEl.appendChild(scoreList);

    let data = localStorage.getItem("scores");
    data = data ? JSON.parse(data) : [];


    data.sort((a, b) => {
        return b.score - a.score;
    });

    for (list in data) {
        tempList.push(`<div id="score">
    ${parseInt(list) + 1}. ${data[list].name} - ${data[list].score}
    </div>`);
    }


    scoreList.innerHTML = tempList.join("");
    highScoreEl.appendChild(tempListEl);
    highScoreEl.appendChild(goBack);

    highScoreEl.appendChild(clearScore);

    ContentEl.appendChild(highScoreEl);
    clearScore.addEventListener("click", clearHighScore);
    goBack.addEventListener("click", goBackToHome);
}

function clearHighScore() {
    var e = document.querySelector("#scoreList");
    var child = e.firstElementChild;
    while (child) {
        e.removeChild(child);
        child = e.firstElementChild;
    }

    localStorage.setItem("scores", []);
}

function viewScore() {
    if (!isQuizDone) {
        alert("You can't view score while quiz in on-going");
        return;
    } else {
        initialEl.style.display = "none";
    }


    displayScores();
}

function goBackToHome() {
    location.reload();
}




submitScore.addEventListener("click", saveScore);







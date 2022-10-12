var welcome = document.getElementById("start-screen")
var intro= document.getElementById("intro")
var startBtn = document.getElementById("start-button")
var questions = document.getElementById("questions")
var askQuestion = document.getElementById("question-title")
var timer = document.getElementById("timer")

var check= document.getElementById("check")
var endPage= document.getElementById("end-game")
var finalScore=document.getElementById("final-score")
var userInitials=document.getElementById("initials")
var submitBtn=document.getElementById("submit-btn")
var highScores = document.getElementById("score-screen")
var userScore= document.getElementById("highscores")
var finish = document.getElementById("finish")
var clearBtn=document.getElementById("clear-btn")

var buttonA = document.getElementById("a")
var buttonB = document.getElementById("b")
var buttonC = document.getElementById("c")
var buttonD = document.getElementById("d")


var questionOptions=[
    {
        question: "Commonly used data types DO NOT include:",
        choiceA:"strings",
        choiceB:"booleans",
        choiceC:"alerts",
        choiceD:"numbers",
        answer: "c"
    },
    {
        question: "The condition in an if/else statement is enclosed with:",
        choiceA: "quotes",
        choiceB:"curly brackets",
        choiceC:"parenthesis",
        choiceD:"square brackets",
        answer: "c"
    },
    {
        question: "Arrays in Javascript can be used to store:",
        choiceA: "numbers and strings",
        choiceB:"other arrays",
        choiceC:"booleans",
        choiceD:"all of the above",
        answer: "d"
    },
    {
        question: "A useful tool used during development and debugging for printing content to the debugger is:",
        choicesA: "Javascript",
        choiceB:"terminal/bash",
        choiceC:"for loop",
        choiceD:"console.log",
        answer: "d"
    }


];

var finalQuestionIndex = questionOptions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    endPage.style.display="none";
    if(currentQuestionIndex===finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = questionOptions[currentQuestionIndex];
    askQuestion.innerHTML = "<h2>" + currentQuestion.question + "</h2>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    endPage.style.display="none";
    welcome.style.display="none";
    generateQuizQuestion();

    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    askQuestion.style.display = "block";
}

function showScore() {
    questions.style.display = "none"
    endPage.style.display = "flex";
    clearInterval(timerInterval);
    userInitials.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + questionOptions.length + " correct!";
}


submitBtn.addEventListener("click", function highscore() {


    if (userInitials.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = userInitials.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        endPage.style.display = "none";
        highScores.style.display = "flex";
        userScore.style.display = "block";
       // endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}


function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//Score and name initials are clreared
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Go back to play again
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Function booleans for question answers
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();

        //Answer correct or if incorrect deduct 10 seconds
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        timeLeft = timeLeft - 10;
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

startBtn.addEventListener("click", startQuiz);
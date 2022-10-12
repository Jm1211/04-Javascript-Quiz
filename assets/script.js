var welcome = document.getElementById("start-screen")
var intro= document.getElementById("intro")
var startBtn = document.getElementById("start-button")
var questions = document.getElementById("questions")
var askQuestion = document.getElementById("question-title")
var timer = document.getElementById("timer")

var reactBtns=document.querySelectorAll(".choices")
var answerBtn1 = document.getElementById("answer_btn1");
var answerBtn2 = document.getElementById("answer_btn2");
var answerBtn3 = document.getElementById("answer_btn3");
var answerBtn4 = document.getElementById("answer_btn4");

var check= document.getElementById("check")
var endPage= document.getElementById("end-game")
var finalScore=document.getElementById("final-score")
var userInitials=document.getElementById("initials")
var submitBtn=document.getElementById("submit-btn")
var scoreScreen = document.getElementById("score-screen")
var scoreRec=document.getElementById("score_record")
var scoreCheck=document.getElementById("check-score")
var finish = document.getElementById("finish")
var clearBtn=document.getElementById("clear-btn")
var backBtn=document.getElementById("back-btn")




var questionOptions=[
    {
        question: "Commonly used data types DO NOT include:",
        choices:["a.strings","b.booleans","c.alerts","d.numbers",],
        answer: "c"
    },
    {
        question: "The condition in an if/else statement is enclosed with:",
        choices:["a.quotes","b.curly brackets","c.parenthesis","d.square brackets",],
        answer: "c"
    },
    {
        question: "Arrays in Javascript can be used to store:",
        choices:["a.numbers and strings","b.other arrays","c.booleans","d.all of the above",],
        answer: "d"
    },
    {
        question: "A useful tool used during development and debugging for printing content to the debugger is:",
        choices:["a.Javascript","b.terminal/bash","c.for loop","d.console.log",],
        answer: "d"
    }


];
 

var timeLeft = document.getElementById("timer");

var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;
/*Functions*/
    //WHEN I click the start button, THEN a timer starts(The setInterval() Method)
function countdown() {
        
        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Time left: " + secondsLeft + " s";
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time is up!"; 
                // if time is up, show on score board content instead of "all done!"
                finish.textContent = "Time is up!";
                gameOver();

            } else  if(questionCount >= questionOptions.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

    //Click the button to start the quiz
function startQuiz () {
        scoreScreen.style.display="none";
        endPage.style.display="none";
        intro.style.display = "none";
        questions.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
      
}
    //present the questions and answers
function showQuestion (n) {
        askQuestion.textContent = questionOptions[n].question;
        answerBtn1.textContent = questionOptions[n].choices[0];
        answerBtn2.textContent = questionOptions[n].choices[1];
        answerBtn3.textContent = questionOptions[n].choices[2];
        answerBtn4.textContent = questionOptions[n].choices[3];
        questionNumber = n;
    }

    //WHEN I answer a question,Show if answer is correct or wrong 
function checkAnswer(event) {
    event.preventDefault();
    //make it display
    check.style.display = "block";
    setTimeout(function () {
        check.style.display = 'none';
    }, 1000);

    // answer check
    if (questionOptions[questionNumber].answer == event.target.value) {
        check.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        check.textContent = "Wrong! The correct answer is " + questionOptions[questionNumber].answer + " .";
    }
         //THEN I am presented with another question
    if (questionNumber < questionOptions.length -1 ) {
    // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
    //WHEN all questions are answered or the timer reaches 0, Game is over
function gameOver() {

        questions.style.display = "none";
        endPage.style.display = "block";
        console.log(endPage);
        // show final score
        finalScore.textContent = "Your final score is :" + totalScore ;
        // clearInterval(timerInterval);  
        timeLeft.style.display = "none"; 
};

// get current score and initials from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


// render score to the score board
function renderScore () {
    scoreRec.innerHTML = "";
    scoreRec.style.display ="block";
    var highScores = sort();   
    // Slice the high score array to only show the top five high scores. 
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRec.appendChild(li);
    }
};

// sort score and ranking the highscore list
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

// push new score and initial to the local storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitials.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

/* Add event listeners*/
// startbtn to start the quiz
startBtn.addEventListener("click", startQuiz);

//click any choices button, go to the next question
reactBtns.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    endPage.style.display = "none";
    intro.style.display = "none";
    scoreScreen.style.display = "block";
    questions.style.display ="none";
    saveScore();
});

// check highscore ranking list
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    endPage.style.display = "none";
    intro.style.display = "none";
    scoreScreen.style.display = "block";
    questions.style.display ="none";
    renderScore();
});

//go back to main page
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        endPage.style.display = "none";
        intro.style.display = "block";
        scoreScreen.style.display = "none";
        questions.style.display ="none";
        location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});


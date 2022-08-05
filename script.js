let numberOfQuestion = 10;

let questionArr = [];

const startGame = () => {
    localStorage.setItem("currentQuestion", "1");
    localStorage.setItem("score", "0");
    showGUI();
    updateGUI();
    createQuestion();
    const startBoard = document.querySelector(".startBoard");
    const game = document.querySelector(".gameBoard");

    startBoard.classList = "startBoard isHidden";
    game.classList.remove("isHidden");
};

const playAgain = () => {
    questionArr.length = 0;

    const results = document.querySelector(".resultsBoard");
    const game = document.querySelector(".gameBoard");
    const btnNext = document.querySelector("#next");
    const btnCheckResults = document.querySelector("#checkResults");

    localStorage.clear();
    clearQuestion();
    localStorage.setItem("currentQuestion", "1");
    localStorage.setItem("score", "0");
    questionArr = [];
    showGUI();
    createQuestion();
    updateGUI();

    results.classList = "resultsBoard isHidden";
    btnNext.classList.remove("isHidden");
    btnCheckResults.classList = "btn next thought isHidden";
    game.classList.remove("isHidden");
};

const drawQuestion = () => {
    x = Math.floor(Math.random() * myQuestions.length);

    if (questionArr.includes(x) == false) {
        questionArr.push(x);
    } else {
        if (questionArr.length == myQuestions.length) {
            questionArr = [];
        } else {
            drawQuestion();
        }
    }
};

const createQuestion = () => {
    drawQuestion();

    const question = document.querySelector(".question");
    const ans = document.querySelector(".ans-items");

    question.textContent = myQuestions[x].q;

    myQuestions[x].opt.forEach((element) => {
        const li = document.createElement("li");
        li.classList = "ans-item thought";
        li.textContent = element;
        ans.append(li);
    });

    markAnswer();
};

const markAnswer = () => {
    const btnAnswer = document.querySelectorAll(".ans-item.thought");

    btnAnswer.forEach((element) => {
        element.addEventListener("click", function () {
            if (document.querySelectorAll(".ans-item.thought.checked").length) {
                if (element.classList.contains("checked")) {
                    element.classList.remove("checked");
                } else {
                    console.log("Only one answer");
                }
            } else {
                element.classList.add("checked");
            }
        });
    });
};

const showGUI = () => {
    const lblScore = document.querySelector(".lblScore");
    const questionNumber = document.querySelector(".lblQuestionNumber");

    lblScore.classList.remove("isHidden");
    questionNumber.classList.remove("isHidden");
};

const hideGUI = () => {
    const lblScore = document.querySelector(".lblScore");
    const questionNumber = document.querySelector(".lblQuestionNumber");

    lblScore.classList.add("isHidden");
    questionNumber.classList.add("isHidden");
};

const updateGUI = () => {
    const scoreValue = document.querySelector(".score");
    const questionNumber = document.querySelector(".lblQuestionNumber");
    scoreValue.textContent = localStorage.getItem("score");

    if (myQuestions.length < numberOfQuestion) {
        numberOfQuestion = myQuestions.length;
    }

    questionNumber.textContent = `${localStorage.getItem("currentQuestion")} / ${numberOfQuestion}`;
};

const lastQuestion = () => {
    const btnNext = document.querySelector("#next");
    const btnCheckResults = document.querySelector("#checkResults");
    btnNext.classList.add("isHidden");
    btnCheckResults.classList.remove("isHidden");
};

const clearQuestion = () => {
    const question = document.querySelectorAll(".question.thought");
    const ansLi = document.querySelectorAll(".ans-item.thought");

    if (question !== null) {
        question.textContent = "";
    }

    if (ansLi !== null) {
        ansLi.forEach((element) => {
            element.remove();
        });
    }
};

const checkAnswer = () => {
    const userAnswer = document.querySelector(".ans-item.thought.checked");

    if (userAnswer.textContent == myQuestions[x].ans) {
        let scoreValue = 100;
        let lsScore = JSON.parse(localStorage.getItem("score"));
        let scoreSum = lsScore + scoreValue;

        localStorage.setItem("score", scoreSum);
    } else {
        console.log("Zła odp");
    }
};

const nextQuestion = () => {
    const userAnswer = document.querySelector(".ans-item.thought.checked");

    if (userAnswer !== null) {
        checkAnswer();
        const ans = document.querySelector(".ans-items");
        const ansLi = document.querySelectorAll("li");

        ansLi.forEach((element) => {
            element.remove();
        });

        let currentQuestion = localStorage.getItem("currentQuestion");
        localStorage.setItem("currentQuestion", ++currentQuestion);
        updateGUI();

        if (currentQuestion == numberOfQuestion || currentQuestion == myQuestions.length) {
            lastQuestion();
        }
        createQuestion();
    } else {
        alert("Wybierz odpowiedź");
    }
};

const showResults = () => {
    checkAnswer();
    const game = document.querySelector(".gameBoard");
    const results = document.querySelector(".resultsBoard");
    const restart = document.querySelector(".restart");
    const scoreOnBoard = document.querySelector("#score");

    hideGUI();
    scoreOnBoard.textContent = `Twój wynik: ${localStorage.getItem("score")}`;
    game.classList = "gameBoard isHidden";
    results.classList.remove("isHidden");
};

//Init Main Loop
(function () {
    const btnNext = document.querySelector("#next");
    const btnCheckResults = document.querySelector("#checkResults");
    const btnStart = document.querySelector(".start");
    const btnRestart = document.querySelector(".restart");

    btnStart.addEventListener("click", startGame);
    btnRestart.addEventListener("click", playAgain);
    btnNext.addEventListener("click", nextQuestion);
    btnCheckResults.addEventListener("click", showResults);
})();

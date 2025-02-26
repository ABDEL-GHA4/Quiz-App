let Questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

let length = Questions.length;
console.log(length);

let questionsElement = document.querySelector("#question");
let btnAnswer = document.querySelector("#answer-buttons");
let nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    nextBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNbr = currentQuestionIndex + 1;
    questionsElement.innerHTML = `${questionNbr}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        let btn = document.createElement('button');
        btn.innerHTML = answer.text;
        btn.classList.add('btn');
        btnAnswer.appendChild(btn);

        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }

        btn.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (btnAnswer.firstChild) {
        btnAnswer.removeChild(btnAnswer.firstChild);
    }
}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(btnAnswer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < Questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

const questions = [
    {
        question: " Which of the following variables takes precedence over the others if the names are the same?",
        answers:[
            {text: "Global variable", correct:false},
            {text: "The local element", correct:true},
            {text: "The two of the above", correct:false},
            {text: "None of the above", correct:false},
        ]
    },

    {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        answers:[
            {text: "Preprocessor", correct:false},
            {text: "Triggering Event", correct:false},
            {text: "RMI", correct:false},
            {text: "Function/Method", correct:true},
        ]
    },

    {
        question: "Which of the following type of a variable is volatile?",
        answers:[
            {text: "Mutable variable", correct:false},
            {text: "Dynamic variable", correct:false},
            {text: "Volatile variable", correct:false},
            {text: "Immutable variable", correct:true},
        ]
    },

    {
        question: "In the JavaScript, which one of the following is not considered as an error:",
        answers:[
            {text: "Syntax error", correct:false},
            {text: "Missing of semicolons", correct:false},
            {text: "Division by zero", correct:true},
            {text: "Missing of Bracket", correct:false},
        ]
    },

    {
        question: "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
        answers:[
            {text: "slice()", correct:false},
            {text: "split()", correct:false},
            {text: "substr()", correct:true},
            {text: "search()", correct:false},
        ]
    },

    {
        question: " In JavaScript, what will be used for calling the function definition expression:",
        answers:[
            {text: "Function prototype", correct:false},
            {text: "Function literal", correct:false},
            {text: "Function calling", correct:false},
            {text: "Function declaration", correct:true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function  startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}



function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < )
})
startQuiz();
const questions=[
    {
        question:"What fruit is likely to be Harshal's favorite?",
        answer:[
                {text:" Mango",correct:true},
                {text:"Banana",correct:false},
                { text:"Apple",correct:false},
                {text:"Orange",correct:false} 
        ]
    },
    {
        question:"What dish would Harshal most likely order for dinner if given the chance?",
        answer:[
            {text:"Burgers:",correct:false},
            { text:"Biryani",correct:false},
            {text:"Pizza",correct:false} ,
            {text:" Chicken Curry",correct:true}
        ]
    },
    {
        question:"If Harshal were to visit a zoo, which animal exhibit would he rush to see first?",
        answer:[
            {text:" Lions",correct:false},
            { text:" Elephants",correct:false},
            {text:"Monkeys",correct:true},
                {text:"Penguins",correct:false} 
        ]
    },
    {
        question:"If Harshal were to paint a picture of a serene landscape, which color would he likely use for the sky?",
        answer:[
                {text:"Sky Blue",correct:false},
                {text:" Sunset Orange",correct:true},
                { text:" Forest Green",correct:false},
                {text:" Midnight Black",correct:false} 
        ]
    },
    {
        question:"Which of the following anime would Harshal be most likely to enjoy?",
        answer:[
            {text:"AOT",correct:false},
            { text:"Demon slayer",correct:false},
            {text:"Naruto",correct:true},
                {text:"Death Note",correct:false} 
        ]
    }
]
const questionElement=document.getElementById("question");
const ansBtn=document.getElementById("answer-buttons");
const nextBtn=document.getElementById("next-btn");

let currentQuIdx=0;
let score=0;

function startQuiz() {
    currentQuIdx=0;
    score=0;
    nextBtn.innerHTML="Next"
showQuestion();    
}
function showQuestion(){
    resetState();
    let currentQu=questions[currentQuIdx];
    let questionNo=currentQuIdx+1;
    questionElement.innerHTML=questionNo+". "+currentQu.question;

    currentQu.answer.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}
function resetState(){
    nextBtn.style.display="none";
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn=e.target;
    const iscorrect=selectedBtn.dataset.correct==="true";
    if (iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;

    });
    nextBtn.style.display="block"
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="Play Again"
    nextBtn.style.display="block";
}

function handleNextButton(){
    currentQuIdx++;
    if (currentQuIdx<questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextBtn.addEventListener("click",()=>{
    if (currentQuIdx<questions.length) {
        handleNextButton();
    } else{
        startQuiz();
    }
});
startQuiz();
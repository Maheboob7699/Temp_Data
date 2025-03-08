const questions = [
    {
        ques: "What is HTML?",
        options: [
            "A programming language",
            "A markup language for structuring content",
            "A database management system",
            "A CSS framework"
        ],
        answer: "A markup language for structuring content"
    },
    {
        ques: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Cascading Script Sheets",
            "Custom Style Sheets",
            "Creative Styling Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        ques: "What is JavaScript primarily used for?",
        options: [
            "Creating static web pages",
            "Styling web pages",
            "Adding interactivity to web pages",
            "Designing web pages"
        ],
        answer: "Adding interactivity to web pages"
    },
    {
        ques: "Which of the following is used to define a class in CSS?",
        options: [
            ".className",
            "#className",
            "$className",
            "&className"
        ],
        answer: ".className"
    },
    {
        ques: "What is the purpose of the 'alt' attribute in an <img> tag?",
        options: [
            "To define the width of the image",
            "To add a caption to the image",
            "To provide alternative text for the image",
            "To add a border around the image"
        ],
        answer: "To provide alternative text for the image"
    },
    {
        ques: "In React, what does 'state' represent?",
        options: [
            "Data passed from parent to child components",
            "Local data storage within a component",
            "A way to style components",
            "A method to define props"
        ],
        answer: "Local data storage within a component"
    },
    {
        ques: "Which of these is used to declare a variable that cannot be reassigned in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "immutable"
        ],
        answer: "const"
    },
    {
        ques: "What is JSX in React?",
        options: [
            "A JavaScript extension for defining styles",
            "A syntax extension for writing HTML in JavaScript",
            "A library for state management",
            "A new type of JavaScript function"
        ],
        answer: "A syntax extension for writing HTML in JavaScript"
    },
    {
        ques: "Which CSS property is used to change the text color?",
        options: [
            "color",
            "background-color",
            "font-color",
            "text-color"
        ],
        answer: "color"
    },
    {
        ques: "What does the '===' operator do in JavaScript?",
        options: [
            "Compares values and performs type conversion",
            "Compares both value and type without type conversion",
            "Compares two strings only",
            "Assigns a value to a variable"
        ],
        answer: "Compares both value and type without type conversion"
    },
    {
        ques: "Which tag is used to create a hyperlink in HTML?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<hlink>"
        ],
        answer: "<a>"
    }
];


let randomQuestion = [];
let usedIndices = new Set();

for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * questions.length);

    if (usedIndices.has(randomNumber)) {
        i--; 
    } else {
        usedIndices.add(randomNumber);
        console.log("random number is", randomNumber);

        let questandAns = {
            ques: questions[randomNumber].ques,
            options: questions[randomNumber].options,
            answer: questions[randomNumber].answer
        };
        randomQuestion.push(questandAns);
    }
}

 localStorage.setItem("questions",JSON.stringify(randomQuestion));

 export const quizzRandomQuestion =  JSON.parse(localStorage.getItem("questions")) || [];

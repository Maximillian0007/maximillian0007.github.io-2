
var questions = [{
    question: "Which of the following 4 foods are best for testosterone?",
    choices: ["apples", "almonds", "beef", "beans"],
    correctAnswer: 2
}, {
    question: "What is the capital of Georgia (country)?",
    choices: ["Moscow", "Istanbul", "Tbilisi", "Sofia"],
    correctAnswer: 2
}, {
    question: "What is Casanova's first name?",
    choices: ["Giacomo", "Giamarco", "Stellino","Angelo"],
    correctAnswer: 0
}, {
    question: "Which bird is notorious for delivering babies?",
    choices: ["pigeon", "falcon", "stork", "eagle"],
    correctAnswer: 2
}, {
    question: "Where is Grey Goose vodka made?",
    choices: ["China", "France", "Moscow", "Australia"],
    correctAnswer: 1
}, {
    question: "Where is the world's most wine produced?",
    choices: ["Italy", "France", "Spain", "USA"],
    correctAnswer: 0	
	
}, {
    question: "What do cops love to eat on their free time?",
    choices: ["waffles", "pancakes", "chips", "donuts"],
    correctAnswer: 3	
}, {
    question: "What country do the Spartans come from?",
    choices: ["Italy", "Greece", "Slovakia", "Croatia"],
    correctAnswer: 1
}, {
    question: "What Russian word does the word vodka originate from?",
    choices: ["wine", "water", "juice", "sweat"],
    correctAnswer: 1

}, {
    question: "What country has the most lions?",
    choices: ["Nigeria", "Tanzania", "China", "Yo mammas backyard"],
    correctAnswer: 1

}, {
    question: "Who invented the light-bulb?",
    choices: ["Thomas Edison", "Benjamin Franklin", "Nikola Tesla", "Colonel Sanders"],
    correctAnswer: 0

	}, {
    question: "How old is the longest someone has ever lived?",
    choices: ["122 years", "109 years", "136 years", "201 years"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
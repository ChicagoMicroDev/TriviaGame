$(document).ready(function() {

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
        {
            question: "How many Starting players are there on a major league baseball Team?",
            choices: ["6", "7", "9", "8"],
            correctAnswer: "9",
            image: "<img src='assets/images/byebye.gif' class='img-circle shadow'>"
        },
        {
            question: "What Is the meaning Of R.B.I?",
            choices: ["Run Batted in", "Run balled in", "Run Butt in ", "Row boat in"],
            correctAnswer: "Run Batted in",
            image: "<img src='assets/images/Handshake.gif' class='img-circle shadow'>"
        },
        {
            question: "What is a full count in baseball?",
            choices: ["2-3", "4-3", "3-2", "3-0"],
            correctAnswer: "3-2",
            image: "<img src='assets/images/Slidingfacefirst.gif' class='img-circle shadow'>"
        },
        {
            question: "What happens when there is basses loaded in baseball ?",
            choices: ["Everyone gets to score", "Force at any Base", "Points are double ", "The game is over"],
            correctAnswer: "Force at any Base",
            image: "<img src='assets/images/Wellhellothere.gif' class='img-circle shadow'>"
        },
        {

        }];



    function questionContent() {
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }


    function userWin() {
        $("#gameScreen").html("<p>You got it right!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }


    function userLoss() {
        $("#gameScreen").html("<p>Nope, that's not it!</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<p>You ran out of time!</p>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" +
                correctAnswer +
                "</span></p>" +
                questions[questionCounter].image);
            setTimeout(nextQuestion, 4000);
            questionCounter++;
        }
    }

    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "Baseball is in your blood";
            var bottomText = "#nerdalert!";
        }
        else if (correctGuesses > incorrectGuesses) {
            var endMessage = "Look like you're not getting a perfect game ";
            var bottomText = "but you still done good";
        }
        else {
            var endMessage = "There no crying in baseball";
            var bottomText = "You may need to pray to the rain gods";
        }
        $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
            correctGuesses + "</strong> right.</p>" +
            "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
        $("#bottomText").html(bottomText);
        gameReset();
        $("#start").click(nextQuestion);
    }


    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }


    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }

    }


    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
    }

    function startGame() {
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $("#start").hide();
        questionContent();
        timer();
        userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
    $("#gameScreen").on("click", ".choices", (function() {
        // alert("clicked!");
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});
var canvas;
var canvasContext;
var canvasWidth = 800;
var canvasHeight = 600;
var canvasBackground = "black";

var wallReflectAudio = new soundOverlapsClass("sfx/wall");
var paddleReflectAudio = new soundOverlapsClass("sfx/paddle");

const MAX_SCORE = 11;
const SCORE_FONT = "30px Arial";
const SCORE_COLOR = "white";

var winningScreen = false;

var difficultyMultiplicator = 1;
var difficultyCounter = 0;

window.onload = function()	{
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener("mousedown", mousedownHandler, false);

    canvas.addEventListener("mousemove", mousemoveHandler);

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvasContext.textAlign = "center";
}

function drawEverything() {
    // clear the game view
    colorRect(0, 0, canvasWidth, canvasHeight, canvasBackground);

    if (winningScreen) {
        if (player1.score >= MAX_SCORE) {
            console.log("player1 wins");
            colorText(SCORE_FONT, "LEFT WINS", canvas.width/2, canvas.height/2, SCORE_COLOR);
            colorText(SCORE_FONT, "Click to continue", canvas.width/2, canvas.height - 100, SCORE_COLOR);
        } else if (player2.score >= MAX_SCORE) {
            console.log("player2 wins");
            colorText(SCORE_FONT, "RIGHT WINS", canvas.width/2, canvas.height/2, SCORE_COLOR);
            colorText(SCORE_FONT, "Click to continue", canvas.width/2, canvas.height - 100, SCORE_COLOR);
        } 
    } else {
        // Ball
        colorCircle(ball.x, ball.y, ball.radius, ball.color);
    
        // Player1 and Player2
        colorRect(player1.x, player1.y, PADDLE_WIDTH, PADDLE_HEIGHT, player1.color);
        colorRect(player2.x, player2.y, PADDLE_WIDTH, PADDLE_HEIGHT, player2.color);

        // Dashed line
        for (var i = 0; i <= 15; i++) {
            colorRect((canvas.width/2)-01, i * 40, 2, 20, "white");
        }
    }
    
    // Score Player1 and Player2
    colorText (SCORE_FONT, player1.score, player1.scorePosX, player1.scorePosY, player1.color);
    colorText (SCORE_FONT, player2.score, player2.scorePosX, player2.scorePosY, player2.color);
}

function moveEverything() {
    if (winningScreen) {
        return;
    }

    moveComputerPaddle();

    checkBallX();
    checkBallY();

    checkPaddleX();
    checkPaddleY();

    if (difficultyCounter < 4) {
        difficultyMultiplicator = 1;
    } else if (difficultyCounter >= 4) {
        difficultyMultiplicator = 1.2;
    } else if (difficultyCounter >= 12) {
        difficultyMultiplicator = 1.4;
    }

    ball.x += ball.speedX * difficultyMultiplicator;
    ball.y += ball.speedY;
}
var canvas;
var canvasContext;
var canvasWidth = 800;
var canvasHeight = 600;
var canvasBackground = "black";

const MAX_SCORE = 3;
const SCORE_FONT = "30px Arial";
const SCORE_COLOR = "white";
const RESET_POS_X = canvasWidth / 2;
const RESET_POS_Y = canvasHeight / 2;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

var winningScreen = false;

var ball = {
    x: 75,
    y: 75,
    color: "white",
    radius: 10,
    speedX: 8,
    speedY: 8,
}

// PLAYER 1
var player1 = {
    x: 0,
    y: 250,
    color: "white",
    speedX: 7,
    speedY: 7,
    score: 0,
    scorePosX: 100,
    scorePosY: 50,
}

// PLAYER 2
var player2 = {
    x: canvasWidth - PADDLE_WIDTH,
    y: 250,
    color: "grey",
    speedX: 7,
    speedY: 7,
    score: 0,
    scorePosX: canvasWidth - 100,
    scorePosY: 50,
}

window.onload = function()	{
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener("mousedown", ClickHandler, false);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        player1.y = mousePos.y - (PADDLE_HEIGHT/2);
    } );

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvasContext.textAlign = "center";
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the marings, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText (font, text, scorePosX, scorePosY, color) {
    canvasContext.font = font;
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, scorePosX, scorePosY);
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

function moveComputerPaddle() {
    var center = player2.y + PADDLE_HEIGHT / 2;

    if (ball.y > center) {
        if (ball.y < center + 35) {
            return;
        } else {
            player2.y += player2.speedY;
        }
    } else if (ball.y < center) {
        if (ball.y > center - 35) {
            return;
        } else {
            player2.y -= player2.speedY;
        }
    } 
}

function moveEverything() {
    if (winningScreen) {
        return;
    }

    checkBallX();
    checkBallY();

    checkPaddleX();
    checkPaddleY();

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    moveComputerPaddle();
}

function ClickHandler () {
    if (winningScreen) {
        player1.score = 0;
        player2.score = 0;
        winningScreen = !winningScreen;
    }
}

function checkBallX () {
    // right border
    if (ball.x > canvas.width - PADDLE_WIDTH) {
        // ball hit AI paddle
        if (ball.y > player2.y + 45 && ball.y < player2.y + 55) {
            // ball hit center
            ball.speedX *= -1;
            ball.speedY = 0;
        } else if (ball.y > player2.y + 10 && ball.y < player2.y + 45) {
            // ball hit top section
            ball.speedX *= -1;
            ball.speedY -= 2;
        } else if (ball.y > player2.y && ball.y < player2.y + 10) {
            // ball hit top edge
            ball.speedX *= -1;
            ball.speedY -= 4;
        } else if (ball.y > player2.y + 55 && ball.y < player2.y + 90) {
            // ball hit bottom section
            ball.speedX *= -1;
            ball.speedY += 2;
        } else if (ball.y > player2.y + 90 && ball.y < player2.y + PADDLE_HEIGHT) {
            //ball hit bottom edge
            ball.speedX *= -1;
            ball.speedY += 4;
        } else {
            // missing AI paddle
            player1.score++;
            ballReset(RESET_POS_X, RESET_POS_Y);
        }
    }

    // left border
    if (ball.x < 0 + PADDLE_WIDTH) {
        // ball hit player paddle
        if (ball.y > player1.y + 45 && ball.y < player1.y + 55) {
            // ball hit center
            ball.speedX *= -1;
            ball.speedY = 0;
        } else if (ball.y > player1.y + 10 && ball.y < player1.y + 45) {
            // ball hit top section
            ball.speedX *= -1;
            ball.speedY -= 2;
        } else if (ball.y > player1.y && ball.y < player1.y + 10) {
            // ball hit top edge
            ball.speedX *= -1;
            ball.speedY -= 4;
        } else if (ball.y > player1.y + 55 && ball.y < player1.y + 90) {
            // ball hit bottom section
            ball.speedX *= -1;
            ball.speedY += 2;
        } else if (ball.y > player1.y + 90 && ball.y < player1.y + PADDLE_HEIGHT) {
            //ball hit bottom edge
            ball.speedX *= -1;
            ball.speedY += 4;
        } else {
            // missing player paddle
            player2.score++;
            ballReset(RESET_POS_X, RESET_POS_Y);
        }
    }
}

function checkBallY () {
    if (ball.y > canvas.height) {
        ball.speedY *= -1;
    } else if (ball.y < 0) {
        ball.speedY *= -1;
    }
}

function ballReset (x, y) {
    if (player1.score >= MAX_SCORE || player2.score >= MAX_SCORE) {
        winningScreen = true;
    }
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speedX *= -1;
    ball.speedY = Math.floor(Math.random() * 20) - 10;
}

function checkPaddleX () {
    if (player1.x > canvas.width) {
        player1.speedX *= -1;
    }
    if (player1.x < 0){
        player1.speedX *= -1;
    }
}

function checkPaddleY () {
    if (player1.y > canvas.height) {
        player1.speedX *= -1;
    }
    if (player1.y < 0) {
        player1.speedX *= -1;
    }
}
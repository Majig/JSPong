const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

var canvasWidth = 800;
var canvasHeight = 600;

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
    speedY: 10,
    score: 0,
    scorePosX: canvasWidth - 100,
    scorePosY: 50,
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
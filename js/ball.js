var canvasWidth = 800;
var canvasHeight = 600;

var ball = {
    x: 75,
    y: 75,
    color: "white",
    radius: 10,
    speedX: 10,
    speedY: 10,
}

function checkBallX () {
    // right border
    if(ball.x > canvas.width) { // if ball has moved beyond the right edge
        if(ball.y > player2.y && ball.y < player2.y + PADDLE_HEIGHT) {
          ball.speedX *= -1; // reverse ball's horizontal direction
          var deltaY = ball.y - (player2.y + PADDLE_HEIGHT / 2);
          ball.speedY = deltaY * 0.35;
          difficultyCounter += 1;
          console.log("Difficulty: " + difficultyCounter);
          paddleReflectAudio.play();
        } else {
          player1.score++;
          difficultyCounter = 0;
          console.log("Difficulty: " + difficultyCounter);
          wallReflectAudio.play();
          ballReset();
        }
      }

    // left border
    if (ball.x < 0) {
        if (ball.y > player1.y && ball.y < player1.y + PADDLE_HEIGHT) {
            ball.speedX *= -1;
            var deltaY = ball.y - (player1.y + PADDLE_HEIGHT / 2);
            ball.speedY = deltaY * 0.35;
            difficultyCounter += 1;
            console.log("Difficulty: " + difficultyCounter);
            paddleReflectAudio.play();
        } else {
            player2.score++;
            difficultyCounter = 0;
            console.log("Difficulty: " + difficultyCounter);
            wallReflectAudio.play();
            ballReset();
        }
    }
}

function checkBallY () {
    if (ball.y > canvas.height) {
        ball.speedY *= -1;
        wallReflectAudio.play();
    } else if (ball.y < 0) {
        ball.speedY *= -1;
        wallReflectAudio.play();
    }
}

function ballReset (x, y) {
    if (player1.score >= MAX_SCORE || player2.score >= MAX_SCORE) {
        winningScreen = true;
    }

    ball.speedX = -ball.speedX;
    ball.speedY = 5.0 + Math.random() * 4.0;

    if (Math.random() < 0.5) {
        ball.speedY *= -1.0;
    }

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
}
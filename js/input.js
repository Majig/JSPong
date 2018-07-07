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

function mousedownHandler() {
    if (winningScreen) {
        player1.score = 0;
        player2.score = 0;
        winningScreen = !winningScreen;
    }
}

function mousemoveHandler(evt) {
    var mousePos = calculateMousePos(evt);
    player1.y = mousePos.y - (PADDLE_HEIGHT / 2);
}
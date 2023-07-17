var rod = document.getElementsByClassName('rod');
var ball = document.getElementById('ball');

// rod movement ****************************************************
var rodLeft = 41;
var ballLeft = 0;
var ballTop = 0;
var toLeft = true;
var toDown = true;
var movingballInterval;
var rod1Score = 0;
var rod2Score = 0;


function move(event) {
    if (event.key === 'd' && rodLeft <= 79) {
        rodLeft += 1;
        rod[0].style.left = rodLeft + '%';
        rod[1].style.left = rodLeft + '%';
    }
    if (event.key === 'a' && rodLeft > 0) {
        rodLeft -= 1;
        rod[0].style.left = rodLeft + '%';
        rod[1].style.left = rodLeft + '%';
    }
}
document.addEventListener('keypress', move);
// rod movement ****************************************************

function positionRod() {
    rodLeft = 41;
    rod[0].style.left = rodLeft + '%';
    rod[1].style.left = rodLeft + '%';
}

function positionBall() {
    if (localStorage.getItem('maxScore') == null) {
        ball.style.top = 50 + 'vh';
        ball.style.left = 50 + 'vw';
    } else if (localStorage.getItem('rod1Score') >= localStorage.getItem('rod2Score')) {
        toDown = true;
        ball.style.top = 22 + 'px';
        ball.style.left = 50 + 'vw';
    } else if (localStorage.getItem('rod1Score') < localStorage.getItem('rod2Score')) {
        toDown = false;
        ball.style.top = (window.innerHeight - 52) + 'px';
        ball.style.left = 50 + 'vw';
    }
    ballLeft = ball.getBoundingClientRect().x;
    ballTop = ball.getBoundingClientRect().y;
}

function alertPreviousStatus() {
    // localStorage.removeItem('maxScore');
    if (localStorage.getItem("maxScore") === null) {
        window.alert('This is your first game');
        localStorage.setItem("maxScore", 0);
    } else {
        window.alert(localStorage.getItem("maxScorer") + ' has maximum score of ' + localStorage.getItem('maxScore') + ' so the ball will start with him ');
    }
}

function moveTheBall() {
    if (ballLeft < window.innerWidth && toLeft) {
        if (ballLeft >= window.innerWidth - 30) {
            toLeft = false;
        }
        ballLeft += 2;
        ball.style.left = ballLeft + 'px';
    }
    if (ballTop < window.innerHeight && toDown) {
        if (ballTop >= window.innerHeight - 52) {
            toDown = false;
            rod2Score += 100;
        }
        ballTop += 2;
        ball.style.top = ballTop + 'px';
    }
    if (ballLeft >= 0 && !toLeft) {
        if (ballLeft <= 2) {
            toLeft = true;
        }
        ballLeft -= 2;
        ball.style.left = ballLeft + 'px';
    }
    if (ballTop > 22 && !toDown) {
        if (ballTop <= 24) {
            toDown = true;
            rod1Score += 100;
        }
        ballTop -= 2;
        ball.style.top = ballTop + 'px';
    }
}

function gameEnded() {
    window.alert(' Rod1 :  ' + rod1Score + ' Rod 2 : ' + rod2Score);

    if ((localStorage.getItem("maxScore") < Math.max(rod1Score, rod2Score))) {
        if ((localStorage.getItem("rod1Score")) < rod1Score)
            localStorage.setItem("rod1Score", rod1Score);
        if ((localStorage.getItem("rod2Score")) < rod2Score)
            localStorage.setItem("rod2Score", rod2Score);
        // console.log('setting max scorer and max score ');
        localStorage.setItem("maxScore", Math.max(rod1Score, rod2Score));
        if (rod1Score >= rod2Score)
            localStorage.setItem("maxScorer", "Rod 1");
        if (rod1Score < rod2Score)
            localStorage.setItem("maxScorer", "Rod 2");
    }

    positionBall();
    rod1Score = 0;
    rod2Score = 0;
    positionRod();
    setTimeout(function() {
        ball.style.display = 'block';
    }, 100);

}

function keepChecking() {
    if (((ballTop >= window.innerHeight - 52) || (ballTop <= 24)) && (ballLeft < (rod[0].getBoundingClientRect().x) || ballLeft > (rod[0].getBoundingClientRect().x + rod[0].getBoundingClientRect().width))) {
        clearInterval(movingballInterval);
        ball.style.display = 'none';
        setTimeout(gameEnded, 100);
    }
}

function startEverything() {
    moveTheBall();
    keepChecking();
}

function startGame() {
    // localStorage.setItem("maxScore", 0);
    // localStorage.setItem("maxScorer", 0);
    clearInterval(movingballInterval);
    ball.style.display = 'block';
    positionBall();
    positionRod();
    alertPreviousStatus();
    movingballInterval = setInterval(startEverything, 8);

}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startGame();
    }
});
var Color = require('color');

// UI Elements
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const container = document.getElementById('container');
const ball = document.getElementById('ball');
const message = document.getElementById('message');
const display = document.getElementById('display');
const displayColor1 = document.getElementById('display__color1');
const displayColor2 = document.getElementById('display__color2');
const displayColor3 = document.getElementById('display__color3');
const displayColor4 = document.getElementById('display__color4');
const displayColor5 = document.getElementById('display__color5');
const displayColor1Value = document.getElementById('display__color1__value');
const displayColor2Value = document.getElementById('display__color2__value');
const displayColor3Value = document.getElementById('display__color3__value');
const displayColor4Value = document.getElementById('display__color4__value');
const displayColor5Value = document.getElementById('display__color5__value');
const displayColorValues = Array.prototype.slice.call(
    document.querySelectorAll('.display__color span')
);

// Waves
const wave1 = document.getElementById('wave1');
const wave2 = document.getElementById('wave2');
const wave3 = document.getElementById('wave3');
const wave4 = document.getElementById('wave4');

// Measurements
let ballWidth;
let ballHeight;
let containerEdgeLeft;
let containerEdgeTop;
let containerEdgeRight;
let containerEdgeBottom;

// Variables
let ballEdgeLeft, ballEdgeTop, ballEdgeRight, ballEdgeBottom;
let randomColor1, randomColor2;
let randomColor2_shade_dark, randomColor2_shade_darker, randomColor2_shade_darkest;
let steps = 3;
let currPosX = 0;
let currPosY = 0;
let IntervalX = 0;
let IntervalY = 0;
let leftToRight = true;
let topToBottom = true;
let runner = false;

function init() {
    // ! Event listener
    window.addEventListener('resize', () => {
        measureContainer();
    });
    document.body.onkeydown = e => {
        if (e.keyCode == 32 && runner == false) {
            startMove();
        } else {
            stopMove();
        }
    };
    displayColorValues.forEach(displayColorValue => {
        displayColorValue.addEventListener('click', copyColor);
    });
    btnStart.addEventListener('click', startMove);
    btnStop.addEventListener('click', stopMove);

    // ! Measurements
    measureContainer();

    // ! Generate a new color, create shades and paint everything
    generateModifyAndPaint();
}

init();

function startMove() {
    startMoveX();
    startMoveY();
    showBall();
    runner = true;
}

function stopMove() {
    stopMoveX();
    stopMoveY();
    showDisplay();
    runner = false;
}

function stopMoveX() {
    clearInterval(IntervalX);
}

function stopMoveY() {
    clearInterval(IntervalY);
}

function startMoveX() {
    stopMoveX();
    IntervalX = setInterval(moveBallX, 10);
}

function startMoveY() {
    stopMoveY();
    IntervalY = setInterval(moveBallY, 10);
}

function moveBallX() {
    ballEdgeLeft = currPosX;
    ballEdgeRight = currPosX + ballWidth;

    if (ballEdgeRight >= containerEdgeRight) {
        leftToRight = false;
        generateModifyAndPaint();
    } else if (ballEdgeLeft <= containerEdgeLeft) {
        leftToRight = true;
        generateModifyAndPaint();
    }

    leftToRight ? move('toRight') : move('toLeft');
}

function moveBallY() {
    ballEdgeTop = currPosY;
    ballEdgeBottom = currPosY + ballHeight;

    if (ballEdgeBottom >= containerEdgeBottom) {
        topToBottom = false;
        generateModifyAndPaint();
    } else if (ballEdgeTop <= containerEdgeTop) {
        topToBottom = true;
        generateModifyAndPaint();
    }

    topToBottom ? move('toBottom') : move('toTop');
}

function move(dir) {
    switch (dir) {
        case 'toRight':
            currPosX += steps;
            ball.style.left = currPosX + 'px';
            break;
        case 'toLeft':
            currPosX -= steps;
            ball.style.left = currPosX + 'px';
            break;
        case 'toBottom':
            currPosY += steps;
            ball.style.top = currPosY + 'px';
            break;
        case 'toTop':
            currPosY -= steps;
            ball.style.top = currPosY + 'px';
            break;
    }
}

function randomColor(opacity) {
    let r = Math.floor(Math.random() * 256); // pick a "red" from 0 - 255
    let g = Math.floor(Math.random() * 256); // pick a "green" from 0 - 255
    let b = Math.floor(Math.random() * 256); // pick a "blue" from 0 - 255
    return `rgba(${r},${g},${b},${opacity})`; // RGBA (r, g, b, opacity)
}

function generateModifyAndPaint() {
    // ! Generate colors
    randomColor1 = Color(randomColor(1)).hsl();
    randomColor2 = Color(randomColor1)
        .rotate(180)
        .hex();

    // ! Create Shades of randomColor2
    randomColor2_shade_dark = Color(randomColor2)
        .darken(0.25)
        .hex();
    randomColor2_shade_darker = Color(randomColor2)
        .darken(0.5)
        .hex();
    randomColor2_shade_darkest = Color(randomColor2)
        .darken(0.75)
        .hex();

    // ! Paint the walls
    document.body.style.background = randomColor1;
    ball.style.background = randomColor2;
    wave1.style.fill = randomColor2;
    wave2.style.fill = randomColor2_shade_dark;
    wave3.style.fill = randomColor2_shade_darker;
    wave4.style.fill = randomColor2_shade_darkest;
    displayColor1.style.background = randomColor1;
    displayColor2.style.background = randomColor2;
    displayColor3.style.background = randomColor2_shade_dark;
    displayColor4.style.background = randomColor2_shade_darker;
    displayColor5.style.background = randomColor2_shade_darkest;

    // ! Display color values in the displays
    displayColor1Value.innerHTML = `${(randomColor1 = Color(randomColor1).hex())}`;
    displayColor2Value.innerHTML = `${randomColor2}`;
    displayColor3Value.innerHTML = `${randomColor2_shade_dark}`;
    displayColor4Value.innerHTML = `${randomColor2_shade_darker}`;
    displayColor5Value.innerHTML = `${randomColor2_shade_darkest}`;
}

function copyColor(e) {
    const copiedColor = e.target.innerText;
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = copiedColor;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showMessage();
    message.innerHTML = `<p>Copied <span style="background: ${copiedColor}">${copiedColor}</span> to your clipboard!`;
    message.classList.add('animated', 'bounceInDown', 'fast');
    message.addEventListener('animationend', () => {
        message.classList.remove('animated', 'bounceInDown', 'fast');
    });
    setTimeout(showDisplay, 3000);
}

function measureContainer() {
    ballWidth = ball.clientWidth;
    ballHeight = ball.clientHeight;
    containerEdgeLeft = container.clientLeft;
    containerEdgeTop = container.clientTop;
    containerEdgeRight = container.offsetWidth;
    containerEdgeBottom = container.offsetHeight;
}

function showDisplay() {
    // Hide
    ball.classList.add('hide');
    ball.classList.remove('show');
    message.classList.add('hide');
    message.classList.remove('show');
    message.innerHTML = '';
    // Show
    display.classList.remove('hide');
    display.classList.add('show');
}

function showBall() {
    // Hide
    display.classList.remove('show');
    display.classList.add('hide');
    message.classList.remove('show');
    message.classList.add('hide');
    message.innerHTML = '';
    // Show
    ball.classList.remove('hide');
    ball.classList.add('show');
}

function showMessage() {
    // Hide
    ball.classList.remove('show');
    ball.classList.add('hide');
    display.classList.remove('show');
    display.classList.add('hide');
    // Show
    message.classList.remove('hide');
    message.classList.add('show');
}

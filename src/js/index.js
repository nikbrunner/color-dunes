var Color = require('color');

// UI Elements
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const container = document.getElementById('container');
const ball = document.getElementById('ball');
const display = document.getElementById('display');
const displayColor1 = document.getElementById('display__color1');
const displayColor2 = document.getElementById('display__color2');
const displayColor3 = document.getElementById('display__color3');
const displayColor4 = document.getElementById('display__color4');
const displayColor5 = document.getElementById('display__color5');

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
    // Event listener
    window.addEventListener('resize', () => {
        init();
    });
    document.body.onkeydown = e => {
        if (e.keyCode == 32 && runner == false) {
            startMove();
        } else {
            stopMove();
        }
    };
    btnStart.addEventListener('click', startMove);
    btnStop.addEventListener('click', stopMove);

    // Measurements
    ballWidth = ball.clientWidth;
    ballHeight = ball.clientHeight;
    containerEdgeLeft = container.clientLeft;
    containerEdgeTop = container.clientTop;
    containerEdgeRight = container.offsetWidth;
    containerEdgeBottom = container.offsetHeight;

    generateModifyAndPaint();
}

init();

function startMove() {
    startMoveX();
    startMoveY();
    runner = true;
    display.classList.remove('show');
    display.classList.add('hide');
    ball.classList.remove('hide');
    ball.classList.add('show');
}

function stopMove() {
    stopMoveX();
    stopMoveY();
    runner = false;
    ball.classList.add('hide');
    ball.classList.remove('show');
    display.classList.remove('hide');
    display.classList.add('show');
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
        generateModifyAndPaint();
        leftToRight = false;
    } else if (ballEdgeLeft <= containerEdgeLeft) {
        generateModifyAndPaint();
        leftToRight = true;
    }

    leftToRight ? move('toRight') : move('toLeft');
}

function moveBallY() {
    ballEdgeTop = currPosY;
    ballEdgeBottom = currPosY + ballHeight;

    if (ballEdgeBottom >= containerEdgeBottom) {
        generateModifyAndPaint();
        topToBottom = false;
    } else if (ballEdgeTop <= containerEdgeTop) {
        generateModifyAndPaint();
        topToBottom = true;
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
    // Generate colors
    randomColor1 = Color(randomColor(1)).hsl();
    randomColor2 = Color(randomColor1)
        .rotate(90)
        .hex();

    // Create Shades of randomColor2
    randomColor2_shade_dark = Color(randomColor2)
        .darken(0.25)
        .hex();
    randomColor2_shade_darker = Color(randomColor2)
        .darken(0.5)
        .hex();
    randomColor2_shade_darkest = Color(randomColor2)
        .darken(0.75)
        .hex();

    // Paint the walls
    document.body.style.background = randomColor1;
    ball.style.background = randomColor2;
    wave1.style.fill = randomColor2;
    wave2.style.fill = randomColor2_shade_dark;
    wave3.style.fill = randomColor2_shade_darker;
    wave4.style.fill = randomColor2_shade_darkest;
    displayColor1.style.background = randomColor1;
    displayColor1.innerHTML = `<h2>${(randomColor1 = Color(randomColor1).hex())}</h2>`;
    displayColor2.style.background = randomColor2;
    displayColor2.innerHTML = `<h2>${randomColor2}</h2>`;
    displayColor3.style.background = randomColor2_shade_dark;
    displayColor3.innerHTML = `<h2>${randomColor2_shade_dark}</h2>`;
    displayColor4.style.background = randomColor2_shade_darker;
    displayColor4.innerHTML = `<h2>${randomColor2_shade_darker}</h2>`;
    displayColor5.style.background = randomColor2_shade_darkest;
    displayColor5.innerHTML = `<h2>${randomColor2_shade_darkest}</h2>`;
}

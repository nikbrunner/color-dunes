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
    // ! Event listener
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

    // ! Measurements
    ballWidth = ball.clientWidth;
    ballHeight = ball.clientHeight;
    containerEdgeLeft = container.clientLeft;
    containerEdgeTop = container.clientTop;
    containerEdgeRight = container.offsetWidth;
    containerEdgeBottom = container.offsetHeight;

    // ! Generate a new color, create shades and paint everything
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

    // ! Define min/max border radius values for the output
    let minBorderRadius = 25;
    let maxBorderRadius = 75;

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
    displayColor1.style.borderRadius = randomBorderRadius(minBorderRadius, maxBorderRadius);
    displayColor1.innerHTML = `<span>${(randomColor1 = Color(randomColor1).hex())}</span>`;
    displayColor2.style.background = randomColor2;
    displayColor2.style.borderRadius = randomBorderRadius(minBorderRadius, maxBorderRadius);
    displayColor2.innerHTML = `<span>${randomColor2}</span>`;
    displayColor3.style.background = randomColor2_shade_dark;
    displayColor3.style.borderRadius = randomBorderRadius(minBorderRadius, maxBorderRadius);
    displayColor3.innerHTML = `<span>${randomColor2_shade_dark}</span>`;
    displayColor4.style.background = randomColor2_shade_darker;
    displayColor4.style.borderRadius = randomBorderRadius(minBorderRadius, maxBorderRadius);
    displayColor4.innerHTML = `<span>${randomColor2_shade_darker}</span>`;
    displayColor5.style.background = randomColor2_shade_darkest;
    displayColor5.style.borderRadius = randomBorderRadius(minBorderRadius, maxBorderRadius);
    displayColor5.innerHTML = `<span>${randomColor2_shade_darkest}</span>`;
}

function copyColor() {
    // ! Really important is to use the event property to always use
    // ! the currently targeted box
    // let currentColorValue = .textContent;
    // const tempInput = document.createElement('input');
    // document.body.appendChild(tempInput);
    // currentColorValue = currentColorValue.toLowerCase();
    // tempInput.value = currentColorValue;
    // tempInput.select();
    // document.execCommand('copy');
    // document.body.removeChild(tempInput);
}

function randomBorderRadius(min, max) {
    let borderRadius = `${randomBorderRadiusValue(min, max)}% ${randomBorderRadiusValue(
        min,
        max
    )}% ${randomBorderRadiusValue(min, max)}% ${randomBorderRadiusValue(
        min,
        max
    )}% / ${randomBorderRadiusValue(min, max)}% ${randomBorderRadiusValue(
        min,
        max
    )}% ${randomBorderRadiusValue(min, max)}% ${randomBorderRadiusValue(min, max)}%`;
    return borderRadius;
}

function randomBorderRadiusValue(min, max) {
    let randomBorderRadiusValue = Math.floor(Math.random() * max);
    if (randomBorderRadiusValue < min) {
        let diff = min - randomBorderRadiusValue;
        randomBorderRadiusValue = randomBorderRadiusValue + diff;
        return randomBorderRadiusValue;
    } else {
        return randomBorderRadiusValue;
    }
}

console.log(randomBorderRadius(40, 55));

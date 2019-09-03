// todo function to add eventlisteners
// todo remove eventlisteners when message is shown
// todo input fields for lightness and saturation (3 Presets)
// ?    Sometimes the event listeners get a little stuck

// ! Import NPM 'ColorJS' Package
import ColorJS from 'color';

// ! UI Elements Constants
// UI | Header
const logo = document.querySelector('.brand__logo');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

// UI | Container
const container = document.querySelector('.container');
const ball = document.querySelector('.ball');
const message = document.querySelector('.message');

// UI | Palette
const palette = document.querySelector('.palette');
const paletteColor1 = document.querySelector('.palette__color--1');
const paletteColor2 = document.querySelector('.palette__color--2');
const paletteColor3 = document.querySelector('.palette__color--3');
const paletteColor4 = document.querySelector('.palette__color--4');
const paletteColor5 = document.querySelector('.palette__color--5');
const paletteColor1Value = document.querySelector('.palette__color__value--1');
const paletteColor2Value = document.querySelector('.palette__color__value--2');
const paletteColor3Value = document.querySelector('.palette__color__value--3');
const paletteColor4Value = document.querySelector('.palette__color__value--4');
const paletteColor5Value = document.querySelector('.palette__color__value--5');
const paletteColorAllValues = Array.prototype.slice.call(
    document.querySelectorAll('.palette__color__value')
);

// UI | Footer
const footer = document.querySelector('footer');
const footerLinks = Array.prototype.slice.call(
    document.getElementsByClassName('footer__link')
);

// UI | Waves
const wave1 = document.querySelector('.wave1__path');
const wave2 = document.querySelector('.wave2__path');
const wave3 = document.querySelector('.wave3__path');
const wave4 = document.querySelector('.wave4__path');

// ! Initialize Variables
// Variables | Measurements
let ballWidth;
let ballHeight;
let ballEdgeLeft, ballEdgeTop, ballEdgeRight, ballEdgeBottom;
let containerEdgeLeft;
let containerEdgeTop;
let containerEdgeRight;
let containerEdgeBottom;

// Variables | Initial Declarations
let randomColor1,
    randomColor2,
    randomColor2_shade_dark,
    randomColor2_shade_darker,
    randomColor2_shade_darkest;
let logoColor1, logoColor2, logoColor3;
// let footerLinkColor;

// Variables | Initial Values and Switches
let steps = 3;
let currPosX = 0;
let currPosY = 0;
let IntervalX = 0;
let IntervalY = 0;
let leftToRight = true;
let topToBottom = true;
let ballIsMoving = false;

// ! Initialize Function
function init() {
    // init() | Event listener
    window.addEventListener('resize', () => {
        measureContainer();
    });
    document.body.onkeydown = e => {
        if (e.keyCode == 32 && ballIsMoving == false) {
            startMove();
        } else {
            stopMove();
        }
    };
    paletteColorAllValues.forEach(paletteColorValue => {
        paletteColorValue.addEventListener('click', copyColor);
    });
    btnStart.addEventListener('click', startMove);
    btnStop.addEventListener('click', stopMove);

    // init() | Measurements
    measureContainer();

    // init() | Generate a new color, create shades and paint everything
    generateModifyAndPaint();
}

init();

function startMove() {
    startMoveX();
    startMoveY();
    showBall();
    ballIsMoving = true;
}

function stopMove() {
    stopMoveX();
    stopMoveY();
    showDisplay();
    ballIsMoving = false;
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

function randomColorHSL(
    saturationMin,
    saturationMax,
    lightnessMin,
    lightnessMax
) {
    // ! hsl(hue, saturation, lightness)
    //   hue 	            Defines a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue
    //   saturation 	    Defines the saturation; 0% is a shade of gray and 100% is the full color (full saturation)
    //   lightness 	        Defines the lightness; 0% is black, 50% is normal, and 100% is white

    // ! Generate Hue
    let hue = Math.floor(Math.random() * 360);

    // ! Generate Saturation
    let saturation = Math.floor(Math.random() * saturationMax);
    if (saturation < saturationMin) {
        saturation += saturationMin;
    }

    // ! Generate Lightness
    let lightness = Math.floor(Math.random() * lightnessMax);
    if (lightness < lightnessMin) {
        lightness += lightnessMin;
    }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateModifyAndPaint() {
    // ! Generate colors
    randomColor1 = randomColorHSL(35, 100, 50, 85);
    randomColor2 = ColorJS(randomColor1)
        .rotate(180)
        .hex();

    // ! Create Shades of randomColor2
    // Shades | Palette
    randomColor2_shade_dark = ColorJS(randomColor2)
        .darken(0.25)
        .hex();
    randomColor2_shade_darker = ColorJS(randomColor2)
        .darken(0.5)
        .hex();
    randomColor2_shade_darkest = ColorJS(randomColor2)
        .darken(0.75)
        .hex();
    // Shades | Logo
    logoColor1 = randomColor2_shade_dark;
    logoColor2 = ColorJS(logoColor1)
        .rotate(15)
        .lighten(0.25);
    logoColor3 = ColorJS(randomColor1).lighten(0.3);
    // Shades | Footer
    // footerLinkColor = ColorJS(randomColor2).lighten(0.25);

    // ! Paint the walls
    document.body.style.background = randomColor1;
    logo.style.background = `-webkit-linear-gradient(360deg, ${logoColor1}, ${logoColor2})`;
    logo.style.textShadow = `0 0.2rem 0 ${logoColor3}`;
    btnStart.style.color = randomColor1;
    btnStop.style.color = randomColor2;
    ball.style.background = randomColor2;
    // footerLinks.forEach(footerLink => {
    //     footerLink.style.color = footerLinkColor;
    // });
    wave1.style.fill = randomColor2;
    wave2.style.fill = randomColor2_shade_dark;
    wave3.style.fill = randomColor2_shade_darker;
    wave4.style.fill = randomColor2_shade_darkest;
    paletteColor1.style.background = randomColor1;
    paletteColor2.style.background = randomColor2;
    paletteColor3.style.background = randomColor2_shade_dark;
    paletteColor4.style.background = randomColor2_shade_darker;
    paletteColor5.style.background = randomColor2_shade_darkest;

    // ! Display color values in the displays
    paletteColor1Value.innerHTML = `${(randomColor1 = ColorJS(
        randomColor1
    ).hex())}`;
    paletteColor2Value.innerHTML = `${randomColor2}`;
    paletteColor3Value.innerHTML = `${randomColor2_shade_dark}`;
    paletteColor4Value.innerHTML = `${randomColor2_shade_darker}`;
    paletteColor5Value.innerHTML = `${randomColor2_shade_darkest}`;
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
    message.innerHTML = `<p class="message__text">Copied <span class="message__color" style="background: ${copiedColor}">${copiedColor}</span> to your clipboard!`;
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
    footer.classList.add('show');
    footer.classList.remove('hide');
    message.classList.add('hide');
    message.classList.remove('show');
    message.innerHTML = '';
    message.style.zIndex = '90';

    // Show
    palette.classList.remove('hide');
    palette.classList.add('show');
}

function showBall() {
    // Hide
    palette.classList.remove('show');
    palette.classList.add('hide');
    footer.classList.add('hide');
    footer.classList.remove('show');
    message.classList.remove('show');
    message.classList.add('hide');
    message.innerHTML = '';
    message.style.zIndex = '90';

    // Show
    ball.classList.remove('hide');
    ball.classList.add('show');
}

function showMessage() {
    // Hide
    ball.classList.remove('show');
    ball.classList.add('hide');
    footer.classList.add('hide');
    footer.classList.remove('show');
    palette.classList.remove('show');
    palette.classList.add('hide');

    // Show
    message.classList.remove('hide');
    message.classList.add('show');
    message.style.zIndex = '110';
}

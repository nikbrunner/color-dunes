// todo input fields for lightness and saturation (3 Presets)

// ! Import NPM 'ColorJS' Package
import ColorJS from 'color';

// ! UI Elements Constants
// UI | Header
const logo = document.querySelector('.brand__logo');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

// UI | Settings
const satLow = document.getElementById('satLow');
const satMid = document.getElementById('satMid');
const satHigh = document.getElementById('satHigh');
const lightnessLow = document.getElementById('lightnessLow');
const lightnessMid = document.getElementById('lightnessMid');
const lightnessHigh = document.getElementById('lightnessHigh');

// UI | Container
const container = document.querySelector('.container');
const waveContainer = document.querySelector('.waveContainer');
const wrapper = document.querySelector('#wrapper');
const ball = document.querySelector('.ball');
const message = document.querySelector('.message');

// UI | Palette
const palette = document.querySelector('.palette');
const paletteColor1 = document.querySelector('.palette__color--1');
const paletteColor2 = document.querySelector('.palette__color--2');
const paletteColor3 = document.querySelector('.palette__color--3');
const paletteColor4 = document.querySelector('.palette__color--4');
const paletteColor5 = document.querySelector('.palette__color--5');
const paletteColorAll = Array.prototype.slice.call(
    document.querySelectorAll('.palette__color')
);

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
let logoColor1, logoColor2;

// Variables | App Values and Switches
let steps = 3;
let currPosX = 0;
let currPosY = 0;
let IntervalX = 0;
let IntervalY = 0;
let leftToRight = true;
let topToBottom = true;
let ballIsMoving = false;

// ! Initialize function
function init() {
    // Animate
    animateCSS(waveContainer, 'fadeIn', 'slower', 'delay-5s');
    animateCSS(wrapper, 'slideInDown', 'slow', 'delay-1s');

    // Add Event listener
    addInitialAndPermanentEventListener();
    addBtnStartEventListener();
    addBtnStopEventListener();
    checkWindowSizeAndAddEventListenerForPaletteColors();

    // Measurements
    measureContainer();

    // Generate a new color, create shades and paint everything
    generateModifyAndPaint();

    // Initially show the ball on startup
    showBall();

    // Toggle switch to false
    ballIsMoving = false;
}

init();

// ! Ball moving functions
function startMove() {
    startMoveX();
    startMoveY();
    showBall();
    ballIsMoving = true;
}

function stopMove() {
    stopMoveX();
    stopMoveY();
    showPalette();
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

// ! Random color function
function randomColorHSL(
    saturationMin,
    saturationMax,
    lightnessMin,
    lightnessMax
) {
    //   hsl(hue, saturation, lightness)
    //   hue 	            Defines a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue
    //   saturation 	    Defines the saturation; 0% is a shade of gray and 100% is the full color (full saturation)
    //   lightness 	        Defines the lightness; 0% is black, 50% is normal, and 100% is white

    // Generate Hue
    let hue = Math.floor(Math.random() * 360);

    // Generate Saturation
    let saturation =
        Math.floor(Math.random() * (saturationMax - saturationMin + 1)) +
        saturationMin;

    // Generate Lightness
    let lightness =
        Math.floor(Math.random() * (lightnessMax - lightnessMin + 1)) +
        lightnessMin;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// ! Generate colors and assign them to the elements
function generateModifyAndPaint() {
    // Read checkboxes and generate randomColor1 appropriately
    switch (true) {
        // ! satLow
        case satLow.checked && lightnessLow.checked:
            randomColor1 = randomColorHSL(15, 35, 15, 35);
            break;

        case satLow.checked && lightnessMid.checked:
            randomColor1 = randomColorHSL(15, 35, 35, 75);
            break;

        case satLow.checked && lightnessHigh.checked:
            randomColor1 = randomColorHSL(15, 35, 75, 95);
            break;

        // ! satMid
        case satMid.checked && lightnessLow.checked:
            randomColor1 = randomColorHSL(35, 75, 15, 35);
            break;

        case satMid.checked && lightnessMid.checked:
            randomColor1 = randomColorHSL(35, 75, 35, 75);
            break;

        case satMid.checked && lightnessHigh.checked:
            randomColor1 = randomColorHSL(23, 75, 75, 95);

            break;

        // ! satHigh
        case satHigh.checked && lightnessLow.checked:
            randomColor1 = randomColorHSL(75, 95, 15, 35);
            break;

        case satHigh.checked && lightnessMid.checked:
            randomColor1 = randomColorHSL(75, 95, 35, 75);
            break;

        case satHigh.checked && lightnessHigh.checked:
            randomColor1 = randomColorHSL(75, 95, 75, 95);
            break;

        // ! default
        default:
            randomColor1 = randomColorHSL(35, 75, 35, 75);

            break;
    }

    // Generate colors
    randomColor2 = ColorJS(randomColor1)
        .rotate(180)
        .hex();

    // Create Shades of randomColor2
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
    logoColor1 = randomColor2;
    logoColor2 = randomColor2_shade_dark;

    // Paint the walls
    document.body.style.background = randomColor1;
    logo.style.background = `-webkit-linear-gradient(360deg, ${logoColor1}, ${logoColor2})`;
    btnStart.style.color = randomColor1;
    btnStop.style.color = randomColor2;
    ball.style.background = randomColor2;

    wave1.style.fill = randomColor2;
    wave2.style.fill = randomColor2_shade_dark;
    wave3.style.fill = randomColor2_shade_darker;
    wave4.style.fill = randomColor2_shade_darkest;
    paletteColor1.style.background = randomColor1;
    paletteColor2.style.background = randomColor2;
    paletteColor3.style.background = randomColor2_shade_dark;
    paletteColor4.style.background = randomColor2_shade_darker;
    paletteColor5.style.background = randomColor2_shade_darkest;

    // Display color values in the displays
    paletteColor1Value.innerHTML = `${(randomColor1 = ColorJS(
        randomColor1
    ).hex())}`;
    paletteColor2Value.innerHTML = `${randomColor2}`;
    paletteColor3Value.innerHTML = `${randomColor2_shade_dark}`;
    paletteColor4Value.innerHTML = `${randomColor2_shade_darker}`;
    paletteColor5Value.innerHTML = `${randomColor2_shade_darkest}`;
}

// ! Copy color function
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
    animateCSS(message, 'bounceInDown', 'fast');
    setTimeout(showPalette, 2750);
}

// ! Measure container function
function measureContainer() {
    ballWidth = ball.clientWidth;
    ballHeight = ball.clientHeight;
    containerEdgeLeft = container.clientLeft;
    containerEdgeTop = container.clientTop;
    containerEdgeRight = container.offsetWidth;
    containerEdgeBottom = container.offsetHeight;
}

// ! Show palette function
function showPalette() {
    // Hide
    ball.classList.add('hide');
    ball.classList.remove('show');
    footer.classList.add('show');
    footer.classList.remove('hide');
    message.classList.add('hide');
    message.classList.remove('show');
    message.innerHTML = '';
    message.style.zIndex = '90';

    // Animations
    animateCSS(paletteColor1, 'slideInLeft', 'faster');
    animateCSS(paletteColor2, 'slideInRight', 'faster');
    animateCSS(paletteColor3, 'slideInLeft', 'faster');
    animateCSS(paletteColor4, 'slideInRight', 'faster');
    animateCSS(paletteColor5, 'slideInLeft', 'faster');
    animateCSS(footer, 'slideInDown', 'faster');

    // Show
    palette.classList.remove('hide');
    palette.classList.add('show');
}

// ! Show ball function
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

// ! Show message function
function showMessage() {
    // Event listener
    removeBtnStartEventListener();
    removeBtnStopEventListener();

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

    // Show palette after a timeout
    setTimeout(function() {
        addBtnStartEventListener();
        addBtnStopEventListener();
    }, 2750);
}

// ! Animate CSS function
function animateCSS(element, animationName, speed, callback) {
    element.classList.add('animated', animationName, speed);

    function handleAnimationEnd() {
        element.classList.remove('animated', animationName, speed);
        element.removeEventListener('animationend', handleAnimationEnd);
        if (typeof callback === 'function') callback();
    }

    element.addEventListener('animationend', handleAnimationEnd);
}

// ! Add initial and permanent event listener function
function addInitialAndPermanentEventListener() {
    window.addEventListener('resize', () => {
        measureContainer();
    });
}

function checkWindowSizeAndAddEventListenerForPaletteColors() {
    if (window.mobileAndTabletcheck === true) {
        container.style.background = 'red';
        paletteColorAllValues.forEach(paletteColorValue => {
            // paletteColorValue.removeEventListener('click', copyColor);
        });

        console.log(
            'Mobile Browser detected! NO Event listeners for palette bars added!'
        );
    } else {
        container.style.background = 'green';
        paletteColorAllValues.forEach(paletteColorValue => {
            paletteColorValue.addEventListener('click', copyColor);
        });
        console.log(
            'Desktop Browser detected! Event listeners for palette bars added!'
        );
    }
}

function addBtnStartEventListener() {
    btnStart.addEventListener('click', startMove);
}

function removeBtnStartEventListener() {
    btnStart.removeEventListener('click', startMove);
}

function addBtnStopEventListener() {
    btnStop.addEventListener('click', stopMove);
}

function removeBtnStopEventListener() {
    btnStop.removeEventListener('click', stopMove);
}

function addSpacebarStartEventListener() {
    document.body.onkeydown = e => {
        if (e.keyCode == 32 && ballIsMoving == false) {
            startMove();
        } else {
            stopMove();
        }
    };
}

// ! Detect Mobile Browser
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

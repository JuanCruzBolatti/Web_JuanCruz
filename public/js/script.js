// Usuals

// Cursor
const cursor = document.querySelector(".cursor-ball");
const circle = document.querySelector("#circle");
const smallHoverable = document.querySelectorAll(".navbar a, .work a, .contact a");
const hoverable = document.querySelectorAll("a");

hoverable.forEach(item => {
  item.addEventListener("mouseenter", onMouseHover);
  item.addEventListener("mouseleave", onMouseHoverOut);
});

smallHoverable.forEach(item => {
  item.addEventListener("mouseenter", onMouseHoverNavbar);
  item.addEventListener("mouseleave", onMouseHoverOutNavbar);
});

function onMouseHover() {
  cursor.style.transform = "scale(4)";
  circle.style.fill = "none";
  circle.style.stroke = "white";
  circle.style.strokeWidth = ".4px";
}
function onMouseHoverOut() {
  cursor.style.transform = "scale(1)";
  circle.style.fill = "#fff";
  circle.style.stroke = "transparent";
  circle.style.strokeWidth = "0";
}
function onMouseHoverNavbar() {
  cursor.style.transform = "scale(0.8)";
  circle.style.fill = "#fff";
  circle.style.stroke = "transparent";
  circle.style.strokeWidth = "0";
}
function onMouseHoverOutNavbar() {
  cursor.style.transform = "scale(1)";
  circle.style.fill = "#fff";
  circle.style.stroke = "transparent";
  circle.style.strokeWidth = "0";
}

document.addEventListener('mousedown', event => {
  if (event.button === 0) {
    cursor.style.transform = "scale(0.5)";
  }
});

document.addEventListener('mouseup', event => {
  if (event.button === 0) { 
    cursor.style.transform = "scale(1)";
  }
});

// Background Bubble
const bubble = document.querySelector('.background-bubble');

document.onmousemove = event => {
  const { clientX, clientY } = event;

  bubble.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 2000, fill: 'forwards' });

  cursor.style.left = (clientX - cursor.offsetWidth / 2) + 'px';
  cursor.style.top = (clientY - cursor.offsetHeight / 2) + 'px';
}

// Logo Display
var logos = document.querySelector('.logo').getElementsByTagName('svg');
var logos = Array.from(logos);

function logoDisplay(number) {
  logos.forEach((logo) => {
    logo.classList.remove("logo-displayed");
  });

  logos[number].classList.add('logo-displayed');
}

// Corner Dispay
var corners = document.querySelector('.corner').getElementsByTagName('div');
var corners = Array.from(corners);

function cornerDisplay(number) {
  if (window.innerWidth > 768) {
    corners.forEach((corner) => {
      corner.classList.remove("corner-displayed");
    });

    corners[number].classList.add('corner-displayed');
  }
}

// Navbar Display
function navbarDisplay(number) {
  logoDisplay(number);
  cornerDisplay(number);
}

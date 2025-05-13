// Cursor
const cursor = document.querySelector(".cursor-ball");
const circle = document.querySelector("#circle");
const smallHoverable = document.querySelectorAll(".navbar a, .contact a");
const bigHoverable = document.querySelectorAll(".card");
const hoverable = document.querySelectorAll("a");

hoverable.forEach(item => {
  item.addEventListener("mouseenter", onMouseHover);
  item.addEventListener("mouseleave", onMouseHoverOut);
});

smallHoverable.forEach(item => {
  item.addEventListener("mouseenter", onMouseHoverNavbar);
  item.addEventListener("mouseleave", onMouseHoverOutNavbar);
});

bigHoverable.forEach(item => {
  item.addEventListener("mouseenter", onMouseHoverCards);
  item.addEventListener("mouseleave", onMouseHoverOutCards);
});

function onMouseHover() {
  cursor.style.transform = "scale(5)";
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
function onMouseHoverCards() {
  cursor.style.transform = "scale(2)";
  circle.style.fill = "#fff";
  circle.style.stroke = "transparent";
  circle.style.strokeWidth = "0";
}
function onMouseHoverOutCards() {
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

  if (window.innerWidth > 768) {
    if (window.innerWidth > 1280 && bubble) {
      bubble.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 2000, fill: 'forwards' });
    }

    cursor.style.left = (clientX - cursor.offsetWidth / 2) + 'px';
    cursor.style.top = (clientY - cursor.offsetHeight / 2) + 'px';
  }
}

const bubble01 = bubble.querySelector("#bubble-01");
const bubble02 = bubble.querySelector("#bubble-02");
const bubble03 = bubble.querySelector("#bubble-03");

function changeColorBubble(color01, color02, color03) {
  bubble01.style.backgroundColor = `#${color01}`;
  bubble02.style.backgroundColor = `#${color02}`;
  bubble03.style.backgroundColor = `#${color03}`;
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

// Scroll Displays
const sections = document.querySelectorAll('section, footer');

const observerPc = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      switch (entry.target.id) {
        case 'Home':
          navbarDisplay(0);
          changeColorBubble('4a86b0', '5268b6', '7e52b4');
          break;
        case 'AboutMe':
          navbarDisplay(1);
          changeColorBubble('4a5fb0', '7352b6', 'b452a0');
          break;
        case 'WhatIDo':
          navbarDisplay(2);
          changeColorBubble('8e4ab0', 'b65297', 'b4525a');
          break;
        case 'Work':
          console.log('Work');
          navbarDisplay(3);
          changeColorBubble('52b48b', '52b0b4', '527ab4');
          break;
        case 'Knowledge':
          navbarDisplay(3);
          changeColorBubble('52b48b', '52b0b4', '527ab4');
          break;
        case 'Contact':
          navbarDisplay(4);
          changeColorBubble('528eb4', '5268b4', '5f52b4');
          break;
        default:
          navbarDisplay(2);
          changeColorBubble('b04aaa', '6952b6', '5289b4');
          break;
      }
    }
  });
}, { threshold: 0.2 });

const observerMobile = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      switch (entry.target.id) {
        case 'Home':
          navbarDisplay(0);
          changeColorBubble('4a86b0', '5268b6', '7e52b4');
          break;
        case 'AboutMe':
          changeColorBubble('4a5fb0', '7352b6', 'b452a0');
          break;
        case 'WhatIDo':
          changeColorBubble('b452a0', 'b4525e', 'b66e52');
          break;
        case 'Work':
          changeColorBubble('52b48b', '52b0b4', '527ab4');
          break;
        case 'Knowledge':
          changeColorBubble('52b48b', '52b0b4', '527ab4');
          break;
        case 'Contact':
          changeColorBubble('528eb4', '5268b4', '5f52b4');
          break;
        default:
          changeColorBubble('4a86b0', '5268b6', '7e52b4');
          break;
      }
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  if (window.innerWidth > 768) {
    observerPc.observe(section);
  } else {
    observerMobile.observe(section);
  }
});

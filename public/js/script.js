// Usuals

// Background Bubble
const bubble = document.querySelector('.background-bubble');

document.onmousemove = event => {
    const { clientX, clientY } = event;

    bubble.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, {duration: 2000, fill: 'forwards'});
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
var corners = document.querySelector('.corner').getElementsByTagName('*');
var corners = Array.from(corners);

function cornerDisplay(number) {
  corners.forEach((corner) => {
    corner.classList.remove("corner-displayed");
  });

  corners[number].classList.add('corner-displayed');
}

// Navbar Display
function navbarDisplay(number) {
  logoDisplay(number);
  cornerDisplay(number);
}
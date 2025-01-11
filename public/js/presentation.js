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

document.onmousemove = event => {
  const { clientX, clientY } = event;

  if (window.innerWidth > 768) {
    cursor.style.left = (clientX - cursor.offsetWidth / 2) + 'px';
    cursor.style.top = (clientY - cursor.offsetHeight / 2) + 'px';
  }
}

// Color Selector
window.addEventListener('load', () => {
  const colorSelector = document.querySelectorAll(".color-selector");

  colorSelector.forEach(selector => {
    selector.addEventListener('click', function () {
      const selected = this.id;
      console.log(selected);
      document.querySelector("#brand-palette-background").className = selected;
    });
  });
});


// Scroll Displays
const sections = document.querySelectorAll('section');
const navButtons = document.querySelector('.pres-navbar');
var sectionCount = 0;

function navbarButtonDisplay(id) {
  const button = navButtons.querySelector(`#${id}`);
  button.classList.remove("button-hidden");
}

const observerPc = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navbarButtonDisplay(entry.target.id);
      sectionCount++;
      if (sectionCount == 3) {
        navbarButtonDisplay('buttonToTop');
      }
    }
  });
}, { threshold: 0.8 });

const observerMobile = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navbarButtonDisplay(entry.target.id);
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
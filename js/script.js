"use strict";

//////////////////////////////
// Navigation functionality //
//////////////////////////////

const navAbout = document.querySelector(".btn-navigation-about");
const navProjects = document.querySelector(".btn-navigation-projects");
const aboutSection = document.querySelector(".about-me-section");
const projectsSection = document.querySelector(".projects-section");
const navEfect = document.querySelector(".nav-line");

navAbout.addEventListener("click", function (e) {
  navEfect.classList.add("about");
  navEfect.classList.remove("projects");

  navEfect.style.width = `${e.currentTarget.getBoundingClientRect().width}px`;

  aboutSection.classList.remove("carrousel-hidden");
  aboutSection.classList.remove("container-left");
  projectsSection.classList.add("carrousel-hidden");
  projectsSection.classList.add("container-right");
});

navProjects.addEventListener("click", function (e) {
  navEfect.classList.add("projects");
  navEfect.classList.remove("about");

  navEfect.style.width = `${e.currentTarget.getBoundingClientRect().width}px`;

  projectsSection.classList.remove("container-right");
  projectsSection.classList.remove("carrousel-hidden");
  aboutSection.classList.add("container-left");
  aboutSection.classList.add("carrousel-hidden");
});

//////////////////////////////
// Carrousell Useful Classes //
//////////////////////////////

function addRightClasses(slide) {
  slide.classList.add("element-right", "element-showed");
}

function addLeftClasses(slide) {
  slide.classList.add("element-left", "element-showed");
}

function removeAllClasses(slide) {
  slide.classList.remove("element-left", "element-showed", "element-right");
}

// Drag functionality

let startX;
let currentIndex = 0;

const calcIndexSlideAbout = (mouseDrag) => {
  if (mouseDrag > 50) {
    if (slideIndexAbout == slidesAbout.length - 1) {
      slideIndexAbout = 0;
    } else {
      slideIndexAbout++;
    }
  } else if (mouseDrag < -50) {
    if (slideIndexAbout == 0) {
      slideIndexAbout = slidesAbout.length - 1;
    } else {
      slideIndexAbout--;
    }
  }

  updateSlideClassesAbout();
};

const calcIndexSlideProjects = (mouseDrag) => {
  if (mouseDrag > 50) {
    if (slideIndexProjects == slidesProjects.length - 1) {
      slideIndexProjects = 0;
    } else {
      slideIndexProjects++;
    }
  } else if (mouseDrag < -50) {
    if (slideIndexProjects == 0) {
      slideIndexProjects = slidesProjects.length - 1;
    } else {
      slideIndexProjects--;
    }
  }

  updateSlideClassesProjects();
};

let disableDrag = function (boxSlide) {
  boxSlide.removeEventListener("mousedown", initialPositionMouse);
  boxSlide.removeEventListener("mouseup", finalPositionMouse);

  setTimeout(function () {
    boxSlide.addEventListener("mousedown", initialPositionMouse);
    boxSlide.addEventListener("mouseup", finalPositionMouse);
  }, 500);
};

let initialPositionMouse = (e) => {
  startX = 0;
  startX = e.pageX;
};

let finalPositionMouse = (e) => {
  let endX = 0;
  let mouseDragDistance = 0;

  endX = e.pageX;
  mouseDragDistance = endX - startX;

  if (e.currentTarget == boxSlidesAbout) {
    calcIndexSlideAbout(mouseDragDistance);
  }

  if (e.currentTarget == boxSlidesProjects) {
    calcIndexSlideProjects(mouseDragDistance);
  }

  disableDrag(e.currentTarget);
};

//End

//End

//////////////////////////////////
// Carrousell functionality ABOUT //
//////////////////////////////////

const boxSlidesAbout = document.querySelector(".box-slides-about");
const slidesAbout = document.querySelectorAll(".box-slide-about");
const btnRightAbout = document.querySelector(".btn-right-about");
const btnLeftAbout = document.querySelector(".btn-left-about");

let slideIndexAbout = 0;

//Drag functionallity
boxSlidesAbout.addEventListener("mousedown", initialPositionMouse);
boxSlidesAbout.addEventListener("mouseup", finalPositionMouse);

let disableButton1s = function (btn) {
  btn.disabled = true;

  setTimeout(function () {
    btn.disabled = false;
  }, 500);
};

function updateSlideClassesAbout() {
  slidesAbout.forEach((element) => {
    removeAllClasses(element);
  });

  for (let index = 0; index < slidesAbout.length; index++) {
    const slide = slidesAbout[index];

    if (index === slideIndexAbout) {
      slide.classList.add("element-showed");

      if (index === 0) {
        addLeftClasses(slidesAbout[slidesAbout.length - 1]);
        addRightClasses(slidesAbout[index + 1]);
      } else if (index === slidesAbout.length - 1) {
        addLeftClasses(slidesAbout[index - 1]);
        addRightClasses(slidesAbout[0]);
      } else {
        addLeftClasses(slidesAbout[index - 1]);
        addRightClasses(slidesAbout[index + 1]);
      }

      break;
    }
  }
}

function nextSlideAbout() {
  disableButton1s(btnRightAbout);

  slideIndexAbout++;
  if (slideIndexAbout >= slidesAbout.length) {
    slideIndexAbout = 0;
  }
  updateSlideClassesAbout();
}

function previousSlideAbout() {
  disableButton1s(btnLeftAbout);

  slideIndexAbout--;
  if (slideIndexAbout < 0) {
    slideIndexAbout = slidesAbout.length - 1;
  }
  updateSlideClassesAbout();
}

btnRightAbout.addEventListener("click", nextSlideAbout);
btnLeftAbout.addEventListener("click", previousSlideAbout);

updateSlideClassesAbout();

if (!boxSlidesAbout.classList.contains("carrousel-hidden")) {
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        previousSlideAbout();
        break;
      case "ArrowRight":
        nextSlideAbout();
        break;
    }
  });
}

//////////////////////////////////
// Carrousell functionality PROJECTS //
//////////////////////////////////

const boxSlidesProjects = document.querySelector(".box-slides-projects");
const slidesProjects = document.querySelectorAll(".box-slide-projects");
const btnRightProjects = document.querySelector(".btn-right-projects");
const btnLeftProjects = document.querySelector(".btn-left-projects");

let slideIndexProjects = 0;

//Drag functionallity
boxSlidesProjects.addEventListener("mousedown", initialPositionMouse);
boxSlidesProjects.addEventListener("mouseup", finalPositionMouse);

function updateSlideClassesProjects() {
  slidesProjects.forEach((element) => {
    removeAllClasses(element);
  });

  for (let index = 0; index < slidesProjects.length; index++) {
    const slide = slidesProjects[index];

    if (index === slideIndexProjects) {
      slide.classList.add("element-showed");

      if (index === 0) {
        addLeftClasses(slidesProjects[slidesProjects.length - 1]);
        addRightClasses(slidesProjects[index + 1]);
      } else if (index === slidesProjects.length - 1) {
        addLeftClasses(slidesProjects[index - 1]);
        addRightClasses(slidesProjects[0]);
      } else {
        addLeftClasses(slidesProjects[index - 1]);
        addRightClasses(slidesProjects[index + 1]);
      }

      break;
    }
  }
}

function nextSlideProjects() {
  disableButton1s(btnRightProjects);

  slideIndexProjects++;
  if (slideIndexProjects >= slidesProjects.length) {
    slideIndexProjects = 0;
  }
  updateSlideClassesProjects();
}

function previousSlideProjects() {
  disableButton1s(btnLeftProjects);

  slideIndexProjects--;
  if (slideIndexProjects < 0) {
    slideIndexProjects = slidesProjects.length - 1;
  }
  updateSlideClassesProjects();
}

btnRightProjects.addEventListener("click", nextSlideProjects);
btnLeftProjects.addEventListener("click", previousSlideProjects);

if (!boxSlidesProjects.classList.contains("carrousel-hidden")) {
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        previousSlideProjects();
        break;
      case "ArrowRight":
        nextSlideProjects();
        break;
    }
  });
}

updateSlideClassesProjects();

//End

//////////////////////////////
// Dark-mode functionality //
//////////////////////////////

const themeToggle = document.getElementById("theme-toggle");
document.documentElement.style.setProperty("--dark-color", "#080202");

themeToggle.addEventListener("click", function () {
  if (
    document.documentElement.style.getPropertyValue("--dark-color") == "#080202"
  ) {
    ativarModoClaro();
  } else {
    ativarModoNoturno();
  }
});

function ativarModoNoturno() {
  document.body.classList.remove("modo-claro");
  document.documentElement.style.setProperty("--dark-color", "#080202");
  document.documentElement.style.setProperty("--white-color", "#fefbfc");
}

function ativarModoClaro() {
  document.body.classList.add("modo-claro");

  document.documentElement.style.setProperty("--dark-color", "#fefbfc");
  document.documentElement.style.setProperty("--white-color", "#080202");
}

//End

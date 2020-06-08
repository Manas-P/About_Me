//Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloaderFinish");
});

// To Top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//Hide and Show Top Button
$(window).scroll(function () {
  if ($(window).scrollTop() > 600) {
    $("#top").fadeIn();
  } else {
    $("#top").fadeOut();
  }
});

//Sound on Top Button
var bubble = new Audio();
bubble.src = "./mp3/bubble.mp3";

AOS.init();

//Skill Bar
$(function () {
  $(".circlechart").circlechart();
});

/*==================
         Game
  =================*/

const game = () => {
  let yScore = 0;
  let mScore = 0;
  const match = document.querySelector(".match");
  const result = document.querySelector(".result");
  const reStartBtn = document.querySelector(".result button");
  var start = new Audio("./mp3/start.mp3");

  const startGame = () => {
    const playButton = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");

    playButton.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");

      start.play();
    });
  };

  const winner = () => {
    const finalResult = document.querySelector(".finalResult");
    if (yScore == 5 || mScore == 5) {
      match.classList.remove("fadeIn");
      match.classList.add("fadeOut");
      result.classList.remove("fadeOut");
      result.classList.add("fadeIn");
      var win = new Audio("./mp3/winner.mp3");
      win.play();
      if (yScore == 5) {
        finalResult.textContent = "Congrats, You are the Winner";
      } else {
        finalResult.textContent = "Manas is the Winner";
      }
    }

    reStartBtn.addEventListener("click", () => {
      yScore = 0;
      mScore = 0;
      result.classList.remove("fadeIn");
      result.classList.add("fadeOut");
      match.classList.add("fadeIn");
      updateScore();

      start.play();
    });
  };

  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const yourHand = document.querySelector(".yourHand");
    const myHand = document.querySelector(".myHand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const myOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const myNumber = Math.floor(Math.random() * 3);
        const myChoice = myOptions[myNumber];

        setTimeout(() => {
          compareHands(this.textContent, myChoice);

          yourHand.src = `./images/${this.textContent}.png`;
          myHand.src = `./images/${myChoice}.png`;
        }, 950);

        yourHand.style.animation = "shakeYou 1s ease";
        myHand.style.animation = "shakeMy 1s ease";
      });
    });
  };

  const updateScore = () => {
    const yourScore = document.querySelector(".yourScore p");
    const myScore = document.querySelector(".myScore p");
    yourScore.textContent = yScore;
    myScore.textContent = mScore;
    winner();
  };

  const compareHands = (yourChoice, myChoice) => {
    const winner = document.querySelector(".winner");

    if (yourChoice === myChoice) {
      winner.textContent = "It is a Tie";
      return;
    }

    if (yourChoice === "rock") {
      if (myChoice === "scissors") {
        winner.textContent = "You Wins";
        yScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Manas Wins";
        mScore++;
        updateScore();
        return;
      }
    }

    if (yourChoice === "paper") {
      if (myChoice === "scissors") {
        winner.textContent = "Manas Wins";
        mScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "You Wins";
        yScore++;
        updateScore();
        return;
      }
    }

    if (yourChoice === "scissors") {
      if (myChoice === "rock") {
        winner.textContent = "Manas Wins";
        mScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "You Wins";
        yScore++;
        updateScore();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();

const play = () => {
  var game = new Audio("./mp3/game.mp3");
  game.play();
};

/*
============================================================
  JavaScript for Navigation Bar for Mobile Responsive Start
============================================================
*/
// Declaring Variables
const nav_btn = document.querySelector(".nav_btn"); // Responsive Navigation Button
const nav = document.querySelector(".navLinks"); // Drawer
const navLinks = document.querySelectorAll(".navLinks li"); // Drawer Menu List
const logoContainer = document.querySelector(".logoContainer");

//For loop to select each list since we can't pass muliple values on EventListener
for (eachLi of navLinks) {
  eachLi.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    nav.classList.remove("nav-active");
    nav_btn.classList.toggle(`toggle`);
    logoContainer.classList.toggle("fixed");
    logoContainer.classList.remove("fixed");
  });
}

// Navigation Button Click Event
nav_btn.addEventListener("click", () => {
  nav.classList.toggle("nav-active"); //Calling Drawer
  nav_btn.classList.toggle(`toggle`); //nav Button Animation
  logoContainer.classList.toggle("fixed");

  //To Prevent Scroll for Drawer on Mobile Responsive
  nav.addEventListener(
    "touchmove",
    (nav) => {
      nav.preventDefault();
    },
    false
  );
});

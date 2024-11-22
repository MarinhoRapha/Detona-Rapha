"use strict";

var state = {
  view: {
    quadrado: document.querySelectorAll(".quadrado"),
    inimigo: document.querySelector(".inimigo"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score")
  },
  value: {
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
    gameVelocity: 1000,
    hitPosition: 0,
    resultado: 0,
    timeAtual: 60
  }
};

function random() {
  state.view.quadrado.forEach(function (square) {
    square.classList.remove('inimigo');
  });
  var randomNumber = Math.floor(Math.random() * 9);
  var randomSquare = state.view.quadrado[randomNumber];
  randomSquare.classList.add('inimigo');
  state.value.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.value.timerId = setInterval(random, state.value.gameVelocity);
}

function click() {
  state.view.quadrado.forEach(function (square) {
    square.addEventListener('click', function () {
      if (square.id === state.value.hitPosition) {
        state.value.resultado++;
        state.view.score.textContent = state.value.resultado;
        state.value.hitPosition = null;
        sound();
      }
    });
  });
}

;

function sound() {
  var audio = new Audio('./sounds/hit.m4a');
  audio.volume = 0.1;
  audio.play();
}

function countDown() {
  state.value.timeAtual--;
  state.view.timeLeft.textContent = state.value.timeAtual;

  if (state.value.timeAtual <= 0) {
    clearInterval(state.value.countDownTimerId);
    clearInterval(state.value.timerId);
    alert('Gamer Over!!! O seu resultado foi: ' + state.value.resultado);
  }
}

function iniciar() {
  moveEnemy();
  click();
}

;
iniciar();
import GSAP from 'gsap'
"use strict";

const dur = 5;
document.querySelectorAll('.about__question__wrapper').forEach(ticker => {
  // Get the initial size of the ticker
  const totalDistance = $(ticker).width(); // Position the ticker

  GSAP.set(ticker, {
    yPercent: -50
  }); // Clone the first item and add it to the end

  $(ticker).append($(ticker.querySelector(".about__title__question")).clone()); // Get all of the items

  const items = ticker.querySelectorAll(".about__title__question");
  const anim = GSAP.to(ticker, {
    duration: dur,
    x: -totalDistance,
    ease: "none",
    repeat: -1
  });
  let startPos;
  const wrap = GSAP.utils.wrap(0, 1);
  const draggable = new Draggable(ticker, {
    type: "x",
    trigger: ticker,
    throwProps: true,
    onPressInit: function () {
      anim.pause();
      startPos = this.x;
    },
    onDrag: function () {
      let prog = wrap(-this.x / totalDistance);
      anim.progress(prog);
    },
    onThrowUpdate: function () {
      let prog = wrap(-this.x / totalDistance);
      anim.progress(prog);
    },
    onThrowComplete: function () {
      anim.play();
      GSAP.fromTo(anim, {
        timeScale: 0
      }, {
        duration: 1,
        timeScale: 1,
        ease: "none"
      });
    }
  });
});

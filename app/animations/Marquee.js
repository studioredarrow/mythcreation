//import https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/utils/Draggable.min.js

import GSAP from 'gsap'
//import './draggable.js'

import Animation from 'classes/Animation'

//import Draggable from 'classes/Draggable'

import { calculate, split } from 'utils/text'

export default class Marquee extends Animation {
  constructor ({element, elements}) {
    super({
      element,
      elements
    })

  }

  animateIn () {

    const dur = 15;
    const wrap = GSAP.utils.wrap(0, 1);
    const ticker = document.querySelectorAll('.about__question__wrapper');
    //document.querySelectorAll('.js-ticker .wrapper').forEach(ticker => {
    document.querySelectorAll('.about__question__wrapper').forEach(ticker => {
      let x = ticker;
      let prop = window.getComputedStyle(ticker, null);

  //    console.log(`Width is ; ${ parseInt(prop.width, 10)   }`)
      totalDistance = parseInt(prop.width, 10);
      totalDistance = totalDistance / 2;

    //  console.log(`Total: ${totalDistance}`);
      let totalDistance;
      ticker.append((ticker.querySelector(".about__title__murtaza__question")).cloneNode(true));
  //    console.log(ticker)
      const item = ticker.querySelector(".about__title__murtaza__question");
  //    console.log(`totalDistance: ${totalDistance}`)
      let anim;
      let startPos;
      //
      // const draggable = new Draggable(ticker, {
      //   type: "y",
      //   trigger: ticker,
      //   throwProps: true,
      //   onPressInit: function() {
      //     anim.pause();
      //     startPos = this.y;
      //   },
      //   onDrag: function() {
      //     let prog = wrap(-this.y / totalDistance);
      //     anim.progress(prog);
      //   },
      //   onThrowUpdate: function() {
      //     let prog = wrap(-this.y / totalDistance);
      //     anim.progress(prog);
      //   },
      //   onThrowComplete: function() {
      //     anim.play();
      //     GSAP.fromTo(anim, {timeScale:0}, {duration: 2, timeScale:1, ease:"power1.in"});
      //   },
      // });

      this.timelineIn = GSAP.timeline({
        delay: 0.5
      })
      function resize(par) {

        if(anim) anim.play(0);
        let x = ticker;
        let prop = window.getComputedStyle(ticker, null);

        totalDistance = parseInt(prop.width, 10);
        totalDistance = totalDistance / 2;

        anim = GSAP.to(ticker, {
          duration: dur,
          y: totalDistance,
          ease: "none",
          repeat: -1,
          overwrite: true

        });
      }

      window.addEventListener('resize', resize);


      resize();

    })





  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {

  }

}




  //$(window).resize(resize);


// });

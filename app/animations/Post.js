import GSAP from 'gsap'

import Animation from 'classes/Animation'

import { calculate, split } from 'utils/text'

export default class Marqpost extends Animation {
  constructor ({element, elements}) {
    super({
      element,
      elements
    })

  }

  animateIn () {

    const dur = 20;
    const wrap = GSAP.utils.wrap(0, 1);
    const ticker = document.querySelectorAll('.post__title__wrapper');
    //document.querySelectorAll('.js-ticker .wrapper').forEach(ticker => {
    document.querySelectorAll('.post__title__wrapper').forEach(ticker => {
      let x = ticker;
      let prop = window.getComputedStyle(ticker, null);

  //    console.log(`Width is ; ${ parseInt(prop.width, 10)   }`)
      totalDistance = parseInt(prop.width, 10);
      //totalDistance = totalDistance / 2;

      console.log(`Total: ${totalDistance}`);
      let totalDistance;
      ticker.append((ticker.querySelector(".post__title")).cloneNode(true));
  //    console.log(ticker)
      const item = ticker.querySelector(".post__title");
  //    console.log(`totalDistance: ${totalDistance}`)
      let anim;
      let startPos;

      this.timelineIn = GSAP.timeline({
        delay: 0.5
      })
      function resize(par) {

        if(anim) anim.play(0);
        let x = ticker;
        let prop = window.getComputedStyle(ticker, null);

        totalDistance = parseInt(prop.width, 10);
        //totalDistance = totalDistance / 2;

        anim = GSAP.to(ticker, {
          duration: dur,
          x: -totalDistance,
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

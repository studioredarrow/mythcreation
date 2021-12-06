import GSAP from 'gsap'

import each from 'lodash/each'

import Animation from 'classes/Animation'

export default class Gallery extends Animation {
  constructor ({element, elements}) {
    super({
      element,
      elements
    })

  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })

    // GSAP.to(this.element, {
    //   duration: 1,
    //   scale: 0.1,
    //   y: 40,
    //   ease: "power1.inOut",
    //   stagger: {
    //     grid: [3,4],
    //     from: "end",
    //     axis: "x",
    //     amount: 1.5
    //   }
    // });
    this.timelineIn.fromTo(this.element, {
      autoAlpha: 0,
      scale: 0.1,
    }, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'power1.inOut',
      scale: 1,
      stagger: {
        grid: [3,4],
        from: 'end',
        axis: 'x',
        amount: 1.5
      }
    })
  }


  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

}

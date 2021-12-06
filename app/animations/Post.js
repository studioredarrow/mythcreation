import GSAP from 'gsap'

import each from 'lodash/each'

import Animation from 'classes/Animation'

import { calculate, split } from 'utils/text'

export default class Post extends Animation {
  constructor ({element, elements}) {
    super({
      element,
      elements: {
        wrapper: '.post__title__wrapper',
        text: '.post__title'
      }
    })
    split({ element: this.element, append: true})
    split({ element: this.element, append: true})

    this.elementLinesSpans = this.element.querySelectorAll('span span')

  }

  animateIn () {
    const dur = 5

    this.elements.wrapper = document.querySelector('.post__title__wrapper')
    this.elements.wrapper.width = this.elements.wrapper.clientWidth
    console.log(this.elements.wrapper.width)

    each(this.elements.wrapper, ticker => {

      // Get the initial size of the ticker
      const totalDistance = this.elements.wrapper.width // Position the ticker
      console.log(totalDistance)
      GSAP.set(ticker, {
        yPercent: -50
      }); // Clone the first item and add it to the end

      this.anim = GSAP.to(ticker, {
        duration: dur,
        x: -totalDistance,
        ease: "none",
        repeat: -1
      });
      let startPos
      this.wrap = GSAP.utils.wrap(0, 1)
      // let draggable = new Draggable(ticker, {
      //   type: "x",
      //   trigger: this.ticker,
      //   throwProps: true,
      //   onPressInit: function () {
      //     this.anim.pause(),
      //     startPos = this.x
      //   },
      //   onDrag: function () {
      //     this.prog = wrap(-this.x / totalDistance),
      //     this.anim.progress(this.prog)
      //   },
      //   onThrowUpdate: function () {
      //     this.prog = wrap(-this.x / totalDistance),
      //     this.anim.progress(this.prog)
      //   },
      //   onThrowComplete: function () {
      //     this.anim.play(),
      //     GSAP.fromTo(this.anim, {
      //       timeScale: 0
      //     }, {
      //       duration: 1,
      //       timeScale: 1,
      //       ease: "none"
      //     })
      //   }
      // })
    })
  }


  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementsLines = calculate(this.elementLinesSpans)
    //console.log(this.elementsLines)
  }

}

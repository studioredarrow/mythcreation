import GSAP from 'gsap'

import each from 'lodash/each'

import Animation from 'classes/Animation'

import { calculate, split } from 'utils/text'

export default class Title extends Animation {
  constructor ({element, elements}) {
    super({
      element,
      elements
    })

    // this.elementLinesSpans = GSAP.utils.wrap({
    //   append: true,
    //   element: this.element
    // })
    split({ element: this.element, append: true})
    split({ element: this.element, append: true})

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })
    this.timelineIn.set(this.element, {
      autoAlpha: 1
    })
    each(this.elementsLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        y: '100%'
      }, {
        delay: index * 0.2,
        duration: 1.5,
        ease: 'expo.out',
        y: '0%'
      }, 0)
    })
  }
    // GSAP.set(this.element, {
    //   autoAlpha: 1
    // })

  //   var windowWrap = window.outerWidth
  //
  //   GSAP.to(this.element, {
  //
  //     duration: 10,
  //     ease: "none",
  //     x: `-${(500)}`,
  //   //    x: `-${(this.element.window.innerWidth)}`,
  //     // modifiers: {
  //     //   x: GSAP.utils.unitize(x => parseFloat(x) % -windowWrap)
  //     // },
  //     repeat: -1,
  //     overwrite: true
  //
  //   })
  // }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementsLines = calculate(this.elementLinesSpans)
    console.log(this.elementsLines)
  }

}

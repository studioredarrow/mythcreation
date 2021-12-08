import GSAP from 'gsap'
import each from 'lodash/each'

import Component from 'classes/Component'

import { COLOR_RED, COLOR_GREY } from 'utils/colors'

export default class Navigation extends Component {
  constructor ({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    })

    this.onChange(template)
  }

  onChange (template) {
    // each(this.elements.items, template => {
    //   if (template === 'active' ) {
    //     GSAP.to(this.element, {
    //       color: COLOR_RED,
    //       duration: 1.5
    //     })
    //   } else {
    //     GSAP.to(this.element, {
    //       color: COLOR_GREY,
    //       duration: 1.5
    //     })
    //   }
    // })
//    console.log(this.elements.items[0])
  //  console.log(template)
    if (template == 'about') {
      // GSAP.to(this.element, {
      //   color: COLOR_RED,
      //   duration: 1.5
      // })
      GSAP.to(this.elements.links[0], {
        color: COLOR_RED,
        duration: 1.5
      })

      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })

    } else if (template == 'myths' && 'detail') {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_RED,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })
    } else if (template == 'journal' && 'post') {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_RED,
        duration: 1.5
      })
    } else {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })
    }
  }


  // onChange (template) {
  //   if (template === 'about') {
  //     GSAP.to(this.element, {
  //       color: COLOR_GREY,
  //       duration: 1.5
  //     })
  //   } else {
  //     GSAP.to(this.element, {
  //       color: COLOR_PINK,
  //       duration: 1.5
  //     })
  //   }
  // }
}

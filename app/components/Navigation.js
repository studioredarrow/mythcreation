import GSAP from 'gsap'

import Component from 'classes/Component'

import { COLOR_PINK, COLOR_GREY } from 'utils/colors'

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

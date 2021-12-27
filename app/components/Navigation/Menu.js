import GSAP from 'gsap'

import Component from 'classes/Component'
// import Link from 'animations/Link'
// import { mapEach } from 'utils/dom'



export default class Menu extends Component {
  constructor ({element}) {
    super({
      element: '.navigation__list',
      elements: {
        menu: '.navigation__button__menu',
        close: '.navigation__button__close',
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    })

    this.links = mapEach(this.elements.links, element => {
      return new Link({
        element
      })
    })

    this.timeline = GSAP.timeline({ paused: true})
    console.log("Inside Constructor")
  }

  onMouseEnter () {
      console.log('Mouse Entered!')
    this.timeline.play()
    this.timeline.to(this.elements.item, 1, {
      left: 0,
      ease: Expo.easeInOut,
    });

    this.timeline.staggerFrom(
      this.elements.items,
      0.8,
      { y: 100, opacity: 0, ease: Expo.easeOut },
      "0.1",
      "-=0.4"
    );

    // this.timeline.staggerFrom(
    //   ".socials",
    //   0.8,
    //   { y: 100, opacity: 0, ease: Expo.easeOut },
    //   "0.4",
    //   "-=0.6"
    // );

  }

  onMouseLeave () {
    this.timeline.reverse()

  }


  addEventListeners () {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this)
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this)

    this.element.addEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.addEventListener('mouseleave', this.onMouseLeaveEvent)
  }

  removeEventListeners () {
    this.element.removeEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.removeEventListener('mouseleave', this.onMouseLeaveEvent)
  }
}

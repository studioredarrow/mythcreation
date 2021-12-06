import Arrow from 'classes/Arrow'
import Line from 'classes/Line'
import Button from 'classes/Button'

import Page from 'classes/Page'

export default class About extends Page{
  constructor () {
    super({
      id: 'about',

      element: '.about',
      elements: {
        wrapper: '.about__inner__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.about__titles',
        button: '.about__button',
        gallery: '.about__gallery'
      }
    })

  }

  create () {
  super.create()

    this.link = new Button({
      element: this.elements.button
    })

    this.fx = new Arrow({
      element: this.elements.gallery
    })

    this.line = new Line({
      element: this.elements.wrapper
    })
  //  this.elements.link.addEventListener('click', _ => console.log('Click me, click me, one more time!'))
  }

  destroy(){
    super.destroy()

    this.link.removeEventListeners()
    this.fx.removeEventListeners()
  }

}

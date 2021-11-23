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
        button: '.about__button'
      }
    })

  }

  create () {
  super.create()

    this.link = new Button({
      element: this.elements.button
    })
  //  this.elements.link.addEventListener('click', _ => console.log('Click me, click me, one more time!'))
  }

  destroy(){
    super.destroy()

    this.link.removeEventListeners()
  }

}

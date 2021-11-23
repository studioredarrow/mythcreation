import Button from 'classes/Button'

import Page from 'classes/Page'

export default class Home extends Page{
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: document.querySelector('.navigation'),
        button: '.home__button'
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

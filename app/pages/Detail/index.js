import Button from 'classes/Button'

import Page from 'classes/Page'

export default class Detail extends Page{
  constructor () {
    super({
      id: 'detail',

      element: '.detail',
      elements: {
        wrapper: '.detail__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.detail__information__title',
        button: '.detail__button'
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

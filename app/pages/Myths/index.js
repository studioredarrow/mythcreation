import Page from 'classes/Page'

export default class Myths extends Page {
  constructor () {
    super({
      id: 'myths',

      element: '.myths',
      elements: {
        wrapper: '.myths__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.myths__titles'
      }
    })
  }
}

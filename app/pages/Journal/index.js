import Page from 'classes/Page'

export default class Journal extends Page{
  constructor () {
    super({
      id: 'journal',

      element: '.journal',
      elements: {
        wrapper: '.journal__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.journal__title'
      }
    })

  }
}

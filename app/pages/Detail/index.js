import Page from 'classes/Page'

export default class Detail extends Page{
  constructor () {
    super({
      id: 'detail',

      element: '.detail',
      elements: {
        wrapper: '.detail__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.detail__information__title'
      }
    })


  }
}

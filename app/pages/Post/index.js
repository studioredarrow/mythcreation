import Page from 'classes/Page'

export default class Post extends Page{
  constructor () {
    super({
      id: 'post',

      element: '.post',
      elements: {
        wrapper: '.post__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.post__titles'
      }
    })

  }
}

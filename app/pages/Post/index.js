import Page from 'classes/Page'

export default class Post extends Page{
  constructor () {
    super({
      id: 'post',

      element: '.post'
    })

  }
}

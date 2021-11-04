import About from 'pages/About'
import Myths from 'pages/Myths'
import Home from 'pages/Home'
import Post from 'pages/Post'
import Detail from 'pages/Detail'
import Journal from 'pages/Journal'

class App {
  constructor () {
    this.createContent()
    this.createPages()
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template - this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      about: new About(),
      myths: new Myths(),
      home: new Home(),
      detail: new Detail(),
      journal: new Journal(),
      post: new Post()
    }

    this.page = this.pages[this.template]
    this.page.create()
    console.log(this.page)
  }
}

new App()

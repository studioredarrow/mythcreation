import Component from 'classes/Component'

export default class Animation extends Component{
  //Constructor gets called everytime a new object is created
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })

    this.createObserver()

    this.animateOut()
  }

  createObserver () {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if ( entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)
  }

  animateIn () {

  }

  animateOut () {

  }
  onResize () {

  }
}

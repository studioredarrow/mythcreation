import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'

import map from 'lodash/map'

import Gallery from './Gallery'


export default class {
  constructor ({ gl, scene, sizes }) {
    this.gl = gl
    this.sizes = sizes

    this.group = new Transform()

    this.createGeometry()
    this.createGalleries()

    this.onResize({
      sizes: this.sizes
    })

    this.group.setParent(scene)

    this.show()
  }

  createGeometry() {
    this.geometry = new Plane(this.gl)
  }

  createGalleries() {
    this.galleriesElements = document.querySelectorAll('.detail__information__gallery')

    this.galleries = map(this.galleriesElements, (element, index) => {
      return new Gallery({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }

  //ANIMATION***

  show () {
    map(this.galleries, gallery => gallery.show())
  }

  hide () {
    map(this.galleries, gallery => gallery.hide())
  }

//EVENTS***
  onResize (event) {

    map(this.galleries, gallery => gallery.onResize(event))

  }

  onTouchDown ( event ) {
    map(this.galleries, gallery => gallery.onTouchDown(event))
  }

  onTouchMove ( event ) {
    map(this.galleries, gallery => gallery.onTouchMove(event))
  }

  onTouchUp ( event ) {
    map(this.galleries, gallery => gallery.onTouchUp(event))
  }

  onWheel ({ pixelX, pixelY }) {

  }
  //UPDATE***

  update( scroll ) {

    map(this.galleries, gallery => gallery.update(scroll))

  }

  //DESTROY****

  destroy () {
    map(this.galleries, gallery => gallery.destroy())
  }
}

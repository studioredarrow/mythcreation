import { Camera, Renderer, Transform } from 'ogl'

import Home from './Home'
import Detail from './Detail'

export default class Canvas {
  constructor ({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

//    this.createHome()
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.position.z =5
  }

  createScene () {
    this.scene = new Transform()
  }

  // HOME***

  createHome () {

    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })

  }

  destroyHome () {
    if (!this.home) return

    this.home.destroy()
    this.home = null
  }

//DETAIL ***

  createDetail () {
    this.detail = new Detail({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyDetail () {
    if (!this.detail) return

    this.detail.destroy()
    this.detail = null
  }

  // //MYTHS ***
  //
  // createMyths () {
  //   this.myths = new Myths({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes
  //   })
  // }
  //
  // destroyMyths () {
  //   if (!this.myths) return
  //
  //   this.myths.destroy()
  //   this.myths = null
  // }

  //EVENTS***

  onPreloaded () {

    this.onChangeEnd(this.template)
  }

  onChangeStart () {
    if (this.detail) {
      this.detail.hide()
    }


    if (this.home) {
      this.home.hide()
    }

    // if (this.myths) {
    //   this.myths.hide()
    // }
  }

  onChangeEnd (template) {
    if (template === 'detail') {
      this.createDetail()
    } else if (this.detail) {
      this.destroyDetail()
    }

    if (template === 'home') {
      this.createHome()
    } else {
      this.destroyHome()
    }


    // if (template === 'myths') {
    //   this.createMyths()
    // } else if (this.myths) {
    //   this.destroyMyths()
    // }
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })

    const fov = this.camera.fov * (Math.PI /180)
    const height = 2 * Math.tan(fov/2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      height,
      width
    }
    const values = {
      sizes: this.sizes
    }


    if (this.detail) {
      this.detail.onResize(values)
    }
    if (this.home) {
      this.home.onResize(values)
    }

    // if (this.myths) {
    //   this.myths.onResize(values)
    // }
  }

  onTouchDown (event) {
    this.isDown = true

    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.detail) {
      this.detail.onTouchDown(values)
    }

    if (this.home) {
      this.home.onTouchDown(values)
    }

    // if (this.myths) {
    //   this.myths.onTouchDown(values)
    // }


  }

  onTouchMove (event) {
    if(!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.detail) {
      this.detail.onTouchMove(values)
    }

    if (this.home) {
      this.home.onTouchMove(values)
    }

    // if (this.myths) {
    //   this.myths.onTouchMove(values)
    // }

  }

  onTouchUp (event) {
    this.isDown = false

    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.detail) {
      this.detail.onTouchUp(values)
    }

    if (this.home) {
      this.home.onTouchUp(values)
    }

    // if (this.myths) {
    //   this.myths.onTouchUp(values)
    // }

  }

  onWheel (event) {
    if (this.home) {
      this.home.onWheel(event)
    }
    // if (this.myths) {
    //   this.myths.onWheel(event)
    // }
  }

  //LOOP***

  update(scroll) {

    if (this.detail) {
      this.detail.update(scroll)
    }

    if (this.home) {
      this.home.update()
    }
        //
        // if (this.myths) {
        //   this.myths.update(scroll)
        // }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }
}

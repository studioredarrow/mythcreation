import GSAP from 'gsap'
import {Mesh, Program } from 'ogl'

import Detection from 'classes/Detection'

import fragment from 'shaders/plane-fragment.glsl'
import vertex from 'shaders/plane-vertex.glsl'


export default class {
  constructor ({ element, geometry, gl, index, scene, sizes }) {
    this.element = element
    this.geometry = geometry
    this.gl = gl
    this.index = index
    this.scene = scene
    this.sizes = sizes

    this.extra = {
      x: 0,
      y: 0
    }
    this.createTexture()
    this.createProgram()
    this.createMesh()
    this.createBounds({
      sizes: this.sizes
    })

  }

  createTexture (){
    const image = this.element.querySelector('img')

    this.texture = window.TEXTURES[image.getAttribute('data-src')]

  //   //all this below information will be stored in widnow.TEXTURES
  //   this.image = new window.Image()
  //   console.log(this.element)
  //
  // //Because images are coming from Prismic we need to add this:
  //   this.image.crossOrigin = 'anonymous'
  //   this.image.src = image.getAttribute('data-src')
  //   this.image.onload = _ => (this.texture.image = this.image)

  }

  createProgram () {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: { value: 0 },
        tMap: { value: this.texture }
      }
    })
  }

  createMesh () {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })

    this.mesh.setParent(this.scene)
    //to rotate the images slightly randomly
  //  this.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.02, Math.PI * 0.02)
  //  this.mesh.position.x += this.index * this.mesh.scale.x
  }

  createBounds ({ sizes }) {

    this.sizes = sizes

    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()
  }


//ANIMATION***

  show () {
    GSAP.fromTo(this.program.uniforms.uAlpha, {
      value: 0
    }, {
      value: 1
    })
  }

  hide () {
    GSAP.to(this.program.uniforms.uAlpha, {
      value: 0
    })
  }



  //EVNETS***
  onResize (sizes, scroll, width) {

    this.extra = 0
    this.widthTotal = width

    this.createBounds(sizes)

    this.updateX(scroll)
    this.updateY(0)
  }

  //LOOP***
  updateRotation () {
    this.mesh.rotation.z = GSAP.utils.mapRange(
      -this.sizes.width / 2,
      this.sizes.width / 2,
      Math.PI * 0.1,
      -Math.PI * 0.1,
      this.mesh.position.x
    )

  }


  updateScale () {
    this.height = this.bounds.height / window.innerHeight
    this.width = this.bounds.width / window.innerWidth

    this.mesh.scale.x = this.sizes.width * this.width
    this.mesh.scale.y = this.sizes.height * this.height
//this scales the middle image slightly up by adjust the valeue : here: 0.1
    // const scale = GSAP.utils.mapRange(0, this.sizes.width / 2, 0.1 , 0, Math.abs(this.mesh.position.x))
    // this.mesh.scale.x += scale
    // this.mesh.scale.y += scale
  }

  updateX(x=0) {
    this.x = (this.bounds.left + x) /window.innerWidth

    this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra
  }
  updateY(y=0) {
    this.y = (this.bounds.top + y) / window.innerHeight

    const extra = Detection.isPhone() ? 15 : 40

    this.mesh.position.y = ( this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height)
    this.mesh.position.y += Math.cos((this.mesh.position.x / this.sizes.width) * Math.PI *0.1) * 40 - 40
  }

  update (scroll) {
//    if (!this.bounds) return
    this.updateRotation()
    this.updateScale()
    this.updateX(scroll)
    this.updateY(0)
  }

}

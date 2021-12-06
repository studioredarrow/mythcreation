import GSAP from 'gsap'

import map from 'lodash/map'

import { Transform } from 'ogl'

import Media from './Media'

export default class Gallery {
  constructor ({ element, geometry, index, gl, scene, sizes }) {
    this.element = element
    this.elementWrapper = element.querySelector('.about__gallery__wrapper')
    this.geometry = geometry
    this.index = index
    this.gl = gl
    this.scene = scene
    this.sizes = sizes

    this.group = new Transform()

    this.scroll = {
      current: 0,
      start: 0,
      target: 0,
      lerp: 0.1
    }

    this.createMedias()

    this.group.setParent(this.scene)
  }

  createMedias () {
    this.mediasElements = this.element.querySelectorAll('.about__gallery__media')

    this.medias = map(this.mediasElements, (element, index) => {

      return new Media({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }

//EVENTS***
  onResize (event) {


    this.bounds = this.elementWrapper.getBoundingClientRect()

    this.sizes = event.sizes

//    this.height = this.bounds.height / window.innerHeight * this.sizes.height,
    this.width = this.bounds.width / window.innerWidth * this.sizes.width


    this.scroll.current = this.scroll.target = 0

    map(this.medias, media => media.onResize(event, this.scroll.current))

  }

  onTouchDown ({ x, y }) {
    this.scroll.start = this.scroll.current

  }

  onTouchMove ({ x, y }) {
    const distance = x.start - x.end
//    const yDistance = y.start - y.end

    this.scroll.target = this.scroll.start - distance
  //  this.y.target = this.scrollCurrent.y - yDistance

  }

  onTouchUp ({ x, y }) {

  }

  // onWheel ({ pixelX, pixelY }) {
  //   this.x.target += pixelX
  //   this.y.target += pixelY
  //
  // }
  //UPDATE***

  update() {
    if (!this.bounds) return

    //this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

    if (this.scroll.current < this.scroll.target) {
      this.direction = 'right'
    } else if ( this.scroll.current > this.scroll.target) {
      this.direction = 'left'
    }

    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
  //
  //   if (this.scroll.y < this.y.current) {
  //     this.y.direction = 'top'
  //   } else if ( this.scroll.y > this.y.current) {
  //     this.y.direction = 'bottom'
  //   }
  //
  // //  this.galleryWidth = this.galleryBounds.width / window.innerWidth * this.sizes.width
  //
  //   this.scroll.x = this.x.current
  //   this.scroll.y = this.y.current
  //
    map(this.medias, (media, index) => {
      const scaleX = media.mesh.scale.x / 2


      if (this.direction === 'left') {
        const x = media.mesh.position.x + scaleX

        if ( x < -this.sizes.width / 2) {
          media.extra += this.width

    //      media.mesh.rotation.z = GSAP.utils.random(-Math.PI *0.03, Math.PI * 0.03)
        }
      } else if ( this.direction === 'right') {
        const x = media.mesh.position.x - scaleX

        if (x > this.sizes.width /2) {
          media.extra -= this.width

    //      media.mesh.rotation.z = GSAP.utils.random(-Math.PI *0.03, Math.PI * 0.03)
        }
      }

      // const scaleY = media.mesh.scale.y / 2
      //
      // if (this.y.direction === 'top') {
      //   const y = media.mesh.position.y + scaleY
      //
      //   if ( y < -this.sizes.height / 2) {
      //     media.extra.y += this.gallerySizes.height
      //
      //     media.mesh.rotation.z = GSAP.utils.random(-Math.PI *0.03, Math.PI * 0.03)
      //   }
      // } else if ( this.y.direction === 'bottom') {
      //   const y = media.mesh.position.y - scaleY
      //
      //   if (y > this.sizes.height /2) {
      //     media.extra.y -= this.gallerySizes.height
      //
      //     media.mesh.rotation.z = GSAP.utils.random(-Math.PI *0.03, Math.PI * 0.03)
      //   }
      // }

  //    media.mesh.position.y = Math.cos((media.mesh.position.x / this.width) * Math.PI) * 75 - 75


      media.update(this.scroll.current)
    })
  }
}

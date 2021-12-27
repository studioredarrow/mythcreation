import GSAP from 'gsap'
import each from 'lodash/each'

import Component from 'classes/Component'

import { COLOR_RED, COLOR_GREY } from 'utils/colors'

import Menu from './Menu'

export default class Navigation extends Component {

  constructor ({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    })

    // const navLinks = document.querySelector('.navigation__list')
    //   navLinks.classList.add("navigation__list__hidden")
    var menu = document.querySelector('.menu__icon')

    this.onChange(template)
    //this.onClick(menu)
    // this.onClick(template)
    // this.onMouseDown(template)


// console.log('Inside Constructor')
    // this.onClick(menu)


  }

  onClick (menu) {

  var menu_icon = document.querySelector('.menu__icon')
   const navLinks = document.querySelector('.navigation__list')
   const links = document.querySelectorAll('.navigation__list__item')
   const nav_icon = document.querySelector('.nav__icon')
   let x = 2;
  //console.log(menu);
//  menu.addEventListener("click", () => {
  // console.log(menu);

  // menu.classList.remove("")


console.log("onClick function executed")
 //if navlinks has class menu__button__checked then remove teh class
//IF AND ELSE STATEMENTS
// if(x === 2 && (!navLinks.classList.contains("navigation__list__hidden"))){
//   console.log(x)
//   navLinks.classList.add("navigation__list__hidden")
//   x = 1;
// }
// else {
//   console.log(`In Else ;${x}`);
//   if(navLinks.classList.contains("navigation__list__hidden"))
//   navLinks.classList.remove("navigation__list__hidden")
//   x = 0
// }

/*
 if (navLinks.classList.contains("navigation__list__hidden")) {
   console.log('Already Hidden');
    navLinks.classList.remove("navigation__list__hidden")
    nav_icon.classList.remove("nav__icon__hide")

 }
 else {
   console.log("Opened")
   //nav_icon.classList.add("nav__icon__hide")
   navLinks.classList.add("navigation__list__hidden")
  // nav_icon.classList.remove("navigation__list__hidden")

  // navLinks.classList.add("menu__button__checked")

 }
 */


//

     //  navLinks.classList.toggle("open")
     //      links.classList.toggle('fade')
  //})

  }

  onMouseDown (menu){

    var menu_icon = document.querySelector('.menu__icon')
     const navLinks = document.querySelector('.navigation__list')
     const links = document.querySelectorAll('.navigation__list__item')
     const nav_icon = document.querySelector('.nav__icon')
     if(navLinks.classList.contains("navigation__list__show")){
      console.log('Already Hidden');
      navLinks.classList.remove("navigation__list__show")
     }
     else {
      navLinks.classList.add("navigation__list__show")
    }
   console.log('Mouse Down');
  }


  onChange (template) {
    document.getElementById("menu__button").checked = false;

    console.log('On Change Called');

    if (template == 'about') {
      // GSAP.to(this.element, {
      //   color: COLOR_RED,
      //   duration: 1.5
      // })
      GSAP.to(this.elements.links[0], {
        color: COLOR_RED,
        duration: 1.5
      })

      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })

    } else if (template == 'myths' || template == 'detail') {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_RED,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })
    } else if (template == 'journal' || template == 'post') {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_RED,
        duration: 1.5
      })
    } else {
      GSAP.to(this.elements.links[0], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[1], {
        color: COLOR_GREY,
        duration: 1.5
      })
      GSAP.to(this.elements.links[2], {
        color: COLOR_GREY,
        duration: 1.5
      })
    }
  }

  addEventListeners () {
    this.onClick = this.onClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)

    this.element.addEventListener('click', this.onClick)
    this.element.addEventListener('mousedown', this.onMouseDown)
  }

  removeEventListeners () {
    this.element.removeEventListener('click', this.onClick)
    this.element.removeEventListener('mousedown', this.onMouseDown)
  }

}

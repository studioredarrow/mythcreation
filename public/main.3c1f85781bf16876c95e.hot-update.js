/*! For license information please see main.3c1f85781bf16876c95e.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatemyth("main",{"./app/index.js":(e,t,a)=>{a.r(t);var s=a("./node_modules/lodash/each.js"),n=a.n(s),i=a("./app/components/Preloader.js"),o=a("./app/pages/About/index.js"),d=a("./app/pages/Myths/index.js"),p=a("./app/pages/Home/index.js"),r=a("./app/pages/Post/index.js"),h=a("./app/pages/Detail/index.js"),l=a("./app/pages/Journal/index.js");new class{constructor(){this.createPreloader(),this.createContent(),this.createPages(),this.addEventListeners(),this.addLinkListeners(),this.update()}createPreloader(){this.preloader=new i.default,this.preloader.once("completed",this.onPreloaded.bind(this))}createContent(){this.content=document.querySelector(".content"),this.template=this.content.getAttribute("data-template")}createPages(){this.pages={about:new o.default,detail:new h.default,home:new p.default,journal:new l.default,myths:new d.default,post:new r.default},this.page=this.pages[this.template],this.page.create()}onPreloaded(){this.preloader.destroy(),this.page.show(),console.log("Preloaded!")}async onChange(e){await this.page.hide();const t=await window.fetch(e);if(200===t.status){const e=await t.text(),a=document.createElement("div");a.innerHTML=e;const s=a.querySelector(".content");this.template=s.getAttribute("data-template"),this.content.setAttribute("data-template",this.template),this.content.innerHTML=s.innerHTML,this.page=this.pages[this.template],this.page.create(),this.page.show(),this.addLinkListeners()}else console.log("Error")}onResize(){this.page&&this.page.onResize&&this.page.onResize()}update(){this.page&&this.page.update&&this.page.update(),this.frame=window.requestAnimationFrame(this.update.bind(this))}addEventListeners(){window.addEventListener("resize",this.onResize.bind(this))}addLinkListeners(){const e=document.querySelectorAll("a");n()(e,(e=>{e.onclick=t=>{t.preventDefault();const{href:a}=e;this.onChange(a),console.log(t,a)}}))}}}},(function(e){e.h=()=>"a6f4e8a06e712f00241c"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zYzFmODU3ODFiZjE2ODc2Yzk1ZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7cVhBK0hBLElBbEhBLE1BQ0VBLGNBQ0VDLEtBQUtDLGtCQUNMRCxLQUFLRSxnQkFDTEYsS0FBS0csY0FFTEgsS0FBS0ksb0JBQ0xKLEtBQUtLLG1CQUVMTCxLQUFLTSxTQUdQTCxrQkFDRUQsS0FBS08sVUFBWSxJQUFJQyxFQUFBQSxRQUNyQlIsS0FBS08sVUFBVUUsS0FBSyxZQUFhVCxLQUFLVSxZQUFZQyxLQUFLWCxPQUd6REUsZ0JBQ0VGLEtBQUtZLFFBQVVDLFNBQVNDLGNBQWMsWUFDdENkLEtBQUtlLFNBQVdmLEtBQUtZLFFBQVFJLGFBQWEsaUJBRzVDYixjQUNFSCxLQUFLaUIsTUFBUSxDQUNYQyxNQUFPLElBQUlDLEVBQUFBLFFBQ1hDLE9BQVEsSUFBSUMsRUFBQUEsUUFDWkMsS0FBTSxJQUFJQyxFQUFBQSxRQUNWQyxRQUFTLElBQUlDLEVBQUFBLFFBQ2JDLE1BQU8sSUFBSUMsRUFBQUEsUUFDWEMsS0FBTSxJQUFJQyxFQUFBQSxTQUdaN0IsS0FBSzhCLEtBQU85QixLQUFLaUIsTUFBTWpCLEtBQUtlLFVBQzVCZixLQUFLOEIsS0FBS0MsU0FLWnJCLGNBQ0VWLEtBQUtPLFVBQVV5QixVQUNmaEMsS0FBSzhCLEtBQUtHLE9BQ1ZDLFFBQVFDLElBQUksY0FHQSxlQUFFQyxTQUVScEMsS0FBSzhCLEtBQUtPLE9BRWhCLE1BQU1DLFFBQWdCQyxPQUFPQyxNQUFNSixHQUVuQyxHQUF1QixNQUFuQkUsRUFBUUcsT0FBZ0IsQ0FDMUIsTUFBTUMsUUFBYUosRUFBUUssT0FDckJDLEVBQU0vQixTQUFTZ0MsY0FBYyxPQUVuQ0QsRUFBSUUsVUFBWUosRUFFaEIsTUFBTUssRUFBYUgsRUFBSTlCLGNBQWMsWUFFckNkLEtBQUtlLFNBQVdnQyxFQUFXL0IsYUFBYSxpQkFFeENoQixLQUFLWSxRQUFRb0MsYUFBYSxnQkFBaUJoRCxLQUFLZSxVQUNoRGYsS0FBS1ksUUFBUWtDLFVBQVlDLEVBQVdELFVBRXBDOUMsS0FBSzhCLEtBQU85QixLQUFLaUIsTUFBTWpCLEtBQUtlLFVBQzVCZixLQUFLOEIsS0FBS0MsU0FDVi9CLEtBQUs4QixLQUFLRyxPQUVWakMsS0FBS0ssd0JBRUw2QixRQUFRQyxJQUFJLFNBS2hCYyxXQUNPakQsS0FBSzhCLE1BQVE5QixLQUFLOEIsS0FBS21CLFVBQzFCakQsS0FBSzhCLEtBQUttQixXQU1kM0MsU0FDT04sS0FBSzhCLE1BQVE5QixLQUFLOEIsS0FBS3hCLFFBQzFCTixLQUFLOEIsS0FBS3hCLFNBR1pOLEtBQUtrRCxNQUFRWCxPQUFPWSxzQkFBc0JuRCxLQUFLTSxPQUFPSyxLQUFLWCxPQU03REksb0JBQ0VtQyxPQUFPYSxpQkFBaUIsU0FBVXBELEtBQUtpRCxTQUFTdEMsS0FBS1gsT0FHdkRLLG1CQUNFLE1BQU1nRCxFQUFReEMsU0FBU3lDLGlCQUFpQixLQUV4Q0MsR0FBQUEsQ0FBS0YsR0FBT0csSUFDVkEsRUFBS0MsUUFBVUMsSUFFYkEsRUFBTUMsaUJBRU4sTUFBTSxLQUFFQyxHQUFTSixFQUNqQnhELEtBQUs2RCxTQUFTRCxHQUVkMUIsUUFBUUMsSUFBSXVCLEVBQU1FLHdCQ3pIMUJFLEVBQW9CQyxFQUFJLElBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teXRoLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovL215dGgvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlYWNoIGZyb20gJ2xvZGFzaC9lYWNoJ1xuXG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gJ2NvbXBvbmVudHMvUHJlbG9hZGVyJ1xuXG5pbXBvcnQgQWJvdXQgZnJvbSAncGFnZXMvQWJvdXQnXG5pbXBvcnQgTXl0aHMgZnJvbSAncGFnZXMvTXl0aHMnXG5pbXBvcnQgSG9tZSBmcm9tICdwYWdlcy9Ib21lJ1xuaW1wb3J0IFBvc3QgZnJvbSAncGFnZXMvUG9zdCdcbmltcG9ydCBEZXRhaWwgZnJvbSAncGFnZXMvRGV0YWlsJ1xuaW1wb3J0IEpvdXJuYWwgZnJvbSAncGFnZXMvSm91cm5hbCdcblxuXG5cbmNsYXNzIEFwcCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNyZWF0ZVByZWxvYWRlcigpXG4gICAgdGhpcy5jcmVhdGVDb250ZW50KClcbiAgICB0aGlzLmNyZWF0ZVBhZ2VzKClcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuYWRkTGlua0xpc3RlbmVycygpXG5cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBjcmVhdGVQcmVsb2FkZXIgKCkge1xuICAgIHRoaXMucHJlbG9hZGVyID0gbmV3IFByZWxvYWRlcigpXG4gICAgdGhpcy5wcmVsb2FkZXIub25jZSgnY29tcGxldGVkJywgdGhpcy5vblByZWxvYWRlZC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgY3JlYXRlQ29udGVudCgpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMuY29udGVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUnKVxuICB9XG5cbiAgY3JlYXRlUGFnZXMgKCkge1xuICAgIHRoaXMucGFnZXMgPSB7XG4gICAgICBhYm91dDogbmV3IEFib3V0KCksXG4gICAgICBkZXRhaWw6IG5ldyBEZXRhaWwoKSxcbiAgICAgIGhvbWU6IG5ldyBIb21lKCksXG4gICAgICBqb3VybmFsOiBuZXcgSm91cm5hbCgpLFxuICAgICAgbXl0aHM6IG5ldyBNeXRocygpLFxuICAgICAgcG9zdDogbmV3IFBvc3QoKVxuICAgIH1cblxuICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZXNbdGhpcy50ZW1wbGF0ZV1cbiAgICB0aGlzLnBhZ2UuY3JlYXRlKClcbiAgfVxuXG4gIC8vKioqRVZFTlRTKioqXG5cbiAgb25QcmVsb2FkZWQgKCkge1xuICAgIHRoaXMucHJlbG9hZGVyLmRlc3Ryb3koKVxuICAgIHRoaXMucGFnZS5zaG93KClcbiAgICBjb25zb2xlLmxvZygnUHJlbG9hZGVkIScpXG4gIH1cblxuICBhc3luYyBvbkNoYW5nZSAodXJsKSB7XG5cbiAgICBhd2FpdCB0aGlzLnBhZ2UuaGlkZSgpXG5cbiAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgd2luZG93LmZldGNoKHVybClcblxuICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVxdWVzdC50ZXh0KClcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sXG5cbiAgICAgIGNvbnN0IGRpdkNvbnRlbnQgPSBkaXYucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gZGl2Q29udGVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUnKVxuXG4gICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlJywgdGhpcy50ZW1wbGF0ZSlcbiAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBkaXZDb250ZW50LmlubmVySFRNTFxuXG4gICAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2VzW3RoaXMudGVtcGxhdGVdXG4gICAgICB0aGlzLnBhZ2UuY3JlYXRlKClcbiAgICAgIHRoaXMucGFnZS5zaG93KClcblxuICAgICAgdGhpcy5hZGRMaW5rTGlzdGVuZXJzKClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yJylcbiAgICB9XG5cbiAgfVxuXG4gIG9uUmVzaXplICgpIHtcbiAgICBpZiAoIHRoaXMucGFnZSAmJiB0aGlzLnBhZ2Uub25SZXNpemUgKSB7XG4gICAgICB0aGlzLnBhZ2Uub25SZXNpemUoKVxuICAgIH1cbiAgfVxuXG4gIC8vKioqTE9PUCoqKlxuXG4gIHVwZGF0ZSAoKSB7XG4gICAgaWYgKCB0aGlzLnBhZ2UgJiYgdGhpcy5wYWdlLnVwZGF0ZSApIHtcbiAgICAgIHRoaXMucGFnZS51cGRhdGUoKVxuICAgIH1cblxuICAgIHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuXG4gIC8vKioqTElTVEVORVJTKioqXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpXG4gIH1cblxuICBhZGRMaW5rTGlzdGVuZXJzICgpIHtcbiAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVxuXG4gICAgZWFjaChsaW5rcywgbGluayA9PiB7XG4gICAgICBsaW5rLm9uY2xpY2sgPSBldmVudCA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IHsgaHJlZiB9ID0gbGlua1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKGhyZWYpXG5cbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQsaHJlZilcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbm5ldyBBcHAoKVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYTZmNGU4YTA2ZTcxMmYwMDI0MWNcIikiXSwibmFtZXMiOlsiY29uc3RydWN0b3IiLCJ0aGlzIiwiY3JlYXRlUHJlbG9hZGVyIiwiY3JlYXRlQ29udGVudCIsImNyZWF0ZVBhZ2VzIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJhZGRMaW5rTGlzdGVuZXJzIiwidXBkYXRlIiwicHJlbG9hZGVyIiwiUHJlbG9hZGVyIiwib25jZSIsIm9uUHJlbG9hZGVkIiwiYmluZCIsImNvbnRlbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZW1wbGF0ZSIsImdldEF0dHJpYnV0ZSIsInBhZ2VzIiwiYWJvdXQiLCJBYm91dCIsImRldGFpbCIsIkRldGFpbCIsImhvbWUiLCJIb21lIiwiam91cm5hbCIsIkpvdXJuYWwiLCJteXRocyIsIk15dGhzIiwicG9zdCIsIlBvc3QiLCJwYWdlIiwiY3JlYXRlIiwiZGVzdHJveSIsInNob3ciLCJjb25zb2xlIiwibG9nIiwidXJsIiwiaGlkZSIsInJlcXVlc3QiLCJ3aW5kb3ciLCJmZXRjaCIsInN0YXR1cyIsImh0bWwiLCJ0ZXh0IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImRpdkNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJvblJlc2l6ZSIsImZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImVhY2giLCJsaW5rIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJocmVmIiwib25DaGFuZ2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiaCJdLCJzb3VyY2VSb290IjoiIn0=
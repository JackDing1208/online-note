webpackJsonp([1],{"2jnj":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("/5sW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top"},[e("div",{staticClass:"create",on:{click:this.addNote}},[e("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-close1"}})]),this._v(" 添加便签")]),this._v(" "),e("div",{staticClass:"login"},[this._v("GitHub登录")])])},staticRenderFns:[]};var s=n("VU/8")({name:"Top",inject:["eventBus"],methods:{addNote:function(){this.eventBus.$emit("add")}}},o,!1,function(t){n("2jnj")},"data-v-38ac68d4",null).exports,a=(n("bdgc"),{computed:{createTime:function(){return(new Date).getFullYear()+"年"+((new Date).getMonth()+1)+"月"+(new Date).getDate()+"日  "+((new Date).getHours()<10?"0"+(new Date).getHours():(new Date).getHours())+":"+((new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes())}},methods:{getTime:function(){return(new Date).getFullYear()+"年"+((new Date).getMonth()+1)+"月"+(new Date).getDate()+"日  "+((new Date).getHours()<10?"0"+(new Date).getHours():(new Date).getHours())+":"+((new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes())}}}),c=n("mtWM"),d=n.n(c),l="http://localhost:9999",u={mock:l+"/mock",all:l+"/all",add:l+"/add",edit:l+"/edit",delete:l+"/delete"},r={name:"note",props:["id","time","content"],data:function(){return{text:this.content,showDelete:!1,disX:0,disY:0,isMoving:!1}},mounted:function(){var t=this.$refs.note,e=t.getBoundingClientRect(),n=e.height,i=(e.top,e.left,parseInt(n/10)+1);t.style.gridRow="span "+i},methods:{deleteNote:function(){this.eventBus.$emit("delete",this.id)},catchNote:function(t){this.isMoving=!0;var e=this.$refs.note,n=e.getBoundingClientRect(),i=n.top,o=n.left;this.$refs.note.style.position="absolute",this.$refs.note.style.zIndex="1",e.style.left=o-10+"px",e.style.top=i-10+"px",this.disX=t.clientX-e.offsetLeft,this.disY=t.clientY-e.offsetTop},fixNote:function(){this.isMoving=!1,console.log("不动")},moveNote:function(t){var e=this.$refs.note,n=e.getBoundingClientRect(),i=(n.height,n.width);e.style.left=t.pageX-this.disX+"px",e.style.top=t.pageY-this.disY-10+"px",parseInt(e.style.left)+i>document.body.clientWidth&&(e.style.left=document.body.clientWidth-i-20+"px",this.fixNote())},editNote:function(){d.a.post(u.edit+"?id="+this.id+"&text="+this.text)},saveText:function(){this.text=this.$refs.text.innerText}},watch:{isMoving:function(t){t?(document.onmousemove=this.moveNote,document.addEventListener("mouseup",this.fixNote)):t||(document.onmousemove=null,document.removeEventListener("mouseup",this.fixNote))}},mixins:[a],inject:["eventBus"]},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"note",staticClass:"note",class:{moving:t.isMoving}},[n("div",{staticClass:"move",on:{mousedown:t.catchNote,mouseup:t.fixNote}}),t._v(" "),n("div",{staticClass:"title",on:{mouseenter:function(e){t.showDelete=!0},mouseleave:function(e){t.showDelete=!1}}},[n("div",{staticClass:"time"},[t._v(t._s(t.time))]),t._v(" "),t.showDelete?n("div",{staticClass:"delete",on:{click:function(e){return e.stopPropagation(),t.deleteNote(e)}}},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-closes"}})])]):t._e()]),t._v(" "),n("div",{ref:"text",staticClass:"content",attrs:{contenteditable:"true"},on:{blur:t.editNote,input:t.saveText}},[t._v(t._s(t.content)+"\n  ")])])},staticRenderFns:[]};var h=n("VU/8")(r,f,!1,function(t){n("scV0")},"data-v-0be23d7b",null).exports,v={name:"NoteList",data:function(){return{noteList:null}},created:function(){this.getList()},mounted:function(){var t=this;this.eventBus.$on("add",function(){t.addNote()}),this.eventBus.$on("delete",function(e){t.deleteNote(e)}),this.setHeight()},methods:{getList:function(){var t=this;d.a.get(u.all).then(function(e){t.noteList=e.data.data})},setHeight:function(){var t=this.$refs.note;console.log(t)},addNote:function(){var t=this,e=this.getTime();d.a.post(u.add+"?time="+e).then(function(e){var n={id:e.data.id,time:e.data.time,content:" "};t.noteList.push(n)})},deleteNote:function(t){var e=this;this.noteList.forEach(function(n,i){n.id===t&&e.noteList.splice(i,1)}),d.a.post(u.delete+"?id="+t)}},components:{Note:h},inject:["eventBus"],mixins:[a]},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"noteList"},this._l(this.noteList,function(t){return e("Note",{key:t.id,ref:"note",refInFor:!0,staticClass:"note",attrs:{content:t.text,time:t.time,id:t.id}})}),1)},staticRenderFns:[]};var g={name:"App",data:function(){return{eventBus:new i.a}},provide:function(){return{eventBus:this.eventBus}},components:{Top:s,Note:h,NoteList:n("VU/8")(v,m,!1,function(t){n("q07x")},"data-v-817f4ec8",null).exports}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Top"),this._v(" "),e("NoteList")],1)},staticRenderFns:[]};var _=n("VU/8")(g,p,!1,function(t){n("uZ5Q")},null,null).exports,w=n("/ocq");i.a.use(w.a);var x=new w.a({routes:[]});i.a.config.productionTip=!1,new i.a({el:"#app",router:x,render:function(t){return t(_)}})},bdgc:function(t,e){!function(t){var e,n='<svg><symbol id="icon-closes" viewBox="0 0 1024 1024"><path d="M512 63.8C264.5 63.8 63.8 264.5 63.8 512c0 247.5 200.7 448.2 448.2 448.2 247.6 0 448.2-200.7 448.2-448.2C960.2 264.5 759.6 63.8 512 63.8zM512 857.7c-190.9 0-345.7-154.8-345.7-345.7S321.1 166.3 512 166.3c190.9 0 345.7 154.8 345.7 345.7S702.9 857.7 512 857.7zM688.8 374.5l-39.3-39.3c-10.9-10.9-28.4-10.9-39.3 0L512 433.4l-98.2-98.2c-10.9-10.9-28.4-10.9-39.3 0l-39.3 39.3c-10.9 10.9-10.9 28.4 0 39.3l98.2 98.2-98.2 98.2c-10.9 10.9-10.9 28.4 0 39.3l39.3 39.3c10.9 10.9 28.4 10.9 39.3 0l98.2-98.2 98.2 98.2c10.9 10.9 28.4 10.9 39.3 0l39.3-39.3c10.9-10.9 10.9-28.4 0-39.3L590.6 512l98.2-98.2C699.7 402.9 699.7 385.3 688.8 374.5z"  ></path></symbol><symbol id="icon-close1" viewBox="0 0 1024 1024"><path d="M563.19226822 474.51692997L563.19226822-105.71038211a51.2 51.2 0 1 0-102.38453644-0.04827135l-0.02413638 580.25144704-580.25144705 0.02413639a51.2 51.2 0 1 0 0 102.38453643l580.25144776 0.02413568 0.02413567 580.25144775a51.2 51.2 0 1 0 102.36040076 0.02413567l0.04827135-580.27558342 580.22731208 0a51.2 51.2 0 1 0 0-102.38453644l-580.22731208 0z"  ></path></symbol></svg>';if((e=document.getElementsByTagName("script"))[e.length-1].getAttribute("data-injectcss")&&!t.__iconfont__svg__cssinject__){t.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}!function(e){if(document.addEventListener)if(~["complete","loaded","interactive"].indexOf(document.readyState))setTimeout(e,0);else{document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t,!1),e()},!1)}else document.attachEvent&&(i=e,o=t.document,s=!1,(a=function(){try{o.documentElement.doScroll("left")}catch(t){return void setTimeout(a,50)}n()})(),o.onreadystatechange=function(){"complete"==o.readyState&&(o.onreadystatechange=null,n())});function n(){s||(s=!0,i())}var i,o,s,a}(function(){var t,e;(t=document.createElement("div")).innerHTML=n,n=null,(e=t.getElementsByTagName("svg")[0])&&(e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.width=0,e.style.height=0,e.style.overflow="hidden",function(t,e){e.firstChild?function(t,e){e.parentNode.insertBefore(t,e)}(t,e.firstChild):e.appendChild(t)}(e,document.body))})}(window)},q07x:function(t,e){},scV0:function(t,e){},uZ5Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.215989caa8c75c32acaa.js.map
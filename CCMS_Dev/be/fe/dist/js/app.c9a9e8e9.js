(function(t){function e(e){for(var n,o,c=e[0],l=e[1],s=e[2],u=0,d=[];u<c.length;u++)o=c[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,s||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=l(l.s=a[0]))}return t}var n={},o={app:0},r={app:0},i=[];function c(t){return l.p+"js/"+({about:"about"}[t]||t)+"."+{about:"7eb5db72","chunk-2d228858":"462fc82d","chunk-49fb3b52":"09c5e61f","chunk-0cd310a6":"6677ecbd","chunk-7766f094":"8c40a610"}[t]+".js"}function l(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-49fb3b52":1,"chunk-0cd310a6":1,"chunk-7766f094":1};o[t]?e.push(o[t]):0!==o[t]&&a[t]&&e.push(o[t]=new Promise((function(e,a){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"31d6cfe0","chunk-2d228858":"31d6cfe0","chunk-49fb3b52":"e995d5c8","chunk-0cd310a6":"12d6dcf6","chunk-7766f094":"a6e42630"}[t]+".css",r=l.p+n,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===n||u===r))return e()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],u=s.getAttribute("data-href");if(u===n||u===r)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var n=e&&e.target&&e.target.src||r,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete o[t],p.parentNode.removeChild(p),a(i)},p.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){o[t]=0})));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,a){n=r[t]=[e,a]}));e.push(n[2]=i);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=c(t);var d=new Error;s=function(e){u.onerror=u.onload=null,clearTimeout(p);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,a[1](d)}r[t]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=n,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(a,n,function(e){return t[e]}.bind(null,n));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var p=u;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.token?n("v-app",[n("v-navigation-drawer",{attrs:{app:"",clipped:"",color:"deep-orange darken-1"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list-item-group",{attrs:{color:"primary"}},t._l(t.items,(function(e,a){return n("v-list-item",{key:a,attrs:{to:e.to}},[n("v-list-item-icon",[n("v-icon",{staticClass:"white--text"},[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"white--text"},[t._v(t._s(e.title))])],1)],1)})),1)],1),n("v-app-bar",{attrs:{app:"","clipped-left":"",color:"#1c065a",dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-btn",{attrs:{img:"",color:"#1c065a"}},[n("v-img",{staticClass:"mx-0",attrs:{src:a("8e79"),"max-height":"150","max-width":"200",contain:""},on:{click:t.logoClick}})],1),n("div",{staticClass:"flex-grow-1"}),n("v-btn",{attrs:{img:"",color:"#1c065a"}},[n("v-img",{staticClass:"mx-0",attrs:{src:a("aef3"),"max-height":"30","max-width":"40",contain:""}})],1),n("v-btn",{attrs:{color:"#1c065a",dark:"",depressed:""},on:{click:t.signOut}},[t._v("Logout")])],1),n("v-content",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1),n("v-footer",{attrs:{dark:"",color:"#1c065a",height:"70px"}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[t._v("\n   (우)05359 서울시 강동구 천호대로200길 54 (둔촌동 603-4), 3층     TEL +82 2 488 8966     FAX +82 2 488 8967     EMAIL info@cosweal.com\nCOPYRIHGT (C) 2018 COSWEAL INC. ALL RIGHTS RESERVED.\n     ")])],1)],1):n("v-app",{staticStyle:{background:"#1c065a"}},[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{attrs:{align:"top",justify:"center"}},[n("v-col",{attrs:{cols:"100",sm:"80",md:"30"}},[n("v-toolbar-title",[n("div",{staticClass:"display-4"},[n("div",{staticStyle:{color:"#FFFFFF"}},[n("v-img",{staticClass:"mx-0",attrs:{src:a("8e79"),"max-height":"200",width:"700",contain:""}})],1)])]),n("div",[n("br"),n("br")]),n("v-toolbar-title",[n("h2",{staticStyle:{color:"#FFFFFF"}},[t._v(" Enter your e-mail and password to Log in")])]),n("div",[n("br")]),n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{label:"ID",type:"text",rules:t.idRules,outlined:"",dark:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}}),n("v-text-field",{attrs:{label:"Password",type:"password",rules:t.pwRules,dark:"",outlined:""},model:{value:t.pw,callback:function(e){t.pw=e},expression:"pw"}}),n("v-btn",{attrs:{block:"",color:"primary",disabled:!t.valid},on:{click:t.loginClick}},[t._v("Login")])],1)],1)],1)],1)],1)},r=[],i=a("bc3a"),c=a.n(i),l={name:"App",data:function(){return{valid:!0,user:"",clipped:!1,drawer:!0,fixed:!1,id:"",pw:"",items:[{title:"홈",icon:"mdi-home",to:{path:"/"}},{title:"나의 계정",icon:"mdi-account",to:{path:"/account"}},{title:"미디어 공간",icon:"mdi-image",to:{path:"/media"}},{title:"캠페인 관리",icon:"mdi-book",to:{path:"/campaign"}},{title:"3D 스튜디오",icon:"mdi-pencil",to:{path:"/3d"}},{title:"사용자 관리",icon:"mdi-wrench",to:{path:"/company"}},{title:"휴지통",icon:"mdi-trash-can",to:{path:"/boardUpdate"}},{title:"Q&A",icon:"mdi-help-box",to:{path:"/board"}}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Vuetify.js",idRules:[function(t){return!!t||"ID를 입력해주세요"}],pwRules:[function(t){return!!t||"패스워드를 입력해주세요"}]}},methods:{logoClick:function(){location.href="/"},loginClick:function(){var t=this;localStorage.getItem("token");this.$refs.form.validate()&&c.a.post("/api",{orgId:this.id,userPw:this.pw}).then((function(e){if(!e.data.success)return console.error(e.data.msg);localStorage.setItem("user",e.data.user),localStorage.setItem("id",e.data.id),t.user=localStorage.getItem("user"),localStorage.setItem("token",e.data.token),t.$store.commit("getToken",e.data.user)})).catch((function(t){alert("에러가 발생하였습니다."),console.error(t.message)}))},signOut:function(){localStorage.removeItem("token"),location.href="/"}},components:{}},s=l,u=a("2877"),d=a("6544"),p=a.n(d),f=a("7496"),m=a("40dc"),h=a("5bc1"),v=a("8336"),g=a("62ad"),b=a("a523"),k=a("a75b"),w=a("553a"),y=a("4bd4"),x=a("132d"),C=a("adda"),I=a("da13"),S=a("5d23"),_=a("1baa"),V=a("34c3"),E=a("f774"),L=a("0fd9"),O=a("8654"),T=a("2a7f"),F=Object(u["a"])(s,o,r,!1,null,null,null),P=F.exports;p()(F,{VApp:f["a"],VAppBar:m["a"],VAppBarNavIcon:h["a"],VBtn:v["a"],VCol:g["a"],VContainer:b["a"],VContent:k["a"],VFooter:w["a"],VForm:y["a"],VIcon:x["a"],VImg:C["a"],VListItem:I["a"],VListItemContent:S["a"],VListItemGroup:_["a"],VListItemIcon:V["a"],VListItemTitle:S["b"],VNavigationDrawer:E["a"],VRow:L["a"],VTextField:O["a"],VToolbarTitle:T["a"]});var j=a("8c4f"),A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("여기는 홈화면 입니다")])},R=[],D={created:function(){},data:function(){return{id:"asdf",pw:"1234",page:!1}},methods:{loginClick:function(){var t=this;console.log("로그인 클릭"),c.a.post("/",{org_id:this.id,user_pw:this.pw}).then((function(e){console.log(e.data.page),t.page=e.data.page,console.log(t.page)})).catch((function(t){alert("에러가 발생하였습니다."),console.error(t.message)}))}}},N=D,B=Object(u["a"])(N,A,R,!1,null,null,null),$=B.exports;n["a"].use(j["a"]);var G=new j["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:$},{path:"/about",name:"about",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"/board",name:"board",component:function(){return Promise.all([a.e("chunk-49fb3b52"),a.e("chunk-7766f094")]).then(a.bind(null,"5d6d"))}},{path:"/company",name:"company",component:function(){return Promise.all([a.e("chunk-49fb3b52"),a.e("chunk-0cd310a6")]).then(a.bind(null,"60f1"))}},{path:"*",name:"e404",component:function(){return a.e("chunk-2d228858").then(a.bind(null,"da16"))}}]}),M=a("2f62");n["a"].use(M["a"]);var H=new M["a"].Store({state:{token:localStorage.getItem("token"),user:{name:"Guest",id:""}},mutations:{getToken:function(t,e){t.token=localStorage.getItem("token"),t.user=e},delToken:function(t){localStorage.removeItem("token"),t.token=null,t.user={name:"Guest",id:""}}},actions:{}}),q=a("f309");n["a"].use(q["a"]);var J=new q["a"]({icons:{iconfont:"mdi"}}),U=(a("44f8"),a("a6e0"),a("a7be"),a("4ede"));n["a"].component("editor",U["Editor"]),n["a"].component("viewer",U["Viewer"]),n["a"].config.productionTip=!1,new n["a"]({router:G,store:H,vuetify:J,render:function(t){return t(P)}}).$mount("#app")},"8e79":function(t,e,a){t.exports=a.p+"img/cosweal.logo.342b304d.png"},aef3:function(t,e,a){t.exports=a.p+"img/korea.0f3ab6bb.png"}});
//# sourceMappingURL=app.c9a9e8e9.js.map
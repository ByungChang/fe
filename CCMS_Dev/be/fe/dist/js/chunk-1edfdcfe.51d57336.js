(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1edfdcfe"],{"0e8f":function(t,e,o){"use strict";o("20f6");var n=o("e8f2");e["a"]=Object(n["a"])("flex")},"5d6d":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",[o("v-card-title",[t._v("\n    Q&A\n    "),o("v-spacer"),o("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"검색어입력","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),o("v-snackbar",{attrs:{timeout:1e4,top:"","multi-line":"",color:"error",dark:"",icon:"mdi-alert-circle-outline",transition:"scale-transition"},model:{value:t.confirm_,callback:function(e){t.confirm_=e},expression:"confirm_"}},[t._v("\n    "+t._s(t.confirmText)+"\n    "),o("v-btn",{attrs:{flat:"",color:"error"},on:{click:function(e){return t.confirmYes(t.item)}}},[t._v("네")]),o("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.confirmNo}},[t._v("아니요")])],1),o("v-data-table",{staticClass:"elevation-1",staticStyle:{"border-top":"1px black solid","border-bottom":"1px black solid"},attrs:{headers:t.headers,items:t.posts,search:t.search,page:t.page,"items-per-page":12,"hide-default-footer":""},on:{"update:page":function(e){t.page=e},"page-count":function(e){t.pageCount=e}},scopedSlots:t._u([{key:"item.updatedAt",fn:function(e){return[o("v-chip",{attrs:{color:t.getColor(e.item.board_post.name),dark:""}},[t._v("  "+t._s(e.item.board_post.name)+" ")])]}},{key:"item.title",fn:function(e){return[o("a",{staticStyle:{color:"black","text-align":"left",display:"block"},on:{click:function(o){return t.boardDetail(e.item)}}},[t._v("\n              "+t._s(e.item.title)+"\n          ")])]}}])}),o("div",{staticClass:"text-center pt-2"},[o("v-pagination",{attrs:{length:t.pageCount},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),o("v-btn",{attrs:{bottom:"",color:"purple darken-4",dark:"",fab:"",fixed:"",right:""},on:{click:t.openAddModal}},[o("v-icon",[t._v("mdi-plus")])],1),o("DetailModal"),o("WritePostModal"),o("AddCommentModal")],1)},a=[],r=(o("7f7f"),o("55dd"),o("bc3a")),i=o.n(r),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-dialog",{attrs:{width:"800px",persistent:""},model:{value:t.DModal,callback:function(e){t.DModal=e},expression:"DModal"}},[o("ConfirmSnackBar"),o("v-card",[o("v-system-bar",{attrs:{window:"",dark:""}},[o("span",[t._v("작성일 : "+t._s(t.form.createdAt))]),o("v-spacer"),t.user===t.form.writer?o("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.openEditModal(t.form)}}},[t._v("\n                mdi-pencil\n            ")]):t._e(),t.user===t.form.writer?o("v-icon",{attrs:{small:""},on:{click:function(e){return t.deletePost(t.form)}}},[t._v("\n                mdi-delete\n            ")]):t._e(),o("v-btn",{attrs:{icon:"",dark:""}},[o("v-icon",{on:{click:t.DModalClose}},[t._v("mdi-close")])],1)],1),o("v-card-title",{staticStyle:{color:"white","background-color":"#230871"}},[t._v(t._s(t.form.title)+"\n        ")]),o("v-container",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"500px"},attrs:{id:"scroll-target"}},[o("v-layout",{attrs:{wrap:"",row:""}},[o("v-flex",[o("viewer",{staticClass:"ma-4",staticStyle:{"min-height":"300px"},attrs:{value:t.form.content}}),o("v-divider",{staticStyle:{"background-color":"#000000"}}),t.form.file?o("v-layout",{attrs:{wrap:"",row:""}},[o("v-flex",[o("v-list",t._l(t.form.file,(function(e){return o("v-list-item",{key:e.file.orgName},[o("v-list-item-title",[o("v-btn",{attrs:{depressed:"",small:""},on:{click:function(o){return t.fileDown(e.file.orgName)}}},[o("v-icon",[t._v("mdi-paperclip")]),t._v(t._s(e.file.orgName))],1)],1)],1)})),1)],1)],1):t._e(),o("v-divider",{staticStyle:{"background-color":"#000000"}}),o("v-list",{attrs:{"three-line":""}},t._l(t.comments,(function(e){return o("v-list-item",{key:e.id,staticStyle:{"border-bottom":"1px grey dashed"}},[o("v-list-item-avatar",[o("v-icon",{attrs:{size:"80"}},[t._v(" mdi-account-circle")])],1),o("v-list-item-title",[o("strong",[t._v(t._s(e.user.userNm))]),t._v(" "+t._s(e.createdAt)),o("v-list-item-content",[t._v(t._s(e.content)+" ")])],1),t.user===e.user.userNm?o("v-icon",{attrs:{small:""},on:{click:function(o){return t.modCommentDialog(e)}}},[t._v("mdi-pencil\n                            ")]):t._e(),t.user===e.user.userNm?o("v-icon",{attrs:{small:"",right:""},on:{click:function(o){return t.deleteComment(e)}}},[t._v("mdi-delete\n                            ")]):t._e()],1)})),1)],1)],1)],1),o("v-container",[o("v-text-field",{attrs:{label:"댓글 작성","append-outer-icon":"mdi-send"},on:{"click:append-outer":t.addComment},model:{value:t.commentAdd,callback:function(e){t.commentAdd=e},expression:"commentAdd"}})],1)],1),o("ErrorSnackBar")],1)},l=[],s=o("bd86"),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-snackbar",{attrs:{timeout:1e4,top:"","multi-line":"",persistent:"",color:"error",dark:"",icon:"mdi-alert-circle-outline",transition:"scale-transition"},model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[t._v("정말 삭제 하시겠습니까?\n    "),o("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.confirmYes}},[t._v("네")]),o("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.confirmNo}},[t._v("아니요")])],1)},m=[],u=o("2b0e"),f=new u["a"],p=f,h={data:function(){return{confirm:!1,comentId:0,comments:[],alertText:"",alert:!1,CommentORPost:""}},mounted:function(){var t=this;p.$on("triggerDelComment",(function(e,o){t.commentId=e,t.comments=o,t.confirm=!0,t.CommentORPost="Comment"})),p.$on("triggerDelPost",(function(e){t.boardId=e,t.confirm=!0,t.CommentORPost="Post"}))},methods:{confirmYes:function(){var t=this;"Comment"===this.CommentORPost?i.a.delete("/api/board/comment",{data:{id:this.commentId}}).then((function(e){var o=0;for(o=0;o<t.comments.length;o++)t.comments[o].id===t.commentId&&t.comments.splice(o,1);t.confirm=!1,p.$emit("triggerDelCommentOk",t.comments)})).catch((function(e){t.alertText="에러가 발생했습니다",t.alert=!0,console.error(e.message)})):"Post"===this.CommentORPost&&i.a.delete("/api/board",{data:{boardId:this.boardId}}).then((function(t){location.href="/board"})).catch((function(e){t.alertText="에러가 발생했습니다",t.alert=!0,console.error(e.message)}))},confirmNo:function(){this.confirm=!1}}},g=h,v=o("2877"),b=o("6544"),_=o.n(b),y=o("8336"),k=o("2db4"),x=Object(v["a"])(g,d,m,!1,null,null,null),C=x.exports;_()(x,{VBtn:y["a"],VSnackbar:k["a"]});var w=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-snackbar",{attrs:{timeout:!1,top:"",persistent:"","multi-line":"",color:"blue lighten-2",dark:"",icon:"mdi-alert-circle-outline",transition:"scale-transition"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v("에러가 발생했습니다\n"),o("v-btn",{attrs:{flat:"",color:"blue lighten-2"},on:{click:t.alertConfirm}},[t._v("확인")])],1)},D=[],O={data:function(){return{alert:!1}},mounted:function(){var t=this;p.$on("triggerError",(function(e){t.alert=!0}))},methods:{alertConfirm:function(){location.herf="/board"}}},V=O,S=Object(v["a"])(V,w,D,!1,null,null,null);S.exports;_()(S,{VBtn:y["a"],VSnackbar:k["a"]});var M={mounted:function(){var t=this;this.user=localStorage.getItem("user"),this.id=localStorage.getItem("id"),p.$on("triggerDModal",(function(e,o,n){t.boardId=e,t.form=o,t.comments=n,t.DModal=!0})),p.$on("triggerDelCommentOk",(function(e){t.comments=e}))},data:function(){return{id:0,DModal:!1,confirmComment:!1,confirmCommentText:"",flag:"",list:[1,2,3,4,5],form:{},comments:[],commentAdd:"",user:"",commentId:0,commentDialog:!1,commentModify:"",commentSell:null,confirm:!1,boardId:0}},methods:{DModalClose:function(){this.form.title="",this.form.content="",this.form.file="",this.DModal=!1},UModalClose:function(){this.form.title="",this.form.content="",this.UModal=!1},modCommentDialog:function(t){this.commentDialog=!0,this.commentId=t.id,this.commentModify=t.content,this.commentSell=t,p.$emit("triggerAddCommentModal",t)},addComment:function(){var t=this;i.a.post("/api/board/comment/add",{boardId:this.boardId,userId:this.id,content:this.commentAdd}).then((function(e){console.log(e.data.comment);var o=Object(s["a"])({id:1,orgId:1,userGroupId:1,userNm:t.user,userPw:"",userYn:"",boardId:1,content:"",createdAt:""},"id",0),n={content:t.commentAdd,boardId:t.boardId,id:e.data.comment.id,user:o,createdAt:"New"};console.log(n),t.comments.push(n),t.commentAdd=""})).catch((function(t){p.$emit("triggerError",!0),console.error(t.message)}))},deleteComment:function(t){p.$emit("triggerDelComment",t.id,this.comments)},deletePost:function(t){p.$emit("triggerDelPost",t.id)},openEditModal:function(t){this.DModal=!1,p.$emit("triggerEditModal",t)},fileDown:function(t){var e=t;console.log(e),i.a.post("/api/board/fileDown",{fileName:e},{responseType:"blob"}).then((function(t){var o=window.URL.createObjectURL(new Blob([t.data])),n=document.createElement("a");n.href=o,n.setAttribute("download",e),document.body.appendChild(n),n.click()})).catch((function(t){console.log(t)}))}},components:{ConfirmSnackBar:C}},A=M,I=o("b0af"),j=o("99d9"),$=o("a523"),P=o("169a"),N=o("ce7e6"),T=o("0e8f"),B=o("132d"),E=o("a722"),F=o("8860"),L=o("da13"),R=o("8270"),W=o("5d23"),Y=o("2fa4"),J=(o("8e6e"),o("ac6a"),o("456d"),o("d263"),o("c5f6"),o("8308"),o("3a66")),z=o("a9ad"),H=o("7560"),U=o("58df"),G=o("80d2");function Q(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function q(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?Q(o,!0).forEach((function(e){Object(s["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):Q(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var K=Object(U["a"])(Object(J["a"])("bar",["height","window"]),z["a"],H["a"]).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes:function(){return q({"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window},this.themeClasses)},computedHeight:function(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles:function(){return{height:Object(G["f"])(this.computedHeight)}}},methods:{updateApplication:function(){return this.$el?this.$el.clientHeight:this.computedHeight}},render:function(t){var e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),Object(G["r"])(this))}}),X=o("8654"),Z=Object(v["a"])(A,c,l,!1,null,null,null),tt=Z.exports;_()(Z,{VBtn:y["a"],VCard:I["a"],VCardTitle:j["c"],VContainer:$["a"],VDialog:P["a"],VDivider:N["a"],VFlex:T["a"],VIcon:B["a"],VLayout:E["a"],VList:F["a"],VListItem:L["a"],VListItemAvatar:R["a"],VListItemContent:W["a"],VListItemTitle:W["c"],VSpacer:Y["a"],VSystemBar:K,VTextField:X["a"]});var et=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-dialog",{attrs:{width:"500"},model:{value:t.commentDialog,callback:function(e){t.commentDialog=e},expression:"commentDialog"}},[o("v-card",[o("v-card-title",{staticStyle:{color:"white","background-color":"#230871"}},[t._v("\n            댓글 수정\n            "),o("v-spacer"),o("v-icon",{attrs:{dark:""},on:{click:function(e){return t.modalClose()}}},[t._v("mdi-close\n            ")])],1),o("v-card-text",[o("v-text-field",{attrs:{label:"댓글 수정","append-outer-icon":"mdi-pencil"},on:{"click:append-outer":function(e){return t.modComment(t.item)}},model:{value:t.commentModify,callback:function(e){t.commentModify=e},expression:"commentModify"}})],1)],1),o("ErrorSnackBar")],1)},ot=[],nt={data:function(){return{commentId:0,commentDialog:!1,commentModify:"",commentSell:null,comments:[],alertText:"",alert:!1}},mounted:function(){var t=this;p.$on("triggerAddCommentModal",(function(e){t.commentModify=e.commentModify,t.commentId=e.id,t.commentModify=e.content,t.commentSell=e,t.commentDialog=!0}))},methods:{modComment:function(){var t=this;this.commentSell.content=this.commentModify,this.commentDialog=!1,i.a.put("/api/board/comment",{id:this.commentId,content:this.commentSell.content}).then((function(e){var o=0;for(o=0;o<t.comments.length;o++)t.comments[o].id===t.commentId&&(t.comments[o].content=t.commentSell.content)})).catch((function(t){p.$emit("triggerError",!0),console.error(t.message)}))},modalClose:function(){this.commentModify="",this.commentDialog=!1}}},at=nt,rt=Object(v["a"])(at,et,ot,!1,null,null,null),it=rt.exports;_()(rt,{VCard:I["a"],VCardText:j["b"],VCardTitle:j["c"],VDialog:P["a"],VIcon:B["a"],VSpacer:Y["a"],VTextField:X["a"]});var ct=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-dialog",{attrs:{width:"800px",persistent:""},model:{value:t.WModal,callback:function(e){t.WModal=e},expression:"WModal"}},[o("v-card",[o("v-card-title",{staticStyle:{color:"white","background-color":"#230871"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}},[o("p",{staticClass:"font-weight-white",attrs:{id:"board"}},[t._v(t._s(t.mode))])]),o("v-row",{staticClass:"ma-0"},[o("v-col",{staticClass:"align-center justify-space-between",attrs:{cols:"12"}},[o("v-row",{attrs:{align:"center"}},[o("v-avatar",{staticClass:"mr-4",attrs:{size:"40px"}}),o("v-btn-toggle",{staticStyle:{"background-color":"grey"},attrs:{color:"deep-purple accent-3",rounded:""},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}},[o("v-btn",{attrs:{value:"left"},on:{click:t.setNormal}},[t._v("\n                    일반\n                  ")]),o("v-btn",{attrs:{value:"center"},on:{click:t.setNotice}},[t._v("\n                    공지\n                  ")])],1),o("v-form",{ref:"form",staticStyle:{width:"500px"},attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("v-text-field",{attrs:{placeholder:"제목을 입력해주세요",rules:t.titleRules},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1)],1),o("v-container",[o("editor",{model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1),o("v-divider",{staticStyle:{"background-color":"#000000"}}),t.file_cpy[0]?o("v-layout",{attrs:{wrap:"",row:""}},[o("v-flex",[o("v-list",t._l(t.file_cpy,(function(e){return o("v-list-item",{key:e.id},[o("v-list-item-title",[o("v-icon",[t._v("mdi-paperclip")]),t._v(t._s(e.file.orgName)+"\n                          "),o("v-icon",{staticStyle:{color:"red"},on:{click:function(o){return t.delFile(e)}}},[t._v("mdi-close")])],1)],1)})),1)],1)],1):t._e(),o("v-divider",{staticStyle:{"background-color":"#000000"}}),o("v-row",[o("v-container",[o("v-file-input",{attrs:{color:"deep-purple accent-4",counter:"",label:"File input",multiple:"",placeholder:"Select your files","prepend-icon":"mdi-paperclip",outlined:"",id:"bin","show-size":1e3,enctype:"multipart/form-data"},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.index,a=e.text;return[n<3?o("v-chip",{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v("\n                  "+t._s(a)+"\n                ")]):3===n?o("span",{staticClass:"overline grey--text text--darken-3 mx-2"},[t._v("\n                  +"+t._s(t.files.length-3)+" File(s)\n                ")]):t._e()]}}]),model:{value:t.files,callback:function(e){t.files=e},expression:"files"}})],1)],1),o("v-card-actions",[o("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.saveClick()}}},[t._v("저장")]),o("v-btn",{attrs:{color:"error"},on:{click:t.modalClose}},[t._v("취소")])],1)],1),o("AlertSnackBar"),o("ErrorSnackBar")],1)},lt=[],st=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-snackbar",{attrs:{timeout:!1,top:"",persistent:"","multi-line":"",color:"blue lighten-2",dark:"",icon:"mdi-alert-circle-outline",transition:"scale-transition"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v("완료되었습니다\n    "),o("v-btn",{attrs:{flat:"",color:"blue lighten-2"},on:{click:t.alertConfirm}},[t._v("확인")])],1)},dt=[],mt={data:function(){return{alert:!1}},mounted:function(){var t=this;p.$on("triggerAlert",(function(e){t.alert=!0}))},methods:{alertConfirm:function(){location.href="/board"}}},ut=mt,ft=Object(v["a"])(ut,st,dt,!1,null,null,null),pt=ft.exports;_()(ft,{VBtn:y["a"],VSnackbar:k["a"]});var ht={data:function(){return{file_cpy:[],file_cpy_save:[],del_files:[],files:[],fileList:!1,fileId:0,WModal:!1,mode:"",form:{},catagory:"일반",user:localStorage.getItem("user"),titleRules:[function(t){return!!t||"제목을 입력해주세요"}]}},mounted:function(){var t=this;p.$on("triggerAddModal",(function(e){t.WModal=!0,t.mode="게시글 생성"})),p.$on("triggerEditModal",(function(e){t.form=e,e.file&&(t.file_cpy=JSON.parse(JSON.stringify(e.file)),t.file_cpy_save=t.file_cpy=JSON.parse(JSON.stringify(e.file))),t.WModal=!0,t.mode="게시글 수정",t.fileList=!0}))},methods:{saveClick:function(){var t=this;if(this.form.title=this.form.title.trim(),this.form.content=this.form.content.trim(),this.form.title&&this.form.content&&""!==this.catagory){if("공지"===this.catagory)var e=1;if("일반"===this.catagory)e=2;var o=new FormData,n=0;console.log(this.files),this.files.forEach((function(t){o.append("".concat(n),t),n++})),o.append("userId",localStorage.getItem("id")),o.append("title",this.form.title),o.append("boardPostId",e),o.append("content",this.form.content),o.append("hit",0),o.append("id",this.form.id),"게시글 생성"===this.mode?i.a.post("/api/board",o).then((function(t){p.$emit("triggerAlert",!0)})).catch((function(t){console.error(t.message)})):"게시글 수정"===this.mode&&(i.a.delete("/api/board/fileDel",{data:{files:this.del_files}}).then((function(t){console.log("r받음")})).catch((function(e){t.alertText="에러가 발생했습니다",t.alert=!0,console.error(e.message)})),i.a.put("/api/board",o).then((function(t){p.$emit("triggerAlert",!0)})).catch((function(t){p.$emit("triggerError",!0),console.error(t.message)})))}},setNormal:function(){this.catagory="일반"},setNotice:function(){this.catagory="공지"},modalClose:function(){function t(t){var e={};for(var o in t)e[o]=t[o];return e}console.log("모달 닫기"),this.form.title="",this.form.content="",this.form.file=[],this.del_files=[],this.WModal=!1,this.file_cpy=t(this.file_cpy_save)},upload:function(){var t=this;i.a.post("/api/board",fd).then((function(e){t.pop(e.data.success)})).catch((function(e){t.pop(e.message)}))},delFile:function(t){var e=this,o=0;this.file_cpy.forEach((function(n){n.file.orgName===t.file.orgName&&(e.del_files.push(e.file_cpy[o]),e.file_cpy.splice(o,1),console.log(e.del_files)),o++}))}},components:{AlertSnackBar:pt}},gt=ht,vt=o("8212"),bt=(o("7e58"),o("604c")),_t=bt["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return bt["a"].options.computed.classes.call(this)}},methods:{genData:bt["a"].options.methods.genData}});function yt(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function kt(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?yt(o,!0).forEach((function(e){Object(s["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):yt(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var xt=Object(U["a"])(_t,z["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return kt({},_t.options.computed.classes.call(this),{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var t=this.setTextColor(this.color,kt({},_t.options.methods.genData.call(this)));return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),Ct=o("cc20"),wt=o("62ad"),Dt=o("23a7"),Ot=o("4bd4"),Vt=o("0fd9"),St=Object(v["a"])(gt,ct,lt,!1,null,null,null),Mt=St.exports;_()(St,{VAvatar:vt["a"],VBtn:y["a"],VBtnToggle:xt,VCard:I["a"],VCardActions:j["a"],VCardTitle:j["c"],VChip:Ct["a"],VCol:wt["a"],VContainer:$["a"],VDialog:P["a"],VDivider:N["a"],VFileInput:Dt["a"],VFlex:T["a"],VForm:Ot["a"],VIcon:B["a"],VLayout:E["a"],VList:F["a"],VListItem:L["a"],VListItemTitle:W["c"],VRow:Vt["a"],VTextField:X["a"]});var At={props:{source:String},data:function(){return{totalItem:0,valid:!0,alertText:"",confirmText:"",confirmCommentText:"",general:"",catagory:"",id:"",name:"",boardId:0,snackbar:!1,timeout:999,dialog:!1,dialog2:!1,flag:"post",alert:!1,confirm_:!1,confirmComment:!1,page:1,pageCount:0,search:"",postCreateLink:[{to:{path:"/board/create"}}],getMd:"",form:{},titleRules:[function(t){return!!t||"제목을 입력해주세요"}],copyPosts:[],posts:[],headers:[{width:"100px",text:"말머리",sortable:!1,value:"updatedAt",align:"center"},{text:"번호",value:"id",align:"center",sortable:!1},{text:"제목",align:"center",sortable:!1,value:"title"},{text:"작성자",value:"user.userNm",align:"center",sortable:!1},{text:"작성일",value:"createdAt",align:"center",sortable:!1},{text:"조회수",value:"hit",sortable:!1,align:"center"}]}},mounted:function(){var t=this;localStorage.token;this.user=localStorage.getItem("user"),this.id=localStorage.getItem("id"),i.a.get("/api/board",{}).then((function(e){console.log(e);var o=0;for(o=0;o<e.data.posts.length;o++){var n=e.data.posts[o].createdAt.substr(0,4),a=e.data.posts[o].createdAt.substr(5,2),r=e.data.posts[o].createdAt.substr(8,2),i=e.data.posts[o].createdAt.substr(11,2),c=e.data.posts[o].createdAt.substr(14,2),l=e.data.posts[o].createdAt.substr(17,2),s=n+"-"+a+"-"+r+" "+i+":"+c+":"+l,d=s instanceof Date?s:new Date(s),m=new Date;d=new Date(d.getFullYear(),d.getMonth()+1,d.getDate()),m=new Date(m.getFullYear(),m.getMonth()+1,m.getDate());var u=Math.abs(m.getTime()-d.getTime());u=Math.ceil(u/864e5),e.data.posts[o].createdAt=u<1?i+":"+c+":"+l:n+"-"+a+"-"+r+" "+i+":"+c+":"+l}t.posts=e.data.posts,t.posts.reverse(),t.posts.sort((function(t,e){return t.board_post.name!==e.board_post.name?t.board_post.name<e.board_post.name?-1:1:t.id>e.id?-1:1})),console.log(t.posts)})).catch((function(t){console.error(t.message)}))},methods:{openAddModal:function(){p.$emit("triggerAddModal","add")},modalClose2:function(){this.form.title="",this.form.content="",this.comments=[],this.dialog2=!1},isNew:function(t){var e=t.createdAt instanceof Date?t.createdAt:new Date(t.createdAt),o=new Date;e=new Date(e.getFullYear(),e.getMonth()+1,e.getDate()),o=new Date(o.getFullYear(),o.getMonth()+1,o.getDate());var n=Math.abs(o.getTime()-e.getTime());return n=Math.ceil(n/864e5),!!(n<3||isNaN(n))},getColor:function(t){return"공지"===t?"red":"grey"},boardDetail:function(t){var e=this;if(t.hit=t.hit+1,this.boardId=t.id,this.form.id=t.id,this.form.title=t.title,this.form.writer=t.user.userNm,this.form.content=t.content,0!==t.board_files.length&&(this.form.file=t.board_files),t.createdAt.length<10){var o=new Date;this.form.createdAt=o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate()+" "+t.createdAt}else this.form.createdAt=t.createdAt;i.a.post("/api/board/comment",{boardId:t.id,hit:t.hit}).then((function(t){var o=0;for(o=0;o<t.data.comments.length;o++){var n=t.data.comments[o].createdAt.substr(0,4),a=t.data.comments[o].createdAt.substr(5,2),r=t.data.comments[o].createdAt.substr(8,2),i=t.data.comments[o].createdAt.substr(11,2),c=t.data.comments[o].createdAt.substr(14,2),l=t.data.comments[o].createdAt.substr(17,2),s=n+"-"+a+"-"+r+" "+i+":"+c+":"+l;t.data.comments[o].createdAt=s}e.comments=t.data.comments,p.$emit("triggerDModal",e.boardId,e.form,e.comments)})).catch((function(t){console.error(t.message)}))}},components:{DetailModal:tt,AddCommentModal:it,WritePostModal:Mt}},It=At,jt=(o("bd47"),o("8fea")),$t=o("891e"),Pt=Object(v["a"])(It,n,a,!1,null,"5bea332e",null);e["default"]=Pt.exports;_()(Pt,{VBtn:y["a"],VCard:I["a"],VCardTitle:j["c"],VChip:Ct["a"],VDataTable:jt["a"],VIcon:B["a"],VPagination:$t["a"],VSnackbar:k["a"],VSpacer:Y["a"],VTextField:X["a"]})},"7e58":function(t,e,o){},8308:function(t,e,o){},a722:function(t,e,o){"use strict";o("20f6");var n=o("e8f2");e["a"]=Object(n["a"])("layout")},bd47:function(t,e,o){"use strict";var n=o("dae8"),a=o.n(n);a.a},dae8:function(t,e,o){}}]);
//# sourceMappingURL=chunk-1edfdcfe.51d57336.js.map
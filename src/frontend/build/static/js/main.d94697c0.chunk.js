(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{30:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(24),s=n.n(a),i=(n(30),n(5)),o={};function l(e){return o[e].value}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},n=/[&<>"'/]/gi;return e.replace(n,(function(e){return t[e]}))}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Math.floor(Date.now()/e)}var j=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function h(e){var t=new Date(e),n=(Date.now()-t)/1e3,c=n/86400;if(c<1){var r=n/3600;return r<1?Math.floor(n/60)+"m":Math.floor(r)+"h"}return c<=7?Math.floor(c)+"d":"".concat(j[t.getMonth()]," ").concat(t.getDay()," ").concat(c>365?t.getFullYear():"")}n(31);var b=n(16),f=n(8),O=n.n(f),p=n(13),m=(n(33),n(10)),x=(n(34),n(11)),v=n(12),g=n(0);function w(e){var t=e.ImgData,n=function(t){e.SetSelectedImage(null),t.preventDefault()},r=function(e){27==e.keyCode&&n(e)};Object(c.useEffect)((function(){document.addEventListener("keydown",r,!1);var e=new URL(window.location);return e.searchParams.set("image",t.fileName),window.history.replaceState({},"",e),function(){document.removeEventListener("keydown",r,!1),e.searchParams.delete("image"),window.history.replaceState({},"",e)}}),[]);var a=t.fileName.match(/^\w{7}(.*)$/),s=h(t.date);return Object(g.jsx)("div",{onClick:n,className:"modalImage",children:Object(g.jsxs)("div",{onClick:function(e){e.stopPropagation()},className:"modalImage-inner",children:[Object(g.jsxs)("div",{className:"modalImage-topbar",children:[Object(g.jsxs)(m.b,{tabIndex:"1",to:"/user/"+t.postedBy.id,children:[Object(g.jsx)("span",{children:d(t.postedBy.username)})," \xb7 ",s]}),Object(g.jsx)("button",{tabIndex:"2",href:"#",onClick:n,children:Object(g.jsx)(x.a,{icon:v.c})})]}),Object(g.jsx)("div",{className:"modalImage-imgholder",children:Object(g.jsx)("img",{src:"/"+t.fileName})}),Object(g.jsxs)("div",{className:"modalImage-bottombar",children:[Object(g.jsxs)("div",{className:"modalImage-titlebar",children:[Object(g.jsx)("h2",{tabIndex:"3",children:d(a[1])}),t.canDelete&&Object(g.jsx)("button",{onClick:function(n){e.DeleteFile(t.fileName),n.preventDefault()},tabIndex:"4",children:Object(g.jsx)(x.a,{icon:v.d})})]}),Object(g.jsxs)("p",{tabIndex:"5",children:[t.views," View",1!=t.views?"s":""]})]})]})})}function y(e){var t=e.ImgData,n=h(t.date),c=t.fileName.match(/^\w{7}(.*)$/),r=t.justUploaded==u(1e3);return Object(g.jsxs)("div",{onClick:function(){e.displayFile(t)},className:r?"image-entry entry-popin":"image-entry",children:[Object(g.jsx)("div",{style:{backgroundImage:"url('/"+t.fileName+"')"},className:"img"}),Object(g.jsx)("h3",{children:d(c[1])}),Object(g.jsxs)("div",{className:"extended-info",children:[Object(g.jsx)("span",{title:"Views",children:Object(g.jsxs)("p",{children:[Object(g.jsx)(x.a,{icon:v.b})," ",t.views]})}),Object(g.jsx)("span",{title:"Posted on",children:Object(g.jsxs)("p",{children:[Object(g.jsx)(x.a,{icon:v.a})," ",n]})})]})]})}function N(e){var t=Object(i.a)(e.GridImages,2),n=t[0],r=t[1],a=Object(c.useState)(""),s=Object(i.a)(a,2),o=s[0],l=s[1],d=Object(c.useState)(),u=Object(i.a)(d,2),j=u[0],h=u[1],f=Object(c.useState)(0),m=Object(i.a)(f,2),x=m[0],v=m[1],N=Object(c.useState)(!0),k=Object(i.a)(N,2),U=k[0],T=k[1],D=function(e){h(e)},S=function(e){U||-1==x||document.body.scrollHeight-(document.documentElement.scrollTop+window.innerHeight)<10&&v(x+1)};return Object(c.useEffect)((function(){-1!=x&&(T(!0),fetch("".concat(e.Endpoint,"/").concat(x)).then(function(){var e=Object(p.a)(O.a.mark((function e(t){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:(c=e.sent).hasOwnProperty("err")?(l(c.err),T(!1),v(-1)):(20!=c.length&&v(-1),r([].concat(Object(b.a)(n),Object(b.a)(c))),T(!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){v(-2),T(!1)})))}),[x]),Object(c.useEffect)((function(){return document.addEventListener("scroll",S,!1),function(){document.removeEventListener("scroll",S,!1)}})),Object(g.jsxs)("div",{id:"user-images",className:"container",children:[j&&Object(g.jsx)(w,{ImgData:j,DeleteFile:function(e){fetch("/api/files/"+e,{method:"DELETE"}).then(function(){var t=Object(p.a)(O.a.mark((function t(c){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.json();case 2:t.sent.hasOwnProperty("err")||(r(n.filter((function(t){return t.fileName!=e}))),h(null));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},SetSelectedImage:h}),Object(g.jsx)("h2",{className:"containerHeader",children:""==o?e.Title:o}),Object(g.jsx)("div",{className:"images",children:n.map((function(e,t){return Object(g.jsx)(y,{ImgData:e,displayFile:D},t)}))}),-1==x&&n.length>=16&&Object(g.jsxs)("div",{className:"imgGrid-return",children:[Object(g.jsx)("h3",{children:"... and then there were none"}),Object(g.jsx)("a",{href:"#",onClick:function(){window.scrollTo(0,0)},children:"return to top"})]}),U&&Object(g.jsxs)("h3",{className:"imgGrid-Loading",children:["Loading files",Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."})]})]})}function k(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],a=n[1];return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(N,{Title:"All Uploads",Endpoint:"/api/files/uploads",GridImages:[r,a]})})}n(46);var U=function(){return console.log("WAWA"),Object(g.jsx)("div",{id:"notfound",children:Object(g.jsxs)("div",{id:"notfound-inner",children:[Object(g.jsxs)("h2",{children:[Object(g.jsx)("span",{id:"flicker",children:"4"}),Object(g.jsx)("span",{children:"0"}),Object(g.jsx)("span",{children:"4"})]}),Object(g.jsx)("p",{children:"This page could not be found"}),Object(g.jsx)(m.b,{to:"/",className:"stylized-btn",children:"Home"})]})})},T=n(3);n(47);function D(e){var t=Object(c.useState)({total:0,amount:0}),n=Object(i.a)(t,2),r=n[0],a=n[1],s=Object(i.a)(e.gridImages,2),o=s[0],d=s[1],j=function(e){for(var t=e.length,n=t,c=[],r=function(r){var s=new FormData;s.append("file",e[r]);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(i.readyState==XMLHttpRequest.DONE){var e=JSON.parse(i.responseText);e.hasOwnProperty("err")||(e.justUploaded=u(1e3),c.unshift(e),d([].concat(c,Object(b.a)(o)))),n--,a({total:t,count:t-n})}0==n&&a({total:0,count:0})},i.open("POST","/api/files/upload"),i.setRequestHeader("uploadToken",l("currentUser").uploadToken),i.send(s)},s=0;s<t;s++)r(s);a({total:t,count:0})},h=function(){var e=Object(p.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),0==r.total){e.next=3;break}return e.abrupt("return");case 3:t.dataTransfer.items&&j(t.dataTransfer.files);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=0!=r.total;return Object(g.jsx)("div",{id:"drop_outer",className:"container",children:Object(g.jsxs)("div",{id:"drop_zone",className:f?"isOver":"",onDrop:h,onDragOver:function(e){e.preventDefault(),0==r.total&&e.currentTarget.classList.add("isOver")},onDragLeave:function(e){e.preventDefault(),0==r.total&&e.currentTarget.classList.remove("isOver")},children:[Object(g.jsx)("label",{htmlFor:f?"":"drop_manual-upload",id:"drop_manual-label",children:f?"Uploading files ".concat(r.count," of ").concat(r.total):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("span",{children:"Choose a file"})," or drag it here."]})}),Object(g.jsx)("input",{type:"file",id:"drop_manual-upload",onChange:function(e){var t=e.target.files;e.preventDefault(),0==r.total&&0!=t.length&&j(t)},multiple:!0})]})})}function S(e){var t=Object(c.useState)(!1),n=Object(i.a)(t,2),r=n[0],a=n[1],s=Object(c.useRef)(null),o=Object(c.useRef)(null);return e.User.isUserApproved?Object(g.jsxs)("div",{ref:s,className:r?"tokenCopied":"",id:"tokenholder",children:[Object(g.jsx)("p",{children:"Upload Token"}),Object(g.jsx)("input",{onChange:function(){},ref:o,id:"tokencapture",type:"text",value:e.User.uploadToken}),Object(g.jsx)("button",{className:r?"no-hover":"",onClick:function(t){t.preventDefault(),navigator.clipboard.writeText(e.userToken).then((function(){setTimeout((function(){a(!1)}),3e3),a(!0)}),(function(){o.current.select(),document.execCommand("copy"),setTimeout((function(){a(!1)}),3e3),a(!0)}))},children:r?"Copied!":"Copy"})]}):Object(g.jsx)("p",{className:"tokenholder-denied",children:"This account requires admin approval to upload"})}function I(e){var t=Object(i.a)(e.TargetUser,2),n=t[0],c=t[1],r=function(e,t){e.preventDefault(),fetch("/api/users/".concat(n.id,"/").concat(t),{method:"POST"}).then(function(){var e=Object(p.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:(n=e.sent).hasOwnProperty("err")||c(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){alert(e)}))};return console.log(n.isUserApproved),Object(g.jsxs)("div",{id:"adminPanel",className:"container",children:[Object(g.jsx)("h2",{className:"containerHeader",children:"Admin Panel"}),Object(g.jsxs)("div",{className:"adminPanel-btns",children:[!n.isUserApproved&&Object(g.jsx)("a",{href:"",onClick:function(e){return r(e,"TOGGLE_APPROVAL")},children:"Allow user to upload"}),Object(g.jsx)("a",{href:"",onClick:function(e){return r(e,"BAN_USER")},children:n.isUserBanned?"Unban User":"Ban User"})]})]})}function P(e){var t=l("currentUser"),n=Object(c.useState)([]),r=Object(i.a)(n,2),a=r[0],s=r[1],o=Object(c.useState)({}),u=Object(i.a)(o,2),j=u[0],b=u[1],f=Object(T.f)().userid;Object(c.useEffect)((function(){if("me"==f)return b(t);fetch("/api/users/"+f).then(function(){var e=Object(p.a)(O.a.mark((function e(t){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,b(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[t]),Object(c.useEffect)((function(){var e=new URL(window.location);j.hasOwnProperty("id")&&"/user/me"==e.pathname&&(e.pathname="/user/".concat(j.id),window.history.replaceState({},"",e))}),[j]);var m=j.hasOwnProperty("err");if(!j.hasOwnProperty("id")||m)return Object(g.jsx)("div",{className:"container",children:Object(g.jsx)("h2",{children:m?"User not found":"Loading user..."})});var w=j.hasOwnProperty("uploadToken"),y=h(j.date),k=a.length>0?j.username+"'s Uploads":j.username+" has no uploads",U="/api/users/files/".concat(j.id);return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{id:"userpage",className:"container",children:[Object(g.jsxs)("div",{className:"userInfo",children:[Object(g.jsx)("h2",{children:d(j.username)}),Object(g.jsx)("div",{className:"userinfo-holder",children:Object(g.jsx)("span",{title:"Joined on",children:Object(g.jsxs)("p",{children:[Object(g.jsx)(x.a,{icon:v.a})," ",y]})})})]}),w&&Object(g.jsx)(S,{User:j})]}),j.canModerate&&Object(g.jsx)(I,{TargetUser:[j,b]}),w&&Object(g.jsx)(D,{gridImages:[a,s]}),Object(g.jsx)(N,{Title:k,Endpoint:U,GridImages:[a,s]})]})}n(48);var E=function(){return Object(g.jsxs)("h1",{className:"textlogo",translate:"no",children:["File",Object(g.jsx)("span",{children:"pouch"})]})};n(49);var L=function(e){var t=l("currentUser").hasOwnProperty("id");return Object(g.jsx)("header",{id:"pageHeader",children:Object(g.jsxs)("div",{id:"pageHeader-inner",children:[Object(g.jsx)(E,{}),Object(g.jsx)("a",{href:t?"/auth/logout":"/auth/discord",children:t?"Logout":"Login"})]})})};n(50);function C(){var e=l("currentUser"),t=Object(g.jsx)("a",{className:"stylized-btn",href:"/auth/discord",children:"Sign in"});return e.hasOwnProperty("id")&&(t=Object(g.jsx)(m.b,{to:"/user/me",className:"stylized-btn",children:"My Profile"})),Object(g.jsx)("body",{id:"hero",children:Object(g.jsxs)("div",{id:"hero-center",children:[Object(g.jsx)(E,{}),Object(g.jsx)("p",{children:"An Open Source Filehost"}),t]})})}var A=function(){!function(e,t){var n=Object(i.a)(t,2),c=n[0],r=n[1];o[e]={value:c,setValue:r},o[e]}("currentUser",Object(c.useState)({})),Object(c.useEffect)((function(){fetch("/api/users/me").then((function(e){return e.json()})).then((function(e){var t;t=e,o["currentUser"].setValue(t)}))}),[]);var e=Object(c.useCallback)((function(e){e&&e.classList.add("anim-me")}),[]);return Object(g.jsx)("div",{className:"App",ref:e,children:Object(g.jsx)(m.a,{children:Object(g.jsxs)(T.c,{children:[Object(g.jsx)(T.a,{exact:!0,path:"/",children:Object(g.jsx)(C,{})}),Object(g.jsxs)(T.a,{path:"/user/:userid?",children:[Object(g.jsx)(L,{}),Object(g.jsx)(P,{})]}),Object(g.jsxs)(T.a,{path:"/uploads",children:[Object(g.jsx)(L,{}),Object(g.jsx)(k,{})]}),Object(g.jsx)(T.a,{path:"*",children:Object(g.jsx)(U,{})})]})})})};s.a.render(Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(A,{})})}),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.d94697c0.chunk.js.map
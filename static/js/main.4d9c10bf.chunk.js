(this["webpackJsonpthe-shoppies"]=this["webpackJsonpthe-shoppies"]||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(0),a=n(13),i=n.n(a),l=(n(20),n(14)),r=n(6),j=(n(21),n(8)),d=n(29),h=n(28),o=n(25),b=n(26),O=n(27);function u(e){var t=e.setTitle,n=e.setPage;return Object(c.jsxs)("div",{children:[Object(c.jsx)("h5",{children:"Movie Title"}),Object(c.jsx)("input",{onChange:function(e){t(e.target.value),n(1)},type:"text",id:"textInput",placeholder:"Please enter a search query with 3+ characters",className:"w-100 p-3",style:{width:"100%"}})]})}function x(e){var t=e.title,n=e.page,a=e.setNominated,i=e.nominated,O=e.setPage,u=Object(s.useState)(null),x=Object(r.a)(u,2),m=x[0],p=x[1],g=Object(s.useState)(!1),f=Object(r.a)(g,2),y=f[0],v=f[1],N=Object(s.useState)(null),w=Object(r.a)(N,2),S=w[0],k=w[1];return Object(s.useEffect)((function(){t&&t.length>=3&&(v(!0),fetch("https://www.omdbapi.com/?s=".concat(t,"&apikey=b29472dd&type=movie&page=").concat(n)).then((function(e){return e.json()})).then(p).then((function(){return v(!1)})).catch(k))}),[n,t]),t.length<3?Object(c.jsx)("h5",{children:"Results"}):y?Object(c.jsx)("h5",{children:"Loading..."}):S?Object(c.jsx)("pre",{children:JSON.stringify(S,null,2)}):m?"False"===m.Response?Object(c.jsxs)("h5",{children:['No results for "',t,'"']}):Object(c.jsx)("div",{children:Object(c.jsxs)(d.a,{style:{minHeight:"800px"},className:"w-100",children:[Object(c.jsx)(d.a.Header,{children:Object(c.jsxs)(d.a.Title,{children:['Results for "',t,'"']})}),Object(c.jsx)(d.a.Body,{style:{padding:"0"},children:Object(c.jsx)(h.a,{variant:"flush",children:m.Search.map((function(e){return Object(c.jsx)(h.a.Item,{action:!0,variant:"light",children:Object(c.jsxs)(o.a,{className:"align-items-center",children:[Object(c.jsx)(b.a,{md:"auto",children:Object(c.jsx)(j.a,{onClick:function(){i.list.length<5&&a({list:[].concat(Object(l.a)(i.list),[e])})},disabled:i.list.includes(e)||i.list.length>=5,variant:"secondary",size:"sm",name:"nominate",value:e,children:"Nominate"})}),Object(c.jsxs)(b.a,{children:[e.Title," (",e.Year,")"]})]})},e.imdbID)}))})}),Object(c.jsx)(d.a.Footer,{children:Object(c.jsx)(o.a,{children:Object(c.jsx)(b.a,{style:{textAlign:"center"},children:Object(c.jsx)(j.a,{style:{textAlign:"center"},size:"sm",variant:"secondary",disabled:n>=m.totalResults/10,onClick:function(){return O(n+1)},children:"Next Page"})})})})]})}):null}function m(e){var t=e.nominated,n=e.setNominated;return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)(d.a,{style:{minHeight:"800px"},children:[Object(c.jsx)(d.a.Header,{children:Object(c.jsx)("h5",{children:"Nominations"})}),Object(c.jsx)(d.a.Body,{style:{padding:"0"},children:Object(c.jsx)(h.a,{variant:"flush",children:t.list.map((function(e){return Object(c.jsx)(h.a.Item,{action:!0,variant:"light",children:Object(c.jsxs)(o.a,{className:"align-items-center",children:[Object(c.jsx)(b.a,{md:"auto",children:Object(c.jsx)(j.a,{onClick:function(){return n({list:t.list.filter((function(t){return t!==e}))})},variant:"secondary",size:"sm",name:"remove",value:e.imdbID,children:"Remove"})}),Object(c.jsxs)(b.a,{children:[e.Title," (",e.Year,")"]})]})},e.imdbID)}))})}),Object(c.jsx)(d.a.Footer,{children:Object(c.jsx)(o.a,{children:Object(c.jsx)(b.a,{style:{textAlign:"center"},children:Object(c.jsx)(j.a,{style:{textAlign:"center"},size:"sm",variant:"secondary",disabled:!0,children:"Placeholder"})})})})]})})}var p=function(){var e=Object(s.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(s.useState)(1),l=Object(r.a)(i,2),j=l[0],d=l[1],h=Object(s.useState)({list:[]}),p=Object(r.a)(h,2),g=p[0],f=p[1];return document.body.style="background: #E9E9EC;",Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)(O.a,{children:[Object(c.jsx)(o.a,{children:Object(c.jsxs)(b.a,{className:"py-3",children:[Object(c.jsx)("h2",{children:"The Shoppies"}),Object(c.jsx)(u,{setTitle:a,setPage:d})]})}),Object(c.jsxs)(o.a,{className:"py-3",children:[Object(c.jsx)(b.a,{children:Object(c.jsx)(x,{title:n,page:j,setPage:d,setNominated:f,nominated:g})}),Object(c.jsx)(b.a,{children:Object(c.jsx)(m,{nominated:g,setNominated:f})})]})]})})};n(22);i.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.4d9c10bf.chunk.js.map
(this["webpackJsonpadmin-template"]=this["webpackJsonpadmin-template"]||[]).push([[54],{1245:function(e,t,a){"use strict";a.r(t);var i=a(3),n=a(19),r=a(0),c=a(607),s=a(577),o=a(160),d=a(608),b=a(573),j=a(584),u=a(596),l=a(598),m=a(165),x=a(215),h=a(700),O=a(602),f=a(631),p=a(24),v=a(27),g=a(166),W=a(45),C=a(55),y=a(1);t.default=function(){var e=Object(f.a)(),t=e.register,a=e.handleSubmit,R=(e.watch,e.formState.errors,Object(v.h)()),S=Object(r.useState)(!1),w=Object(n.a)(S,2),k=w[0],T=w[1],M=Object(C.d)(m.c.selectSubSectors),G=Object(C.c)();return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(x.a,{children:Object(y.jsx)("title",{children:"Activity"})}),Object(y.jsx)(O.a,{children:Object(y.jsx)(h.a,{})}),Object(y.jsx)(d.a,{maxWidth:"lg",children:Object(y.jsx)(b.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:Object(y.jsx)(b.a,{item:!0,xs:12,children:Object(y.jsx)("form",{onSubmit:a((function(e){T(!0),g.a.CreateActivity(e,(function(e,t){if(e)throw e;T(!1),t._id&&(G(W.a.UpdateCategoryTab("3")),R(p.a.WORK_PERMIT.PROJECT_CATEGORY.ROUTE,{replace:!0}))}))})),children:Object(y.jsxs)(c.a,{sx:{p:4},children:[Object(y.jsx)(o.a,{id:"modal-modal-title",variant:"h4",component:"h2",sx:{mb:4},children:"Activity Information"}),Object(y.jsxs)(b.a,{container:!0,spacing:3,display:"flex",alignItems:"flex-start",children:[Object(y.jsx)(b.a,{item:!0,md:6,children:Object(y.jsx)(j.a,Object(i.a)({required:!0,label:"Activity Name",sx:{width:1}},t("name",{required:"This is a required field"})))}),Object(y.jsx)(b.a,{item:!0,md:6,children:Object(y.jsx)(j.a,Object(i.a)(Object(i.a)({required:!0,label:"Sub Sector",sx:{width:1}},t("sub_sector",{required:"This is a required field"})),{},{select:!0,children:M.map((function(e){return Object(y.jsx)(u.a,{value:e._id,children:e.name})}))}))})]}),Object(y.jsx)(b.a,{container:!0,spacing:3,style:{marginTop:15,display:"flex",justifyContent:"space-around",alignItems:"center"},children:Object(y.jsxs)(b.a,{item:!0,md:12,style:{display:"flex",justifyContent:"center"},children:[Object(y.jsx)(s.a,{sx:{margin:1},variant:"contained",color:"primary",type:"submit",disabled:k,children:k?Object(y.jsx)(l.a,{}):"Create Activity"}),Object(y.jsx)(s.a,{sx:{margin:1},variant:"contained",color:"secondary",disabled:k,onClick:function(){G(W.a.UpdateCategoryTab("3")),R(p.a.WORK_PERMIT.PROJECT_CATEGORY.ROUTE,{replace:!0})},children:"Cancel"})]})})]})})})})})]})}},602:function(e,t,a){"use strict";var i=a(608),n=a(7),r=a(552),c=a(1),s=Object(n.a)(r.a)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4,0),";\n")}));t.a=function(e){var t=e.children;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)(s,{children:Object(c.jsx)(i.a,{maxWidth:"lg",children:t})})})}},607:function(e,t,a){"use strict";var i=a(2),n=a(5),r=a(0),c=(a(8),a(11)),s=a(213),o=a(7),d=a(16),b=a(582),j=a(117),u=a(136);function l(e){return Object(j.a)("MuiCard",e)}Object(u.a)("MuiCard",["root"]);var m=a(1),x=["className","raised"],h=Object(o.a)(b.a,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),O=r.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCard"}),r=a.className,o=a.raised,b=void 0!==o&&o,j=Object(n.a)(a,x),u=Object(i.a)({},a,{raised:b}),O=function(e){var t=e.classes;return Object(s.a)({root:["root"]},l,t)}(u);return Object(m.jsx)(h,Object(i.a)({className:Object(c.a)(O.root,r),elevation:b?8:void 0,ref:t,ownerState:u},j))}));t.a=O},608:function(e,t,a){"use strict";var i=a(4),n=a(5),r=a(2),c=a(0),s=(a(8),a(11)),o=a(213),d=a(16),b=a(7),j=a(117),u=a(136);function l(e){return Object(j.a)("MuiContainer",e)}Object(u.a)("MuiContainer",["root","disableGutters","fixed","maxWidthXs","maxWidthSm","maxWidthMd","maxWidthLg","maxWidthXl"]);var m=a(14),x=a(1),h=["className","component","disableGutters","fixed","maxWidth"],O=Object(b.a)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t["maxWidth".concat(Object(m.a)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}})((function(e){var t=e.theme,a=e.ownerState;return Object(r.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&Object(i.a)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,a){var i=t.breakpoints.values[a];return 0!==i&&(e[t.breakpoints.up(a)]={maxWidth:"".concat(i).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,a=e.ownerState;return Object(r.a)({},"xs"===a.maxWidth&&Object(i.a)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),a.maxWidth&&"xs"!==a.maxWidth&&Object(i.a)({},t.breakpoints.up(a.maxWidth),{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)}))})),f=c.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiContainer"}),i=a.className,c=a.component,b=void 0===c?"div":c,j=a.disableGutters,u=void 0!==j&&j,f=a.fixed,p=void 0!==f&&f,v=a.maxWidth,g=void 0===v?"lg":v,W=Object(n.a)(a,h),C=Object(r.a)({},a,{component:b,disableGutters:u,fixed:p,maxWidth:g}),y=function(e){var t=e.classes,a=e.fixed,i=e.disableGutters,n=e.maxWidth,r={root:["root",n&&"maxWidth".concat(Object(m.a)(String(n))),a&&"fixed",i&&"disableGutters"]};return Object(o.a)(r,l,t)}(C);return Object(x.jsx)(O,Object(r.a)({as:b,ownerState:C,className:Object(s.a)(y.root,i),ref:t},W))}));t.a=f},700:function(e,t,a){"use strict";var i=a(573),n=a(160),r=a(27),c=a(1);t.a=function(){Object(r.h)();return Object(c.jsx)(i.a,{container:!0,justifyContent:"space-between",alignItems:"center",children:Object(c.jsxs)(i.a,{item:!0,children:[Object(c.jsx)(n.a,{variant:"h3",component:"h3",gutterBottom:!0,children:"Sector"}),Object(c.jsxs)(n.a,{variant:"subtitle2",children:["Catherine Pike",", these are your sectors"]})]})})}}}]);
//# sourceMappingURL=54.6b2356f2.chunk.js.map
(this["webpackJsonpadmin-template"]=this["webpackJsonpadmin-template"]||[]).push([[21],{1173:function(e,t,n){},1174:function(e,t,n){"use strict";var a=n(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(32)),r=n(1),i=(0,c.default)((0,r.jsx)("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"}),"Settings");t.default=i},1259:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n(19),r=n(215),i=n(573),o=n(160),s=n(27),l=n(1),d=function(){Object(s.h)();return Object(l.jsx)(i.a,{container:!0,justifyContent:"space-between",alignItems:"center",children:Object(l.jsxs)(i.a,{item:!0,children:[Object(l.jsx)(o.a,{variant:"h3",component:"h3",gutterBottom:!0,children:"Manage Accounts"}),Object(l.jsxs)(o.a,{variant:"subtitle2",children:["Catherine Pike",", you can manage accounts here"]})]})})},u=n(602),j=n(608),b=n(603),m=n(607),O=n(28),h=n(0),f=n(29),p=n(552),x=n(621),g=n(587),y=n(577),v=n(559),E=n(1290),C=n(1291),D=n(1292),A=n(1293),T=n(1294),_=n(630),N=n(1295),R=n(564),S=n(594),I=n(1265),k=(n(606),n(1174)),w=n.n(k),P=n(299),M=n(579),L=n(571),F=n(560),B=n(7),V=n(609),W=n.n(V),z=n(614),U=n.n(z),K=Object(B.a)(y.a)((function(e){var t=e.theme;return"\n     background: ".concat(t.colors.error.main,";\n     color: ").concat(t.palette.error.contrastText,";\n\n     &:hover {\n        background: ").concat(t.colors.error.dark,";\n     }\n    ")}));var Y=function(){var e=Object(h.useState)(!1),t=Object(c.a)(e,2),n=t[0],a=t[1],r=Object(h.useRef)(null);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)(p.a,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[Object(l.jsxs)(p.a,{display:"flex",alignItems:"center",children:[Object(l.jsx)(o.a,{variant:"h5",color:"text.secondary",children:"Bulk actions:"}),Object(l.jsx)(K,{sx:{ml:1},startIcon:Object(l.jsx)(W.a,{}),variant:"contained",children:"Delete"})]}),Object(l.jsx)(S.a,{color:"primary",onClick:function(){a(!0)},ref:r,sx:{ml:2,p:1},children:Object(l.jsx)(U.a,{})})]}),Object(l.jsx)(P.a,{keepMounted:!0,anchorEl:r.current,open:n,onClose:function(){a(!1)},anchorOrigin:{vertical:"center",horizontal:"center"},transformOrigin:{vertical:"center",horizontal:"center"},children:Object(l.jsxs)(M.a,{sx:{p:1},component:"nav",children:[Object(l.jsx)(L.a,{button:!0,children:Object(l.jsx)(F.a,{primary:"Bulk delete selected"})}),Object(l.jsx)(L.a,{button:!0,children:Object(l.jsx)(F.a,{primary:"Bulk edit selected"})})]})})]})},H=n(598),G=n(570),$=n(118),J=n(55),q={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:420,backgroundColor:"background.paper",padding:5},Q=function(e){var t=e.isVisible,n=e.onClose,a=e.investment_permit,r=Object(h.useState)(!1),s=Object(c.a)(r,2),d=s[0],u=s[1];Object(J.c)();return Object(l.jsx)("div",{children:Object(l.jsx)(G.a,{open:t,onClose:n,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(l.jsx)(p.a,{sx:q,children:Object(l.jsxs)(o.a,{id:"modal-modal-title",variant:"h4",component:"h2",style:{marginBottom:15,marginTop:5},children:["Are you sure you want to delete ",a.company_name,Object(l.jsxs)(i.a,{container:!0,direction:"row",justifyContent:"space-around",alignItems:"stretch",spacing:3,children:[Object(l.jsx)(i.a,{item:!0,md:6,style:{display:"flex",justifyContent:"center"},children:Object(l.jsx)(y.a,{variant:"contained",sx:{margin:1},color:"primary",onClick:function(){u(!0),$.a.RemoveInvestmentPermit(a._id,(function(e,t){if(e)throw e;u(!1),t._id&&n()}))},disabled:d,children:d?Object(l.jsx)(H.a,{}):"Yes"})}),Object(l.jsx)(i.a,{item:!0,md:6,style:{display:"flex",justifyContent:"center"},children:Object(l.jsx)(y.a,{variant:"contained",sx:{margin:1},color:"secondary",onClick:n,disabled:d,children:"No"})})]})]})})})})},Z=n(168),X=(n(618),n(45)),ee=n(169),te=n(557),ne=n(584),ae=n(596),ce=n(613),re=n(628),ie=function(e){var t=e.isVisible,n=e.onClose,r=Object(h.useReducer)(ce.c,ce.b),s=Object(c.a)(r,2),d=s[0],u=s[1],j=["first_name","last_name","phone_number","gender","role","email","password"],b=Object(h.useState)(!1),m=Object(c.a)(b,2),O=m[0],f=m[1],x=function(e){f(!0),ee.a.PostAdmin({address:{city:"",country:"",sub_city:""},email:e.email,first_name:e.first_name,gender:e.gender,is_active:!0,last_name:e.last_name,password:e.password,phone_number:e.phone_number,role:e.role},(function(e,t){if(e)throw e;t._id&&n(t)}))};Object(h.useEffect)((function(){Object(ce.j)(j,x,u)}),[]);var v=function(e){return Object(ce.g)(e,d,u)};return Object(l.jsx)(G.a,{open:t,onClose:n,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(l.jsxs)(p.a,{className:"add-account-modal",children:[Object(l.jsx)(o.a,{variant:"h3",component:"h2",children:"Add an Account"}),Object(l.jsxs)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:[Object(l.jsx)(i.a,{item:!0,md:6,xs:12,style:{flex:1,marginRight:8},children:Object(l.jsxs)(g.a,{className:"flex-c",children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"First Name"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},v("first_name")))]})}),Object(l.jsx)(i.a,{item:!0,md:6,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Last Name"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},v("last_name")))]})})]}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",style:{width:"100%"},children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Phone number"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},v("phone_number")))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",style:{width:"100%"},children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Email"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},v("email")))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:25},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{fullWidth:!0,children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Gender"}),Object(l.jsx)(ne.a,Object(a.a)(Object(a.a)({variant:"outlined",sx:{mt:1},select:!0,value:10},v("gender")),{},{children:["FEMALE","MALE"].map((function(e){return Object(l.jsx)(ae.a,{value:e,children:e},e)}))}))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:25},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{fullWidth:!0,children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Role"}),Object(l.jsx)(ne.a,Object(a.a)(Object(a.a)({variant:"outlined",sx:{mt:1},select:!0,value:10},v("role")),{},{children:Object.values(re.a).map((function(e){return Object(l.jsx)(ae.a,{value:e,children:e},e)}))}))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",style:{width:"100%"},children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Password"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",type:"password",style:{marginTop:3}},v("password")))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:20},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsx)(g.a,{className:"flex-c",style:{width:"100%"},children:Object(l.jsx)(y.a,{className:"add-account-btn",onClick:function(){return Object(ce.d)(u)},disabled:O,children:O?Object(l.jsx)(H.a,{color:"success"}):"Add Account"})})})})]})})},oe=function(e){var t=e.isVisible,n=e.onClose,r=e.data,s=Object(h.useReducer)(ce.c,ce.b),d=Object(c.a)(s,2),u=d[0],j=d[1],b=["first_name","last_name","phone_number","role","email"],m=Object(h.useState)(!1),O=Object(c.a)(m,2),f=O[0],x=O[1],v=function(e){x(!0),ee.a.EditAdmin({_id:r._id,email:e.email,first_name:e.first_name,last_name:e.last_name,phone_number:e.phone_number,role:e.role},(function(e,t){if(e)throw e;t._id&&n(t)}))};Object(h.useEffect)((function(){Object(ce.j)(b,v,j)}),[]),Object(h.useEffect)((function(){ce.a.UpdateFormData(Object(ce.i)(b,r),j)}),[r]);var E=function(e){return Object(ce.g)(e,u,j)};return Object(l.jsx)(G.a,{open:t,onClose:n,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(l.jsxs)(p.a,{className:"add-account-modal",children:[Object(l.jsx)(o.a,{variant:"h3",component:"h2",children:"Edit Account"}),Object(l.jsxs)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:[Object(l.jsx)(i.a,{item:!0,md:6,xs:12,style:{flex:1,marginRight:8},children:Object(l.jsxs)(g.a,{className:"flex-c",children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"First Name"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},E("first_name")))]})}),Object(l.jsx)(i.a,{item:!0,md:6,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Last Name"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},E("last_name")))]})})]}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",style:{width:"100%"},children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Phone number"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},E("phone_number")))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:10},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{className:"flex-c",style:{width:"100%"},children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Email"}),Object(l.jsx)(ne.a,Object(a.a)({className:"default-input",variant:"outlined",style:{marginTop:3}},E("email")))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:25},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsxs)(g.a,{fullWidth:!0,children:[Object(l.jsx)(te.a,{id:"demo-radio-buttons-group-label",children:"Role"}),Object(l.jsx)(ne.a,Object(a.a)(Object(a.a)({variant:"outlined",sx:{mt:1},select:!0,value:10},E("role")),{},{children:Object.values(re.a).map((function(e){return Object(l.jsx)(ae.a,{value:e,children:e},e)}))}))]})})}),Object(l.jsx)(i.a,{container:!0,width:"100%",style:{marginTop:20},children:Object(l.jsx)(i.a,{item:!0,md:12,xs:12,children:Object(l.jsx)(g.a,{className:"flex-c",style:{width:"100%"},children:Object(l.jsx)(y.a,{className:"add-account-btn",onClick:function(){return Object(ce.d)(j)},disabled:f,color:"warning",children:f?Object(l.jsx)(H.a,{color:"success"}):"Edit Account"})})})})]})})},se=(n(1173),function(e){var t=e.cryptoOrders,n=Object(h.useState)([]),a=Object(c.a)(n,2),r=a[0],i=a[1],d=r.length>0,u=Object(h.useState)(0),j=Object(c.a)(u,2),b=j[0],k=j[1],P=Object(h.useState)(5),M=Object(c.a)(P,2),L=M[0],F=M[1],B=Object(h.useState)({status:null}),V=Object(c.a)(B,2),W=V[0],z=(V[1],function(e,t){return e.filter((function(e){var n=!0;return t.status&&e.status!==t.status&&(n=!1),n}))}(t,W)),U=function(e,t,n){return e.slice(t*n,t*n+n)}(z,b,L),K=r.length>0&&r.length<t.length,H=r.length===t.length,G=Object(f.a)(),$=Object(h.useState)(!1),q=Object(c.a)($,2),Z=(q[0],q[1],Object(h.useState)(!1)),te=Object(c.a)(Z,2),ne=te[0],ae=te[1],ce=Object(h.useState)({}),re=Object(c.a)(ce,2),se=re[0],le=(re[1],Object(s.h)(),Object(J.c)()),de=(Object(J.d)(X.b.selectUserRole),Object(h.useState)(!1)),ue=Object(c.a)(de,2),je=ue[0],be=ue[1],me=Object(h.useState)(!1),Oe=Object(c.a)(me,2),he=Oe[0],fe=Oe[1],pe=Object(h.useState)({}),xe=Object(c.a)(pe,2),ge=xe[0],ye=xe[1];return Object(l.jsxs)(m.a,{children:[je&&Object(l.jsx)(ie,{isVisible:je,onClose:function(e){e&&Object.keys(e).length>0&&le(ee.b.AddAdmins(e)),be(!1)}}),he&&Object(l.jsx)(oe,{isVisible:he,onClose:function(e){e&&Object.keys(e).length>0&&le(ee.b.UpdateAdmins(e)),fe(!1)},data:ge}),Object(l.jsx)(Q,{isVisible:ne,onClose:function(){return ae(!1)},investment_permit:se}),d&&Object(l.jsx)(p.a,{flex:1,p:2,children:Object(l.jsx)(Y,{})}),!d&&Object(l.jsx)(x.a,{action:Object(l.jsx)(p.a,{width:150,children:Object(l.jsx)(g.a,{fullWidth:!0,variant:"outlined",children:Object(l.jsx)(y.a,{className:"add-account-btn",onClick:function(){return be(!0)},children:"Add Account"})})}),title:"Manage user accounts"}),Object(l.jsx)(v.a,{}),Object(l.jsx)(E.a,{children:Object(l.jsxs)(C.a,{children:[Object(l.jsx)(D.a,{children:Object(l.jsxs)(A.a,{children:[Object(l.jsx)(T.a,{padding:"checkbox",children:Object(l.jsx)(_.a,{color:"primary",checked:H,indeterminate:K,onChange:function(e){i(e.target.checked?t.map((function(e){return e.id})):[])}})}),Object(l.jsx)(T.a,{children:"Full Name"}),Object(l.jsx)(T.a,{children:"Phone Number"}),Object(l.jsx)(T.a,{children:"Role"}),Object(l.jsx)(T.a,{align:"right",children:"Actions"})]})}),Object(l.jsx)(N.a,{children:U.map((function(e){var t=r.includes(e._id),n=e;return Object(l.jsxs)(A.a,{hover:!0,selected:t,children:[Object(l.jsx)(T.a,{padding:"checkbox",children:Object(l.jsx)(_.a,{color:"primary",checked:t,onChange:function(e){return t=n._id,void(r.includes(t)?i((function(e){return e.filter((function(e){return e!==t}))})):i((function(e){return[].concat(Object(O.a)(e),[t])})));var t},value:t})}),Object(l.jsxs)(T.a,{children:[Object(l.jsx)(o.a,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:"".concat(n.first_name," ").concat(n.last_name)}),Object(l.jsx)(o.a,{variant:"body2",color:"text.secondary",noWrap:!0,children:n.email})]}),Object(l.jsx)(T.a,{children:Object(l.jsx)(o.a,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:String(n.phone_number)})}),Object(l.jsx)(T.a,{children:Object(l.jsx)(o.a,{variant:"body2",color:"text.secondary",noWrap:!0,children:"".concat(n.role).replace("_"," ")})}),Object(l.jsx)(T.a,{align:"right",style:{display:"flex",alignItems:"center"},children:Object(l.jsx)(R.a,{title:"Configure Account",arrow:!0,children:Object(l.jsx)(S.a,{sx:{"&:hover":{background:G.colors.primary.lighter},color:G.palette.primary.main},color:"inherit",size:"small",onClick:function(){fe(!0),ye(n)},children:Object(l.jsx)(w.a,{})})})})]},n._id)}))})]})}),Object(l.jsx)(p.a,{p:2,children:Object(l.jsx)(I.a,{component:"div",count:z.length,onPageChange:function(e,t){k(t)},onRowsPerPageChange:function(e){F(parseInt(e.target.value))},page:b,rowsPerPage:L,rowsPerPageOptions:[5,10,25,30]})})]})});se.defaultProps={cryptoOrders:[]};var le=se,de=n(633),ue=function(e){var t=e.admins,n=[{id:"1",title:"Fiat Deposit",ageLimit:(new Date).getTime(),status:"completed",orderID:"VUVX709ET7BY",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:34.4565,amount:56787,cryptoCurrency:"ETH",currency:"$"},{id:"2",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,1).getTime(),status:"completed",orderID:"23M3UOG65G8K",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"3",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,5).getTime(),status:"failed",orderID:"F6JHK65MS818",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"4",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,55).getTime(),status:"completed",orderID:"QJFAI7N84LGM",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"5",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,56).getTime(),status:"pending",orderID:"BO5KFSYGC0YW",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"6",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,33).getTime(),status:"completed",orderID:"6RS606CBMKVQ",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"7",title:"Fiat Deposit",ageLimit:(new Date).getTime(),status:"pending",orderID:"479KUYHOBMJS",sourceName:"Bank Account",sourceDesc:"*** 1212",amountCrypto:2.346546,amount:234234,cryptoCurrency:"BTC",currency:"$"},{id:"8",title:"Paypal Withdraw",ageLimit:Object(de.a)(new Date,22).getTime(),status:"completed",orderID:"W67CFZNT71KR",sourceName:"Paypal Account",sourceDesc:"*** 1111",amountCrypto:3.345456,amount:34544,cryptoCurrency:"BTC",currency:"$"},{id:"9",title:"Fiat Deposit",ageLimit:Object(de.a)(new Date,11).getTime(),status:"completed",orderID:"63GJ5DJFKS4H",sourceName:"Bank Account",sourceDesc:"*** 2222",amountCrypto:1.4389567945,amount:123843,cryptoCurrency:"BTC",currency:"$"},{id:"10",title:"Wallet Transfer",ageLimit:Object(de.a)(new Date,123).getTime(),status:"failed",orderID:"17KRZHY8T05M",sourceName:"Wallet Transfer",sourceDesc:"John's Cardano Wallet",amountCrypto:765.5695,amount:7567,cryptoCurrency:"ADA",currency:"$"}];return Object(l.jsx)(m.a,{children:Object(l.jsx)(le,{cryptoOrders:t.map((function(e){return Object(a.a)(Object(a.a)({},n[0]),e)}))})})};t.default=function(){var e=Object(J.d)(Z.c.selectInvestmentPermitCancellations),t=Object(J.d)($.c.selectInvestmentPermits),n=Object(J.d)(ee.c.selectAdmins),o=Object(J.c)();Object(h.useEffect)((function(){ee.a.FetchAdmins((function(e,t){if(e)throw e;o(ee.b.setAdmins(t))})),Z.a.FetchInvestmentPermitCancellations({},(function(e,t){if(e)throw e;o(Z.b.setInvestmentPermitCancellations(t))}))}),[o]),Object(h.useEffect)((function(){$.a.FetchInvestmentPermits({},(function(e,t){if(e)throw e;o($.b.setInvestmentPermits(t))}))}),[o]);var s=Object(h.useState)([]),m=Object(c.a)(s,2),O=(m[0],m[1]);return Object(h.useEffect)((function(){var n=[];e.forEach((function(e){var c=t.findIndex((function(t){return String(t._id)===String(e.investment_id)}));c>=0&&n.push(Object(a.a)(Object(a.a)({},t[c]),e))})),O(n)}),[O,t,e]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(r.a,{children:Object(l.jsx)("title",{children:"Investment Permit"})}),Object(l.jsx)(u.a,{children:Object(l.jsx)(d,{})}),Object(l.jsx)(j.a,{maxWidth:"lg",children:Object(l.jsx)(i.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:Object(l.jsx)(i.a,{item:!0,xs:12,children:Object(l.jsx)(ue,{admins:n})})})}),Object(l.jsx)(b.a,{})]})}},602:function(e,t,n){"use strict";var a=n(608),c=n(7),r=n(552),i=n(1),o=Object(c.a)(r.a)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4,0),";\n")}));t.a=function(e){var t=e.children;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(o,{children:Object(i.jsx)(a.a,{maxWidth:"lg",children:t})})})}},603:function(e,t,n){"use strict";var a=n(552),c=n(608),r=n(7),i=n(1),o=Object(r.a)(a.a)((function(e){var t=e.theme;return"\n        border-radius: 0;\n        margin: ".concat(t.spacing(3)," 0;\n")}));t.a=function(){return Object(i.jsx)(o,{children:Object(i.jsx)(c.a,{maxWidth:"lg",children:Object(i.jsx)(a.a,{py:3,display:{xs:"block",md:"flex"},alignItems:"center",textAlign:{xs:"center",md:"left"},justifyContent:"space-between"})})})}},606:function(e,t,n){"use strict";var a=n(3),c=n(216),r=n(7),i=n(1),o=["className","color","children"],s=Object(r.a)("span")((function(e){var t=e.theme;return"\n      background-color: ".concat(t.colors.alpha.black[5],";\n      padding: ").concat(t.spacing(.5,1),";\n      font-size: ").concat(t.typography.pxToRem(13),";\n      border-radius: ").concat(t.general.borderRadius,";\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      max-height: ").concat(t.spacing(3),";\n      \n      &.MuiLabel {\n        &-primary {\n          background-color: ").concat(t.colors.primary.lighter,";\n          color: ").concat(t.palette.primary.main,"\n        }\n        \n        &-secondary {\n          background-color: ").concat(t.colors.secondary.lighter,";\n          color: ").concat(t.palette.secondary.main,"\n        }\n        \n        &-success {\n          background-color: ").concat(t.colors.success.lighter,";\n          color: ").concat(t.palette.success.main,"\n        }\n        \n        &-warning {\n          background-color: ").concat(t.colors.warning.lighter,";\n          color: ").concat(t.palette.warning.main,"\n        }\n              \n        &-error {\n          background-color: ").concat(t.colors.error.lighter,";\n          color: ").concat(t.palette.error.main,"\n        }\n        \n        &-info {\n          background-color: ").concat(t.colors.info.lighter,";\n          color: ").concat(t.palette.info.main,"\n        }\n      }\n")}));t.a=function(e){e.className;var t=e.color,n=void 0===t?"secondary":t,r=e.children,l=Object(c.a)(e,o);return Object(i.jsx)(s,Object(a.a)(Object(a.a)({className:"MuiLabel-"+n},l),{},{children:r}))}},613:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"f",(function(){return j})),n.d(t,"e",(function(){return b})),n.d(t,"h",(function(){return m})),n.d(t,"g",(function(){return O})),n.d(t,"a",(function(){return h})),n.d(t,"d",(function(){return f})),n.d(t,"j",(function(){return p})),n.d(t,"c",(function(){return x})),n.d(t,"i",(function(){return g}));var a=n(4),c=n(3),r={formData:{},errors:[],required_inputs:[],onSubmit:function(e){return null},dispatch:function(e){return null}},i="UPDATE_INPUT",o="UPDATE_ERRORS",s="SET_INPUTS",l="SET_CALLBACK",d="UPDATE_FORM_DATA",u="UPDATE_SINGLE_ERROR",j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0,n=e.errors.findIndex((function(e){return e.path===t}));return n>=0?e.errors[n]:{}},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0,n=Object.values(e.formData),a=Object.keys(e.formData),c=a.findIndex((function(e){return e===t}));return c>=0?n[c]:null},m=function(e){var t=e.name,n=e.formState,a=e.dispatch,r=e.isRequired,o=e.exactValue,s=e.disable,l=e.isCheckbox,d=n.errors.findIndex((function(e){return String(e.path)===String(t)})),u=Object.values(n.formData),j=Object.keys(n.formData),b=function(e){var t=j.findIndex((function(t){return String(t)===String(e)}));return t>=0?u[t]:""},m=d>=0&&r?Object(c.a)(Object(c.a)({},n.errors[d]),{},{name:t,onChange:function(e){var t=e.target,n=t.name,c=t.value;a({type:i,payload:{name:n,value:c}})},value:b(t)}):{name:t,onChange:function(e){var t=e.target,n=t.name,c=t.value;a({type:i,payload:{name:n,value:c}})},value:b(t)},O=o?Object(c.a)(Object(c.a)({},m),{},{checked:o===b(t),onChange:function(){a({type:i,payload:{name:t,value:o}})}}):m,h=s?Object(c.a)(Object(c.a)({},O),{},{onChange:function(){return{}}}):O;return l?Object(c.a)(Object(c.a)({},h),{},{onChange:function(){a({type:i,payload:{name:t,value:!Boolean(b(t))}})}}):h},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,n=arguments.length>2?arguments[2]:void 0,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=t.errors.findIndex((function(t){return String(t.path)===String(e)})),l=Object.values(t.formData),d=Object.keys(t.formData),u=function(e){var t=d.findIndex((function(t){return String(t)===String(e)}));return t>=0?l[t]:""},j=s>=0&&a?Object(c.a)(Object(c.a)({},t.errors[s]),{},{name:e,onChange:function(e){var t=e.target,a=t.name,c=t.value;n({type:i,payload:{name:a,value:c}})},value:u(e)}):{name:e,onChange:function(e){var t=e.target,a=t.name,c=t.value;n({type:i,payload:{name:a,value:c}})},value:u(e)},b=o?Object(c.a)(Object(c.a)({},j),{},{onChange:function(e){return{}}}):j;return b},h={UpdateFormInput:function(e,t){return t({type:i,payload:e})},UpdateFormData:function(e,t){return t({type:d,payload:e})},UpdateSingleError:function(e,t){return t({type:u,payload:e})}},f=function(e){e({type:o,payload:{}})},p=function(e,t,n){n({type:s,payload:e}),n({type:l,payload:t})},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i:var n=t.payload,j=n.name,b=n.value;return Object(c.a)(Object(c.a)({},e),{},{formData:Object(c.a)(Object(c.a)({},e.formData),{},Object(a.a)({},j,b))});case u:var m=t.payload,O=m.callback,h=m.path,f=m.message,p=O();return p?Object(c.a)(Object(c.a)({},e),{},{errors:e.errors.concat({path:h,error:!0,helperText:f})}):Object(c.a)(Object(c.a)({},e),{},{errors:e.errors.filter((function(e){return String(e.input)!==String(h)}))});case s:return Object(c.a)(Object(c.a)({},e),{},{required_inputs:t.payload});case l:return Object(c.a)(Object(c.a)({},e),{},{onSubmit:t.payload});case d:return Object(c.a)(Object(c.a)({},e),{},{formData:Object(c.a)(Object(c.a)({},e.formData),t.payload)});case o:var x=Object.keys(e.formData),g=Object.values(e.formData),y=[],v=[];return e.required_inputs.forEach((function(t){var n=x.findIndex((function(e){return String(e)===String(t)}));if(n<0)y.push({path:t,error:!0,helperText:"".concat(t," is required")});else if(g[n]&&""!==g[n]){var a=e.errors.findIndex((function(e){return String(e.path)===String(t)}));a>=0&&v.push(a)}})),0===y.filter((function(e,t){return v.findIndex((function(e){return e===t}))<0})).length&&Object.values(e.formData).length>=e.required_inputs.length&&e.onSubmit(e.formData),Object(c.a)(Object(c.a)({},e),{},{errors:y.filter((function(e,t){return v.findIndex((function(e){return e===t}))<0}))});default:return e}},g=function(e,t){var n={};return e.forEach((function(e){t[e]&&(n[e]=t[e])})),n}},614:function(e,t,n){"use strict";var a=n(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(32)),r=n(1),i=(0,c.default)((0,r.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVertTwoTone");t.default=i},618:function(e,t,n){"use strict";var a,c,r,i,o,s;n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s})),function(e){e.ACTIVE="ACTIVE",e.INACTIVE="INACTIVE"}(a||(a={})),function(e){e.MALE="MALE",e.FEMALE="FEMALE"}(c||(c={})),function(e){e.BIRR="BIRR",e.DOLLAR="DOLLAR"}(r||(r={})),function(e){e.SQUARE_METERS="SQUARE_METERS"}(i||(i={})),function(e){e.INSPECTOR="INSPECTOR",e.CASE_WORKER="CASE_WORKER",e.TEAM_LEADER="TEAM_LEADER",e.DIRECTOR="DIRECTOR"}(o||(o={})),function(e){e.DRAFTED="DRAFTED",e.ACCEPTED="ACCEPTED",e.REVIEWED="REVIEWED",e.VERIFIED="VERIFIED",e.APPROVED="APPROVED",e.RENEWED="RENEWED",e.CANCELLED="CANCELLED",e.SENT_COMPANY_NAME="SENT_COMPANY_NAME",e.APPROVED_COMPANY_NAME="APPROVED_COMPANY_NAME",e.SENT_NEW_COMPANY_NAME="SENT_NEW_COMPANY_NAME",e.REGISTERED_COMPANY_NAME="REGISTERED_COMPANY_NAME",e.SENT_BANK_SLIP="SENT_BANK_SLIP",e.ACCEPTED_BANK_SLIP="ACCEPTED_BANK_SLIP"}(s||(s={}))},628:function(e,t,n){"use strict";var a,c,r,i;n.d(t,"a",(function(){return r})),function(e){e.CREATE="CREATE",e.FETCH="FETCH",e.EDIT="EDIT",e.REMOVE="REMOVE"}(a||(a={})),function(e){e[e.SUCCESS=200]="SUCCESS",e[e.BAD_ARGS=400]="BAD_ARGS",e[e.NOT_FOUND=404]="NOT_FOUND"}(c||(c={})),function(e){e.CASE_WORKER="CASE_WORKER",e.TEAM_LEADER="TEAM_LEADER",e.DIRECTOR="DIRECTOR"}(r||(r={})),function(e){e.DRAFTED="DRAFTED",e.REVIEWED="REVIEWED",e.VERIFIED="VERIFIED",e.APPROVED="APPROVED"}(i||(i={}))},630:function(e,t,n){"use strict";var a=n(4),c=n(5),r=n(2),i=n(0),o=(n(8),n(213)),s=n(496),l=n(610),d=n(105),u=n(1),j=Object(d.a)(Object(u.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),b=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),m=Object(d.a)(Object(u.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),O=n(14),h=n(16),f=n(7),p=n(117),x=n(136);function g(e){return Object(p.a)("MuiCheckbox",e)}var y=Object(x.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),v=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],E=Object(f.a)(l.a,{shouldForwardProp:function(e){return Object(f.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.indeterminate&&t.indeterminate,"default"!==n.color&&t["color".concat(Object(O.a)(n.color))]]}})((function(e){var t,n=e.theme,c=e.ownerState;return Object(r.a)({color:n.palette.text.secondary},!c.disableRipple&&{"&:hover":{backgroundColor:Object(s.a)("default"===c.color?n.palette.action.active:n.palette[c.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==c.color&&(t={},Object(a.a)(t,"&.".concat(y.checked,", &.").concat(y.indeterminate),{color:n.palette[c.color].main}),Object(a.a)(t,"&.".concat(y.disabled),{color:n.palette.action.disabled}),t))})),C=Object(u.jsx)(b,{}),D=Object(u.jsx)(j,{}),A=Object(u.jsx)(m,{}),T=i.forwardRef((function(e,t){var n,a,s=Object(h.a)({props:e,name:"MuiCheckbox"}),l=s.checkedIcon,d=void 0===l?C:l,j=s.color,b=void 0===j?"primary":j,m=s.icon,f=void 0===m?D:m,p=s.indeterminate,x=void 0!==p&&p,y=s.indeterminateIcon,T=void 0===y?A:y,_=s.inputProps,N=s.size,R=void 0===N?"medium":N,S=Object(c.a)(s,v),I=x?T:f,k=x?T:d,w=Object(r.a)({},s,{color:b,indeterminate:x,size:R}),P=function(e){var t=e.classes,n=e.indeterminate,a=e.color,c={root:["root",n&&"indeterminate","color".concat(Object(O.a)(a))]},i=Object(o.a)(c,g,t);return Object(r.a)({},t,i)}(w);return Object(u.jsx)(E,Object(r.a)({type:"checkbox",inputProps:Object(r.a)({"data-indeterminate":x},_),icon:i.cloneElement(I,{fontSize:null!=(n=I.props.fontSize)?n:R}),checkedIcon:i.cloneElement(k,{fontSize:null!=(a=k.props.fontSize)?a:R}),ownerState:w,ref:t},S,{classes:P}))}));t.a=T},633:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(21),c=n(119),r=n(6);function i(e,t){Object(r.a)(2,arguments);var n=Object(a.a)(t);return Object(c.a)(e,-n)}}}]);
//# sourceMappingURL=21.59b46fcb.chunk.js.map
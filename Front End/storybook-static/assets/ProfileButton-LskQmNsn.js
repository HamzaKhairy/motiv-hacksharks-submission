import{j as e}from"./jsx-runtime-AgcCsxC8.js";import{r as f}from"./index-XiNr8FW2.js";const $=({isSchool:c=!1,height:i=70,onClick:n=()=>{}})=>{const s=i/2,a=.8,t=a*i;return e.jsxs("div",{onClick:()=>{n()},className:"container primary-text",style:{height:"".concat(i,"px"),width:"".concat(s*2,"px")},children:[e.jsx("div",{className:"semicircle",style:{width:"".concat(s,"px"),height:"".concat(i,"px"),borderRadius:"".concat(s,"px 0 0 ").concat(s,"px")}}),e.jsx("img",{src:"/defaults/pfp.png",alt:"Circular",className:"circular-image",style:{height:"".concat(t,"px"),width:"".concat(t,"px"),left:"".concat(i*(1-a)/2,"px")}}),e.jsx("div",{className:"semicircle",style:{width:"".concat(s,"px"),height:"".concat(i,"px"),borderRadius:"0 ".concat(s,"px ").concat(s,"px 0")}})]})},m=({isSchool:c=!1,version:i="toggleable",text:n="None",subtext:s="None",height:a=70,width:t=100,onClick:u=()=>{}})=>{const[p,x]=f.useState(c),l=a/2,r=.8,o=r*a;let d;const g=()=>{i==="toggleable"&&x(!p)};switch(p?d=(1-r)*a/2:d=t+(1-r)*a/2,i){case"image":return e.jsx($,{isSchool:c,version:i,text:n,subtext:s,height:a,width:t,onClick:u})}return e.jsxs("div",{onClick:()=>{u(),g()},className:"container primary-text",style:{height:"".concat(a,"px"),width:"".concat(t+l*2,"px")},children:[e.jsx("div",{className:"semicircle",style:{width:"".concat(l,"px"),height:"".concat(a,"px"),borderRadius:"".concat(l,"px 0 0 ").concat(l,"px")}}),e.jsxs("div",{className:"rectangle",style:{height:"".concat(a,"px"),width:"".concat(t,"px")},children:[e.jsx("img",{src:"/defaults/pfp.png",alt:"Circular",className:"circular-image",style:{height:"".concat(o,"px"),width:"".concat(o,"px"),left:"".concat(d,"px")}}),e.jsxs("div",{className:"circular-image",style:p?{textAlign:"left",left:"".concat(o*(2-r)+d,"px")}:{textAlign:"right",right:"".concat(o*(2-r),"px")},children:[e.jsx("div",{children:n}),e.jsx("div",{children:s})]})]}),e.jsx("div",{className:"semicircle",style:{width:"".concat(l,"px"),height:"".concat(a,"px"),borderRadius:"0 ".concat(l,"px ").concat(l,"px 0")}})]})};try{m.displayName="ProfileButton",m.__docgenInfo={description:"",displayName:"ProfileButton",props:{version:{defaultValue:{value:"toggleable"},description:"",name:"version",required:!1,type:{name:"enum",value:[{value:'"toggleable"'},{value:'"non-toggleable"'},{value:'"image"'}]}},isSchool:{defaultValue:{value:"false"},description:"",name:"isSchool",required:!1,type:{name:"boolean"}},text:{defaultValue:{value:"None"},description:"",name:"text",required:!1,type:{name:"string"}},subtext:{defaultValue:{value:"None"},description:"",name:"subtext",required:!1,type:{name:"string"}},height:{defaultValue:{value:"70"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"100"},description:"",name:"width",required:!1,type:{name:"number"}},onClick:{defaultValue:{value:"() => { }"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch(c){}export{m as P};

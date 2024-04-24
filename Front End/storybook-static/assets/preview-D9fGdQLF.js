var _=Object.freeze,x=Object.defineProperty;var E=(r,e)=>_(x(r,"raw",{value:_(e||r.slice())}));import{d as O}from"./index-tyk3ITKk.js";const{useMemo:f,useEffect:h}=__STORYBOOK_MODULE_PREVIEW_API__,{global:w}=__STORYBOOK_MODULE_GLOBAL__,{logger:A}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var p="backgrounds",{document:s,window:L}=w,T=()=>L.matchMedia("(prefers-reduced-motion: reduce)").matches,M,C=(r,e=[],a)=>{if(r==="transparent")return"transparent";if(e.find(t=>t.value===r))return r;let n=e.find(t=>t.name===a);if(n)return n.value;if(a){let t=e.map(o=>o.name).join(", ");A.warn(O(M||(M=E(['\n        Backgrounds Addon: could not find the default color "','".\n        These are the available colors for your story based on your configuration:\n        ',".\n      "])),a,t))}return"transparent"},B=r=>{(Array.isArray(r)?r:[r]).forEach(I)},I=r=>{var a;let e=s.getElementById(r);e&&((a=e.parentElement)==null||a.removeChild(e))},R=(r,e)=>{let a=s.getElementById(r);if(a)a.innerHTML!==e&&(a.innerHTML=e);else{let n=s.createElement("style");n.setAttribute("id",r),n.innerHTML=e,s.head.appendChild(n)}},G=(r,e,a)=>{var t;let n=s.getElementById(r);if(n)n.innerHTML!==e&&(n.innerHTML=e);else{let o=s.createElement("style");o.setAttribute("id",r),o.innerHTML=e;let i="addon-backgrounds-grid".concat(a?"-docs-".concat(a):""),d=s.getElementById(i);d?(t=d.parentElement)==null||t.insertBefore(o,d):s.head.appendChild(o)}},H=(r,e)=>{var c;let{globals:a,parameters:n}=e,t=(c=a[p])==null?void 0:c.value,o=n[p],i=f(()=>o.disable?"transparent":C(t,o.values,o.default),[o,t]),d=f(()=>i&&i!=="transparent",[i]),g=e.viewMode==="docs"?"#anchor--".concat(e.id," .docs-story"):".sb-show-main",u=f(()=>{let l="transition: background-color 0.3s;";return"\n      ".concat(g," {\n        background: ").concat(i," !important;\n        ").concat(T()?"":l,"\n      }\n    ")},[i,g]);return h(()=>{let l=e.viewMode==="docs"?"addon-backgrounds-docs-".concat(e.id):"addon-backgrounds-color";if(!d){B(l);return}G(l,u,e.viewMode==="docs"?e.id:null)},[d,u,e]),r()},Y=(r,e)=>{var y,v,k;let{globals:a,parameters:n}=e,t=n[p].grid,o=((y=a[p])==null?void 0:y.grid)===!0&&t.disable!==!0,{cellAmount:i,cellSize:d,opacity:g}=t,u=e.viewMode==="docs",c=n.layout===void 0||n.layout==="padded"?16:0,l=(v=t.offsetX)!=null?v:u?20:c,m=(k=t.offsetY)!=null?k:u?20:c,$=f(()=>{let b=e.viewMode==="docs"?"#anchor--".concat(e.id," .docs-story"):".sb-show-main",S=["".concat(d*i,"px ").concat(d*i,"px"),"".concat(d*i,"px ").concat(d*i,"px"),"".concat(d,"px ").concat(d,"px"),"".concat(d,"px ").concat(d,"px")].join(", ");return"\n      ".concat(b," {\n        background-size: ").concat(S," !important;\n        background-position: ").concat(l,"px ").concat(m,"px, ").concat(l,"px ").concat(m,"px, ").concat(l,"px ").concat(m,"px, ").concat(l,"px ").concat(m,"px !important;\n        background-blend-mode: difference !important;\n        background-image: linear-gradient(rgba(130, 130, 130, ").concat(g,") 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ").concat(g,") 1px, transparent 1px),\n         linear-gradient(rgba(130, 130, 130, ").concat(g/2,") 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ").concat(g/2,") 1px, transparent 1px) !important;\n      }\n    ")},[d]);return h(()=>{let b=e.viewMode==="docs"?"addon-backgrounds-grid-docs-".concat(e.id):"addon-backgrounds-grid";if(!o){B(b);return}R(b,$)},[o,$,e]),r()},K=[Y,H],P={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},F={[p]:null};export{K as decorators,F as globals,P as parameters};

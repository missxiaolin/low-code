import{_ as x,j as v,r as n,o as c,c as p,w as l,b as o,f as U,G as h,N as D,m as d,E as j}from"./index-DetiVU-M.js";const w=x({props:{config:{type:Object,default:()=>({})},customData:{type:Array,default:()=>[]}},setup(u,{emit:e,expose:i}){const a=v(null),r=v({activeKey:u.config&&u.config.activeKey?u.config.activeKey:"select",key:u.config&&u.config.key?u.config.key:"",value:u.config&&u.config.value?u.config.value:""});return i({}),{formRef:a,form:r,onFinish:y=>{e("save",r.value)}}}},[["render",function(u,e,i,a,r,y){const k=n("a-select-option"),b=n("a-select"),f=n("a-form-item"),s=n("a-tab-pane"),m=n("a-input"),g=n("a-tabs"),_=n("a-button"),K=n("a-form");return c(),p(K,{model:a.form,ref:"formRef",labelCol:{style:{width:"55px"}}},{default:l(()=>[o(g,{activeKey:a.form.activeKey,"onUpdate:activeKey":e[2]||(e[2]=t=>a.form.activeKey=t)},{default:l(()=>[o(s,{key:"select",tab:"\u53C2\u6570"},{default:l(()=>[o(f,{name:"key",label:"\u53D8\u91CF"},{default:l(()=>[o(b,{value:a.form.key,"onUpdate:value":e[0]||(e[0]=t=>a.form.key=t),getPopupContainer:t=>t.parentNode},{default:l(()=>[(c(!0),U(h,null,D(i.customData,(t,C)=>(c(),p(k,{key:C,value:t.key},{default:l(()=>[d(j(t.keyDesc),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","getPopupContainer"])]),_:1})]),_:1}),o(s,{key:"input",tab:"\u81EA\u5B9A\u4E49"},{default:l(()=>[o(f,{name:"routeType",label:"\u53D8\u91CF"},{default:l(()=>[o(m,{value:a.form.key,"onUpdate:value":e[1]||(e[1]=t=>a.form.key=t)},null,8,["value"])]),_:1})]),_:1})]),_:1},8,["activeKey"]),o(f,{name:"value",label:"\u503C"},{default:l(()=>[o(m,{value:a.form.value,"onUpdate:value":e[3]||(e[3]=t=>a.form.value=t)},null,8,["value"])]),_:1}),o(f,{class:"form-bottom-box"},{default:l(()=>[o(_,{type:"primary",onClick:a.onFinish},{default:l(()=>e[4]||(e[4]=[d("\u4FDD\u5B58")])),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])}]]);export{w as default};
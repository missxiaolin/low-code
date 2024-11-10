import{c as dedent}from"./vcc-BO4Wzkve.js";import{c as codeEditor}from"./postcss-Cz0Oouzh.js";import{_ as _export_sfc,q as prettier,t as babel,r as resolveComponent,o as openBlock,f as createBlock,w as withCtx,b as createVNode,a as createBaseVNode,e as createTextVNode,c as createElementBlock,A as toDisplayString,h as createCommentVNode}from"./index-DZ9k51ZZ.js";const example=dedent`{
        data() {
          return {
  
          };
        },
        watch: {
  
        },
  
        computed: {
  
        },
  
        methods: {
          
        },
};
        `,_sfc_main={props:["codeDialogVisible"],emits:["saveJSCode","update:codeDialogVisible"],components:{codeEditor:codeEditor},data:()=>({error:"",code:example,example:`${example}`}),methods:{updateLogicCode(e){if(e){const o="const a = ";this.code=prettier.format(o+e,{plugins:[babel]}).replace(o,"")}},handleClose(){this.$emit("update:codeDialogVisible",!1)},onSave(){const code=this.$refs.codeEditor.getEditorCode(),temp=code.replace(new RegExp(".+\\*\\/\\s*","gs"),"").replace(/\s+/g,"");try{const JSCodeInfo=eval(`(function(){return ${temp}})()`);this.$emit("saveJSCode",{JSCodeInfo:JSCodeInfo,JSCode:temp}),this.handleClose(),this.error=""}catch(error){this.error=error}}},watch:{},computed:{dialogVisible:{get(){return this.codeDialogVisible},set(){this.$emit("update:codeDialogVisible",!1)}}},fillter:{}},_hoisted_1={class:"js-bottom"},_hoisted_2={key:0,class:"error"};function _sfc_render(e,o,t,r,a,s){const d=resolveComponent("codeEditor"),i=resolveComponent("el-button"),c=resolveComponent("el-dialog");return openBlock(),createBlock(c,{title:"JS逻辑编辑",modelValue:s.dialogVisible,"onUpdate:modelValue":o[0]||(o[0]=e=>s.dialogVisible=e),width:"70%",top:"10vh","before-close":s.handleClose,center:!0},{default:withCtx((()=>[createVNode(d,{height:"65vh;",ref:"codeEditor",value:`export default ${a.code}`},null,8,["value"]),createBaseVNode("div",_hoisted_1,[createBaseVNode("div",null,[createVNode(i,{type:"primary",onClick:s.onSave},{default:withCtx((()=>[createTextVNode("确认修改")])),_:1},8,["onClick"]),a.error?(openBlock(),createElementBlock("div",_hoisted_2,"请检查语法错误："+toDisplayString(a.error),1)):createCommentVNode("",!0)])])])),_:1},8,["modelValue","before-close"])}const jsCodeEditorDialog=_export_sfc(_sfc_main,[["render",_sfc_render],["__scopeId","data-v-53c6c3e9"]]);export{jsCodeEditorDialog as default};

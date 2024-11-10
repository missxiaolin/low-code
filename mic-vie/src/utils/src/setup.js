export default function (ast) {
    const script =
      ast.parseOptions && ast.parseOptions.language === "vue"
        ? ast.find("<script></script>")
        : ast;
    script.find("return {}").replace("$_$:$_$", "let $_$ = ref($_$)");
    script
      .find("methods:{}")
      .replace("async $_$($$$0){$$$1}", "const $_$=async($$$0)=>{$$$1}")
      .replace("$_$($$$0){$$$1}", "const $_$=($$$0)=>{$$$1}")
      .replace("async $_$(){$$$}", "const $_$=async()=>{$$$}")
      .replace("$_$(){$$$}", "const $_$=()=>{$$$}");
    script
      .find("filters:{}")
      .replace("$_$:function($_$){$$$}", "const $_$=computed(($_$)=>{$$$})")
      .replace("$_$($_$){$$$}", "const $_$=computed(($_$)=>{$$$})");
    script
      .find("watch:{}")
      .replace("$_$:{handler($_$){$$$}}", "watch(()=>$_$,($_$)=>{$$$})")
      .replace("$_$:{handler(){$$$}}", "watch(()=>$_$,()=>{$$$})")
      .replace(
        "'$_$':{handler($_$){$$$},deep:true}",
        "watch(()=>$_$,($_$)=>{$$$},{deep:true})"
      )
      .replace("'$_$':{handler($_$){$$$}}", "watch(()=>$_$,($_$)=>{$$$})")
      .replace("$_$($_$){$$$}", "watch(()=>$_$,($_$)=>{$$$})")
      .replace("$_$(){$$$}", "watch(()=>$_$,()=>{$$$})");
    script
      .find("computed:{}")
      .replace("$_$(){$$$}", "const $_$ = computed(()=>{$$$})");
  
    script
      .replace("components:{}", "")
      .replace("mixins:[]", "")
      .replace("props:[$$$]", "const props =  defineProps([$$$])")
      .replace("data(){return{$$$}}", "$$$")
      .replace("created(){$$$}", "onBeforeMount(()=>{$$$})")
      .replace("mounted(){$$$}", "onMounted(()=>{$$$})")
      .replace("beforeUnmount(){$$$}", "onBeforeUnmount(()=>{$$$})")
      .replace("unmounted(){$$$}", "onUnmounted(()=>{$$$})")
      .replace("beforeDestroy(){$$$}", "onBeforeUnmount(()=>{$$$})")
      .replace("destoryed(){$$$}", "onUnmounted(()=>{$$$})")
      .replace("methods:{$$$}", "$$$")
      .replace("filters:{$$$}", "$$$")
      .replace("watch:{$$$}", "$$$")
      .replace("computed:{$$$}", "$$$")
      .replace("export default {$$$}", "$$$");
  
    return ast;
  };
  
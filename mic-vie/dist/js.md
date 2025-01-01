# vcc介绍

低代码平台


## 预处理阶段

在预处理阶段，VCC通过编译的手段将组件编译成为组件库。这个阶段会做两个事情：

- 给组件的每节点增加lc_id的属性。
- 输出以JSON结构表示组件的结构树。


## 代码获取

你可能会发现，在生成的代码文件中已经生成了data、methods，甚至是class。这是因为VCC在生成代码时会有一些特殊处理。这是为了防止某些声明重复书写。例如class，如果在template中声明了要使用某个class，那么我们一定会在style中定义这个class。同理可以推出data以及method具有同样的场景。所以，在编辑属性时，如果能将内容补充完全，那么VCC可以帮助你完成这些细碎的事情。

### 目前class的识别规则支持以空格分隔的选择器，例如：a b c。

符合class识别规则的值会生成一个空的样式声明，例如：

~~~
<div class="xxx yyy">Hi!</div>

.xxx {

}

.yyy {

}
~~~

### method的识别规则：

- 以v-on开头的
- 以@开头的
- 以及以下属性（可扩充）:
:before-close
:on-preview
:on-remove
:before-remove
:on-exceed
:on-success
:format
:before-upload

符合method的识别规则会生成一个箭头函数，并被放置在methods的声明中。

### data的识别规则：

- {{ Mustache }}
- 以及以下属性（可扩充）:
:prop
v-for
:data
:src
:model
:rules
:total
:current-page
v-model
v-if
:reverse
:show-file-list
:file-list

符合data的识别规则会生成一个值类型为字符串的空值定义。如果识别出来的key是VCC内置的好的，那么会把VCC内置好的定义输出在data中。这里可以参见el-table或el-form的输出。

## 二次编辑

二级编辑是一个强大的能力。它支持导入Vue代码继续编辑。

注意，在输入Vue代码时，要把输入框内的提示文字都清空，否则不能正常解析。

试用时可以将下面的代码粘贴到输入框查看效果：

~~~
<template>
  <div>
    <el-form inline lc-mark :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人" lc-mark>
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" lc-mark>
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button lc-mark>查询</el-button>
      <el-button lc-mark>重置</el-button>
    </el-form>
    <el-button lc-mark>新建</el-button>
    <el-table :data="tableData" style="width: 100%" lc-mark>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      lc-mark
      layout="total, sizes, prev, pager, next, jumper"
      :total="234"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {},
    data: () => {
      return {
        currentPage: 1,
        formInline: {
          user: "",
          region: "",
        },
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      }
    },
    watch: {},
    computed: {},
    beforeCreate: () => {},
    created: () => {},
    beforeMount: () => {},
    mounted: () => {},
    beforeUpdate: () => {},
    updated: () => {},
    destoryed: () => {},
    methods: {
      request: () => {},
      handleCurrentChange: () => {},
      handleSizeChange: () => {},
      onResetClick: () => {},
      query: () => {},
    },
    fillter: {},
  }
</script>

<style scoped>
  .container{}
  .demo-form-inline{}
</style>
~~~

## UI组件库集成

目前仅集成了部分组件库。组件库的集成希望可以通过开源的方式让大家自助添加。

基本的添加流程为：在 src/rawComponents 目录下建立以组件名为名称的文件夹(例如:element)，并在该文件夹内提供一个 index.vue 文件，然后再将此文件引入到 src/components/RawComponents.vue 文件中。

*.vue 文件建议以组件类型划分，例如 Button 类的组件就可以都放在 button.vue 文件中，然后由 index.vue 文件引用。这样 Button 的路径为:src/rawComponents/element/button.vue

当组件添加完毕后，需要给组件内的元素添加 lc-mark 的标志，这样这个组件才可以被拖拽。例如 element 的 Butto

~~~
<el-button lc-mark>默认按钮</el-button>
~~~

当一切就就绪后，需要对所有的组件进行重新编译才可以正常使用，需执行 npm run compileComponent 命令。此命令会对 src/rawComponents 下所有的组件进行重新编译。如果有不希望编译的，请在 src/script/compile.js 中修改 ignore 属性。
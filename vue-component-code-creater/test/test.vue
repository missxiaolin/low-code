<template id="I241tTjBxW">
  <div id="zCl4FgIRl9">
    <div id="+CRj/D0RC8">
      <div class="demonstration-element" id="4ceW3JOmRs">Radio 单选框</div>
      <el-radio-group v-model="radio" lc-mark id="DMj2/GoK7N">
        <el-radio :label="3" id="JrBcb85EaU">备选项</el-radio>
        <el-radio :label="6" id="5O5P7QlUYi">备选项</el-radio>
        <el-radio :label="9" lc-mark id="w7tJg6GgV7">备选项</el-radio>
      </el-radio-group>
    </div>
    <div id="d13At+cPIC">
      <div class="demonstration-element" id="z27BTxBIwt">Checkbox 多选框</div>
      <el-checkbox-group lc-mark v-model="checkList" id="zkxddgoQ6+">
        <el-checkbox label="复选框 A" id="S6r21W8/Xs"></el-checkbox>
        <el-checkbox label="复选框 B" id="Q1WcC01am0"></el-checkbox>
        <el-checkbox lc-mark label="复选框 C" id="hrGXBeyBDu"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div id="1HjTAfv0uh">
      <div class="demonstration-element" id="Qs45R/LgrF">Input 输入框</div>
      <div style="display: inline-block; width: 200px" lc-mark id="lN8dmG/ztm">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          id="Fw3s45j1XZ"
        ></el-input>
      </div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        lc-mark
        id="tqZz/MoCoc"
      ></el-input>
    </div>
    <div id="1HjTAfv0uh">
      <div class="demonstration-element" id="Qs45R/LgrF">
        InputNumber 计数器
      </div>
      <div style="display: inline-block; width: 200px" lc-mark id="lN8dmG/ztm">
        <el-input-number
          v-model="num"
          @change="handleChange"
          :min="1"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </div>
    </div>
    <div id="zbwOu2bRct">
      <div class="demonstration-element" id="oJjGK4yRpQ">Select 选择器</div>
      <el-select v-model="value" lc-mark placeholder="请选择" id="yhJlMNfb30">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          id="JJvJ1iFxYQ"
        >
        </el-option>
      </el-select>
    </div>
    <div id="YTa6ZVkK2O">
      <div class="demonstration-element" id="9C1zqqjX5s">
        Cascader 级联选择器
      </div>
      <el-cascader
        lc-mark
        v-model="value2"
        :options="options2"
        @change="handleChange"
        id="pU1PzPdszq"
      ></el-cascader>
    </div>
    <div id="8KaEHi1c6o">
      <div class="demonstration-element" id="C7c+xRjvGO">Switch 开关</div>
      <el-switch
        lc-mark
        v-model="value3"
        active-text="按月付费"
        inactive-text="按年付费"
        id="iq7ib7kTDA"
      ></el-switch>
    </div>
    <div id="TQoMaqMEjD">
      <div class="demonstration-element" id="ekUPB1BM+Y">Slider 滑块</div>
      <el-slider lc-mark v-model="value4" id="WOshXsu9bj"></el-slider>
    </div>
    <div id="7KI5xjoR7o">
      <div class="demonstration-element" id="surSrBUlOa">
        TimePicker 时间选择器
      </div>
      <el-time-select
        v-model="value5"
        lc-mark
        :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"
        placeholder="选择时间"
        id="tqTb7tAHV+"
      ></el-time-select>
    </div>
    <div id="RLf1n2FDPv">
      <div class="demonstration-element" id="yincHg7Y9a">
        DatePicker 日期选择器
      </div>
      <el-date-picker
        v-model="value6"
        lc-mark
        type="date"
        placeholder="选择日期"
        id="8JSaWCsEa4"
      ></el-date-picker>
    </div>
    <div id="6Jf5RcS8fq">
      <div class="demonstration-element" id="Wa7wZ81NAt">Upload 上传</div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        lc-mark
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        id="ge2lt0HYLd"
      >
        <el-button size="small" type="primary" id="b6m1sb7O2x"
          >点击上传</el-button
        >
        <div slot="tip" class="el-upload__tip" id="LWDRdD0K55">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div lc-mark style="max-width: 400px; font-size: 12px">
        用户头像上传:
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div lc-mark style="max-width: 400px; font-size: 12px">
        图片列表缩略图:
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <el-upload
        class="upload-demo"
        lc-mark
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <div id="jw86DSY6ad">
      <div class="demonstration-element" id="dcUniQFw32">Rate 评分</div>
      <el-rate v-model="value7" lc-mark show-text id="uahfpGzmNn"></el-rate>
    </div>
    <div id="/hnBVg18h5">
      <div class="demonstration-element" id="lTU7X3g7ba">
        ColorPicker 颜色选择器
      </div>
      <el-color-picker
        lc-mark
        v-model="color1"
        id="KSZuFYxYEA"
      ></el-color-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      imageUrl: "",
      color1: "#409EFF",
      checkList: ["选中且禁用", "复选框 A"],
      radio: 3,
      input: "",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: 0,

      value2: [],
      options2: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      value3: true,
      value4: 28,
      value5: "",
      value6: "",
      value7: 0,
    };
  },
  methods: {
    handleChange(value) {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 == 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    next() {},
    goBack() {
      console.log("go back");
    },
  },
};
</script>
<style scoped lang="scss">
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

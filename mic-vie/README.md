# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

### monaco-editor

```
monacoRef.value.editor.create(document.getElementById('container'), {
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: 'off', // 接受输入建议 "on" | "off" | "smart"
    accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    automaticLayout: true, // 自动布局
    codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
    codeLensFontFamily: '', // codeLens的字体样式
    codeLensFontSize: 13, // codeLens的字体大小
    colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
    comments: {
        ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
        insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    }, // 注释配置
    contextmenu: false, // 启用上下文菜单
    columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
    autoSurround: 'never', // 是否应自动环绕选择
    copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    cursorBlinking: 'smooth', // 光标动画样式
    cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    cursorStyle: 'line', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
    cursorWidth: 2, // <=25 光标宽度
    minimap: {
        enabled: false, // 是否启用预览图
    }, // 预览图设置
    scrollbar: {
        verticalScrollbarSize: 5,
        horizontalScrollbarSize: 5,
        arrowSize: 10,
        alwaysConsumeMouseWheel: false,
    },
    folding: false, // 是否启用代码折叠
    links: true, // 是否点击链接
    overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
    renderLineHighlight: 'gutter', // 当前行突出显示方式
    scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    readOnly: false, // 是否为只读模式
    lineNumbers: 'on',
    lineNumbersMinChars: 0,
    theme: 'vs', //官方自带三种主题vs, hc-black, or vs-dark
    value: props.code || '{}', //编辑器初始显示文字
    language: 'json',
    fontSize: 13,
    roundedSelection: true, // 右侧不显示编辑器预览框
    autoIndent: 'full',
    formatOnType: true,
    formatOnPaste: true
})
```

```
<script setup>
  // 导入monaco编辑器
  import * as monaco from 'monaco-editor';
  import {ref, onMounted, onUnmounted} from 'vue'

  // 编辑器容器div
  const editorContainer = ref(null);
  // 编辑器实列
  const editor = ref(null);
  // 编辑器内容
  const code = ref('')

  // 初始化编辑器
  onMounted(() => {
    if (editorContainer.value) {
      // 创建编辑器实列
      editor.value = monaco.editor.create(editorContainer.value, {
        value: `
        import * as monaco from'monaco-editor';
        import { ref, onMounted, onUnmounted } from 'vue'

        const editorContainer = ref(null);
        const editor = ref(null);

        onMounted(() => {
          if (editorContainer.value) {
            editor.value = monaco.editor.create(editorContainer.value, {
              value: '// 这里是初始代码',
              language: 'javascript',
              theme: 'vs-dark',
              readOnly: false
            });
          }
        });

        onUnmounted(() => {
          if (editor.value) {
            editor.value.dispose();
          }
        });

`, // 编辑器初始内容
        language: 'javascript', // 编辑器语言
        theme: 'vs-dark', // 编辑器主题 默认vs-dark VSCode 黑色主题,可选：vs、vs-dark、hc-black、hc-light
        readOnly: false, // 是否只读内容不可编辑
        readOnlyMessage:{value:"不可以修改哦",supportThemeIcons:true,supportHtml:true}, // 为只读时编辑内日提示词
        codeLens: true, // 代码透镜
        folding: true, // 代码折叠
        snippetSuggestions: 'inline', // 代码提示
        tabCompletion: 'on', // 代码提示按tab完成
        foldingStrategy: 'auto', // 折叠策略
        smoothScrolling: true, // 滚动动画
        // inDiffEditor: 是否在差异编辑器中使用
        // ariaLabel: 编辑器文本区域的无障碍标签
        // ariaRequired: 是否设置 aria-required 属性
        // screenReaderAnnounceInlineSuggestion: 是否立即宣布内联建议内容
        // tabIndex: 编辑器文本区域的 tabindex 属性
        // rulers: 指定位置渲染垂直线
        // wordSegmenterLocales: 用于词分割的语言
        // wordSeparators: 词导航时使用的分隔符
        // selectionClipboard: 启用 Linux 主剪贴板
        // lineNumbers: 控制行号的显示方式
        // cursorSurroundingLines: 控制光标周围的可见行数
        // cursorSurroundingLinesStyle: 控制何时强制执行 cursorSurroundingLines
        // renderFinalNewline: 渲染文件末尾的新行
        // unusualLineTerminators: 移除不寻常的行终止符
        // selectOnLineNumbers: 单击行号时选择相应行
        // lineNumbersMinChars: 控制行号的最小字符数
        // glyphMargin: 启用渲染图符边距
        // lineDecorationsWidth: 行装饰的宽度
        // revealHorizontalRightPadding: 水平方向显示光标时的虚拟填充
        // roundedSelection: 选择是否带有圆角
        // extraEditorClassName: 添加到编辑器的类名
        // readOnly: 编辑器是否只读
        // readOnlyMessage: 只读模式下的提示信息
        // domReadOnly: 输入文本框是否使用 DOM 的 readonly 属性
        // linkedEditing: 启用关联编辑
        // renderValidationDecorations: 是否渲染验证装饰
        // scrollbar: 控制滚动条的行为和渲染
        // stickyScroll: 控制粘性滚动选项
        // minimap: 控制最小地图的行为和渲染
        // find: 控制查找小部件的行为
        // fixedOverflowWidgets: 以 fixed 方式显示溢出小部件
        // overviewRulerLanes: 概览尺子应渲染的车道数
        // overviewRulerBorder: 是否绘制概览尺子边框
        // cursorBlinking: 光标闪烁风格
        // mouseWheelZoom: 使用鼠标滚轮结合 Ctrl 键缩放字体
        // mouseStyle: 鼠标指针样式
        // cursorSmoothCaretAnimation: 平滑光标动画
        // cursorStyle: 光标样式
        // cursorWidth: 光标宽度
        // fontLigatures: 启用字体连字
        // fontVariations: 启用字体变体
        // defaultColorDecorators: 是否使用默认颜色装饰
        // disableLayerHinting: 禁用编辑器层提示
        // disableMonospaceOptimizations: 禁用等宽字体优化
        // hideCursorInOverviewRuler: 是否在概览尺子中隐藏光标
        // scrollBeyondLastLine: 启用滚动到最后行
        // scrollBeyondLastColumn: 启用滚动到最后列
        // smoothScrolling: 启用平滑滚动
        // automaticLayout: 启用自动布局
        // wordWrap: 控制自动换行
        // wordWrapOverride1: 覆盖 wordWrap 设置
        // wordWrapOverride2: 覆盖 wordWrapOverride1 设置
        // wordWrapColumn: 换行列数
        // wrappingIndent: 控制换行的缩进
        // wrappingStrategy: 控制换行策略
        // wordWrapBreakBeforeCharacters: 换行前的字符
        // wordWrapBreakAfterCharacters: 换行后的字符
        // wordBreak: 控制单词换行
        // stopRenderingLineAfter: 停止渲染行的位置
        // hover: 配置编辑器的悬浮提示
        // links: 启用链接检测
        // colorDecorators: 启用内联颜色装饰
        // colorDecoratorsActivatedOn: 触发颜色选择器的条件
        // colorDecoratorsLimit: 内联颜色装饰的最大数量
        // comments: 控制编辑器中的注释行为
        // contextmenu: 启用自定义上下文菜单
        // mouseWheelScrollSensitivity: 鼠标滚轮滚动灵敏度
        // fastScrollSensitivity: 快速滚动速度
        // scrollPredominantAxis: 启用主要轴滚动
        // columnSelection: 启用列选择
        // multiCursorModifier: 添加多个光标的修饰键
        // multiCursorMergeOverlapping: 合并重叠的选择
        // multiCursorPaste: 配置粘贴多个文本时的行为
        // multiCursorLimit: 控制同时可以存在的最大文本光标数量
        // accessibilitySupport: 配置编辑器的无障碍支持
        // accessibilityPageSize: 屏幕阅读器可读取的行数
        // suggest: 建议选项
        // inlineSuggest: 内联建议选项
        // experimentalInlineEdit: 实验性内联编辑选项
        // smartSelect: 智能选择选项
        // gotoLocation: 跳转到位置选项
        // quickSuggestions: 启用快速建议
        // quickSuggestionsDelay: 快速建议显示延迟
        // padding: 控制编辑器的边距
        // parameterHints: 参数提示选项
        // autoClosingBrackets: 自动闭合括号的选项
        // autoClosingComments: 自动闭合注释的选项
        // autoClosingQuotes: 自动闭合引号的选项
        // autoClosingDelete: 自动闭合删除的选项
        // autoClosingOvertype: 自动闭合覆盖的选项
        // autoSurround: 自动环绕的选项
        // autoIndent: 控制自动缩进
        // stickyTabStops: 插入和删除空白时遵循制表符停止
        // formatOnType: 启用输入时格式化
        // formatOnPaste: 启用粘贴时格式化
        // dragAndDrop: 允许通过拖放移动选择
        // suggestOnTriggerCharacters: 在触发字符上弹出建议框
        // acceptSuggestionOnEnter: 在 Enter 键上接受建议的方式
        // acceptSuggestionOnCommitCharacter: 在提供者定义的字符上接受建议
        // snippetSuggestions: 启用片段建议
        // emptySelectionClipboard: 无选择时复制当前行
        // copyWithSyntaxHighlighting: 复制时包含语法高亮
        // suggestSelection: 建议的历史模式
        // suggestFontSize: 建议小部件的字体大小
        // suggestLineHeight: 建议小部件的行高
        // tabCompletion: 启用 Tab 完成
        // selectionHighlight: 启用选择高亮
        // occurrencesHighlight: 启用语义发生高亮
        // codeLens: 显示代码透镜
        // codeLensFontFamily: 代码透镜的字体系列
        // codeLensFontSize: 代码透镜的字体大小
        // lightbulb: 控制代码操作灯泡的行为
        // codeActionsOnSaveTimeout: 保存时运行代码操作的超时时间
        // folding: 启用代码折叠
        // foldingStrategy: 选择折叠策略
        // foldingHighlight: 启用折叠区域高亮
        // foldingImportsByDefault: 默认折叠导入区域
        // foldingMaximumRegions: 最大可折叠区域数
        // showFoldingControls: 折叠控制的显示方式
        // unfoldOnClickAfterEndOfLine: 单击折行后展开
        // matchBrackets: 启用匹配括号高亮
        // experimentalWhitespaceRendering: 实验性空白渲染
        // renderWhitespace: 渲染空白字符
        // renderControlCharacters: 渲染控制字符
        // renderLineHighlight: 渲染当前行高亮
        // renderLineHighlightOnlyWhenFocus: 仅当编辑器聚焦时渲染当前行高亮
        // useTabStops: 插入和删除空白时遵循制表符停止
        // fontFamily: 字体系列
        // fontWeight: 字体粗细
        // fontSize: 字体大小
        // lineHeight: 行高
        // letterSpacing: 字母间距
        // showUnused: 控制未使用变量的高亮
        // peekWidgetDefaultFocus: 默认聚焦预览窗口的小部件
        // placeholder: 编辑器为空时显示的占位符
        // definitionLinkOpensInPeek: 定义链接是否在预览窗口中打开
        // showDeprecated: 控制废弃变量的高亮
        // matchOnWordStartOnly: 是否允许单词中间匹配
        // inlayHints: 控制内联提示的行为和渲染

      });

      // 编辑器内容变更时回调
      editor.value.onDidChangeModelContent(() => {
        console.log('编辑器内容变更')
        // 获取编辑器内容
        // editor.value.getValue();
      })
    }
  });

  // 当组件被卸载时调用该回调函数
  onUnmounted(() => {
    // 检查 editor 是否已初始化
    if (editor.value) {
      // 清理 editor 资源，避免内存泄漏
      editor.value.dispose();
    }
  });

</script>

<template>
  <div ref="editorContainer" >
  </div>
</template>

<style scoped>
*{
  height: 100vh;
  width: 100vh;
}
</style>
```

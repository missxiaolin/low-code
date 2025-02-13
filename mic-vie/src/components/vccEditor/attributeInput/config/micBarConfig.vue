<template>
  <div class="attribute-input-collapse">
    <template v-if="type == 'component'">
      <mic-collapse-panel
        title="系列"
        v-model:value="config.series"
        @addItem="handleAddItem"
        @delItem="handleDelItem"
      >
        <template #default="slotProps">
          <micField label="系列名称：">
            <a-input v-model:value="slotProps.item.name"></a-input>
          </micField>
          <mic-panel title="颜色配置">
            <micField label="填充类型：">
              <a-radio-group
                optionType="button"
                v-model:value="slotProps.item.color.type"
                :options="fillTypes"
              ></a-radio-group>
            </micField>
            <micField
              v-if="slotProps.item.color.type === 'solid'"
              label="颜色："
            >
              <mic-color
                label="颜色"
                v-model:pureColor="slotProps.item.color.value"
                pickerContainer=".attribute-input-collapse"
              ></mic-color>
            </micField>
            <micField
              v-if="slotProps.item.color.type === 'gradient'"
              label="开始颜色："
            >
              <mic-color
                label="颜色"
                v-model:pureColor="slotProps.item.color.from"
                pickerContainer=".attribute-input-collapse"
              ></mic-color>
            </micField>
            <micField
              v-if="slotProps.item.color.type === 'gradient'"
              label="结束颜色："
            >
              <mic-color
                label="颜色"
                v-model:pureColor="slotProps.item.color.to"
                pickerContainer=".attribute-input-collapse"
              ></mic-color>
            </micField>
          </mic-panel>
        </template>
      </mic-collapse-panel>
      <mic-panel title="全局">
        <micField label="字体：">
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.global.fontFamily"
            :options="fontFamilys"
          ></a-select>
        </micField>
        <mic-field label="边距：" :span="2">
          <mic-number
            v-model:value="config.global.margin.top"
            prefix="px"
            label="顶部"
            classWrap="item-5"
          >
          </mic-number>
          <mic-number
            v-model:value="config.global.margin.bottom"
            prefix="px"
            label="底部"
            classWrap="item-5"
          >
          </mic-number>
          <mic-number
            v-model:value="config.global.margin.left"
            prefix="px"
            label="左侧"
            classWrap="item-5"
          >
          </mic-number>
          <mic-number
            v-model:value="config.global.margin.right"
            prefix="px"
            label="右侧"
            classWrap="item-5"
          >
          </mic-number>
        </mic-field>
        <mic-field label="组内间距：">
          <mic-number v-model:value="config.global.innerPadding" prefix="px">
          </mic-number>
        </mic-field>
        <mic-field label="组间间距：">
          <mic-number v-model:value="config.global.outerPadding" prefix="px">
          </mic-number>
        </mic-field>
        <mic-field label="柱子宽度：">
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.global.barWidth"
            :options="getOptions(selectSuggests, ['auto'])"
          ></a-select>
        </mic-field>
        <mic-panel
          v-model:checked="config.global.background.show"
          title="背景色"
        >
          <mic-field label="颜色：">
            <mic-color
              v-model:pureColor="config.global.background.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </mic-field>
        </mic-panel>
      </mic-panel>
      <mic-panel v-model:checked="config.label.show" title="柱子标注">
        <micField label="旋转角度：">
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.label.positio"
            :options="echartsLablePositions"
          >
          </a-select>
        </micField>
        <micField label="文本样式：" :span="2">
          <mic-number
            classWrap="item-5"
            v-model:value="config.label.textStyle.fontSize"
            label="字号"
          ></mic-number>
          <mic-select
            classWrap="item-5"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.label.textStyle.fontWeight"
            :options="fontWeights"
            label="字体粗细"
          ></mic-select>
          <mic-color
            classWrap="item-5"
            label="颜色"
            v-model:pureColor="config.label.textStyle.colorr"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <micField label="水平偏移：">
          <mic-number v-model:value="config.label.offsetX"></mic-number>
        </micField>
        <micField label="垂直偏移：">
          <mic-number v-model:value="config.label.offsetY"></mic-number>
        </micField>
      </mic-panel>
      <mic-panel v-model:checked="config.xAxis.show" title="X轴">
        <micField label="类型：">
          <a-radio-group
            v-model:value="config.xAxis.type"
            :options="axisTypes"
            optionType="button"
          ></a-radio-group>
        </micField>
        <micField label="两端留白：">
          <a-switch
            v-model:checked="config.xAxis.boundaryGap"
            class="mt5"
          ></a-switch>
        </micField>
        <mic-panel v-model:checked="config.xAxis.title.show" title="轴标题">
          <micField label="标题显示：">
            <a-input
              v-model:value="config.xAxis.title.name"
              class="mt5"
            ></a-input>
          </micField>
          <micField label="位置：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.title.location"
              :options="titleLocations"
            >
            </a-select>
          </micField>
          <micField label="相对偏移：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.title.display.rotate"
              prefix="度"
              label="旋转"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.title.display.offset"
              prefix="px"
              label="偏移"
            ></mic-number>
          </micField>
          <micField label="文本样式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.title.textStyle.fontSize"
              label="字号"
            ></mic-number>
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.title.textStyle.fontWeight"
              :options="fontWeights"
              label="字体粗细"
            ></mic-select>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.xAxis.title.textStyle.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.xAxis.axisLine.show" title="轴线">
          <micField label="类型：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLine.type"
              :options="lineStyles"
            ></a-select>
          </micField>
          <micField label="粗细：">
            <mic-number v-model:value="config.xAxis.axisLine.width" prefix="px">
            </mic-number>
          </micField>
          <micField label="颜色：">
            <mic-color
              v-model:pureColor="config.xAxis.axisLine.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.xAxis.axisTick.show" title="轴刻度">
          <micField label="类型：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisTick.type"
              :options="lineStyles"
            ></a-select>
          </micField>
          <micField label="粗细：">
            <mic-number v-model:value="config.xAxis.axisTick.width" prefix="px">
            </mic-number>
          </micField>
          <micField label="颜色：">
            <mic-color
              v-model:pureColor="config.xAxis.axisTick.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.xAxis.axisLabel.show" title="轴标签">
          <micField label="显示格式：" v-if="config.xAxis.type === 'value'">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLabel.valueFormat"
              :options="valueFormats"
            ></a-select>
          </micField>
          <micField label="显示格式：" v-if="config.xAxis.type === 'time'">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLabel.timeFormat"
              :options="timeFormats"
            ></a-select>
          </micField>
          <micField label="间隔：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLabel.interval"
              :options="getOptions(timeFormats, ['auto', '0', '1', '2'])"
            ></a-select>
          </micField>
          <micField label="展示方式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.axisLabel.display.rotate"
              prefix="度"
              label="旋转"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.axisLabel.display.margin"
              prefix="px"
              label="偏移"
            ></mic-number>
          </micField>
          <micField label="对齐方式：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLabel.align"
              :options="hAligns"
            ></a-select>
          </micField>
          <micField label="文本样式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.axisLabel.textStyle.fontSize"
              label="字号"
            ></mic-number>
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.axisLabel.textStyle.fontWeight"
              :options="fontWeights"
              label="字体粗细"
            ></mic-select>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.xAxis.axisLabel.textStyle.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.xAxis.grid.show" title="网格线">
          <micField label="文本样式：" :span="2">
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.xAxis.grid.line.type"
              :options="lineStyles"
              label="类型"
            >
            </mic-select>
            <mic-number
              classWrap="item-5"
              v-model:value="config.xAxis.grid.line.width"
              label="粗细"
              prefix="px"
            ></mic-number>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.xAxis.grid.line.color"
              pickerContainer=".attribute-input-collapse"
            >
            </mic-color>
            <mic-number
              v-if="config.xAxis.grid.line.type === 'dashed'"
              classWrap="item-5"
              v-model:value="config.xAxis.grid.line.dashedLength"
              label="长度"
              prefix="px"
            ></mic-number>
            <mic-number
              v-if="config.xAxis.grid.line.type === 'dashed'"
              classWrap="item-5"
              v-model:value="config.xAxis.grid.line.dashedSpace"
              label="间隔"
              prefix="px"
            ></mic-number>
          </micField>
        </mic-panel>
      </mic-panel>
      <mic-panel v-model:checked="config.yAxis.show" title="Y轴">
        <micField label="显示范围：" :span="2">
          <mic-select
            classWrap="item-5"
            label="最小值"
            v-model:value="config.yAxis.extent.min"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :options="getOptions(selectSuggests, ['auto', 'dataMin'])"
          ></mic-select>
          <mic-select
            classWrap="item-5"
            label="最大值"
            :options="getOptions(selectSuggests, ['auto', 'dataMax'])"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.yAxis.extent.max"
          ></mic-select>
        </micField>
        <micField label="标签数量：">
          <mic-number v-model:value="config.yAxis.splitNumber"></mic-number>
        </micField>
        <mic-panel v-model:checked="config.yAxis.title.show" title="轴标题">
          <micField label="标题显示：">
            <a-input v-model:value="config.yAxis.title.name"></a-input>
          </micField>
          <micField label="位置：">
            <a-select
              v-model:value="config.yAxis.title.location"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              :options="titleLocations"
            ></a-select>
          </micField>
          <micField label="展示方式：" :span="2">
            <mic-number
              classWrap="item-5"
              label="旋转"
              v-model:value="config.yAxis.title.display.rotate"
              prefix="度"
            >
            </mic-number>
            <mic-number
              classWrap="item-5"
              label="偏移"
              v-model:value="config.yAxis.title.display.offset"
              prefix="px"
            >
            </mic-number>
          </micField>
          <micField label="文本样式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.yAxis.title.textStyle.fontSize"
              label="字号"
            ></mic-number>
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.title.textStyle.fontWeight"
              :options="fontWeights"
              label="字体粗细"
            ></mic-select>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.yAxis.title.textStyle.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.yAxis.axisLine.show" title="轴线">
          <micField label="类型：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.axisLine.type"
              :options="lineStyles"
            ></a-select>
          </micField>
          <micField label="粗细：">
            <mic-number
              v-model:value="config.yAxis.axisLine.width"
              prefix="px"
            ></mic-number>
          </micField>
          <micField label="颜色：">
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.yAxis.axisLine.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.yAxis.axisTick.show" title="轴刻度">
          <micField label="类型：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.axisTick.type"
              :options="lineStyles"
            ></a-select>
          </micField>
          <micField label="粗细：">
            <mic-number
              v-model:value="config.yAxis.axisTick.width"
              prefix="px"
            ></mic-number>
          </micField>
          <micField label="颜色：">
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.yAxis.axisTick.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel v-model:checked="config.yAxis.axisLabel.show" title="轴标签">
          <micField label="显示格式：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model="config.yAxis.axisLabel.valueFormat"
              :options="valueFormats"
            ></a-select>
          </micField>
          <micField label="两端间距：">
            <mic-number
              v-model:value="config.yAxis.axisLabel.boundaryGap"
              prefix="%"
            >
            </mic-number>
          </micField>
          <micField label="展示方式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.yAxis.axisLabel.display.rotate"
              prefix="度"
              label="旋转"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="config.yAxis.axisLabel.display.margin"
              prefix="px"
              label="偏移"
            ></mic-number>
          </micField>
          <micField label="对齐方式：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.axisLabel.align"
              :options="hAligns"
            ></a-select>
          </micField>
          <micField label="文本样式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.yAxis.axisLabel.textStyle.fontSize"
              label="字号"
            ></mic-number>
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.axisLabel.textStyle.fontWeight"
              :options="fontWeights"
              label="字体粗细"
            ></mic-select>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.yAxis.axisLabel.textStyle.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel title="网格线" v-model:checked="config.yAxis.grid.show">
          <micField label="线型样式：" :span="2">
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.yAxis.grid.line.type"
              :options="lineStyles"
              label="类型"
            >
            </mic-select>
            <mic-number
              classWrap="item-5"
              v-model:value="config.yAxis.grid.line.width"
              label="粗细"
              prefix="px"
            ></mic-number>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.yAxis.grid.line.color"
              pickerContainer=".attribute-input-collapse"
            >
            </mic-color>
            <mic-number
              v-if="config.yAxis.grid.line.type === 'dashed'"
              classWrap="item-5"
              v-model:value="config.yAxis.grid.line.dashedLength"
              label="长度"
              prefix="px"
            ></mic-number>
            <mic-number
              v-if="config.yAxis.grid.line.type === 'dashed'"
              classWrap="item-5"
              v-model:value="config.yAxis.grid.line.dashedSpace"
              label="间隔"
              prefix="px"
            ></mic-number>
          </micField>
        </mic-panel>
      </mic-panel>
      <mic-panel v-model:checked="config.tooltip.show" title="提示框">
        <micField label="文本样式：" :span="2">
          <mic-number
            classWrap="item-5"
            v-model:value="config.tooltip.textStyle.fontSize"
            label="字号"
          ></mic-number>
          <mic-select
            classWrap="item-5"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.tooltip.textStyle.fontWeight"
            :options="fontWeights"
            label="字体粗细"
          ></mic-select>
          <mic-color
            classWrap="item-5"
            label="颜色"
            v-model:pureColor="config.tooltip.textStyle.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <mic-panel title="弹框背景">
          <micField label="背景边距：" :span="2">
            <mic-number
              classWrap="item-5"
              label="水平"
              v-model:value="config.tooltip.background.padding.h"
              prefix="px"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              label="垂直"
              v-model:value="config.tooltip.background.padding.h"
              prefix="px"
            ></mic-number>
          </micField>
          <micField label="背景色：">
            <mic-color
              v-model:pureColor="config.tooltip.background.padding.v"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
        <mic-panel
          v-model:checked="config.tooltip.pointer.show"
          title="轴指示器"
        >
          <micField label="线型样式 ：" :span="2">
            <mic-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              classWrap="item-5"
              label="类型"
              v-model:value="config.tooltip.pointer.line.type"
              :options="lineStyles"
            ></mic-select>
            <mic-number
              classWrap="item-5"
              label="粗细"
              v-model:value="config.tooltip.pointer.line.width"
              prefix="px"
            ></mic-number>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:value="config.tooltip.pointer.line.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
            <mic-number
              v-if="config.tooltip.pointer.line.type === 'dashed'"
              classWrap="item-5"
              label="长度"
              prefix="px"
              v-model:value="config.tooltip.pointer.line.dashedLength"
            ></mic-number>
            <mic-number
              v-if="config.tooltip.pointer.line.type === 'dashed'"
              classWrap="item-5"
              label="间距"
              prefix="px"
              v-model:value="config.tooltip.pointer.line.dashedSpace"
            ></mic-number>
          </micField>
        </mic-panel>
      </mic-panel>
      <mic-panel v-model:checked="config.legend.show" title="图例">
        <micField label="位置：">
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model="config.legend.position"
            :options="legendLocations"
          ></a-select>
        </micField>
        <micField label="布局方式：">
          <a-radio-group
            v-model="config.legend.orient"
            optionType="button"
            :options="orients"
          ></a-radio-group>
        </micField>
        <micField label="文本样式：" :span="2">
          <mic-number
            classWrap="item-5"
            v-model:value="config.legend.textStyle.fontSize"
            label="字号"
          ></mic-number>
          <mic-select
            classWrap="item-5"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.legend.textStyle.fontWeight"
            :options="fontWeights"
            label="字体粗细"
          ></mic-select>
          <mic-color
            classWrap="item-5"
            label="颜色"
            v-model:pureColor="config.legend.textStyle.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <mic-panel v-model:checked="config.legend.symbol.show" title="图例图标">
          <micField label="图标：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="config.legend.symbol.icon"
              :options="echartIcons"
            ></a-select>
          </micField>
          <micField label="宽度：">
            <mic-number
              v-model:value="config.legend.symbol.width"
              prefix="px"
            ></mic-number>
          </micField>
          <micField label="高度：">
            <mic-number
              prefix="px"
              v-model:value="config.legend.symbol.height"
            ></mic-number>
          </micField>
          <micField label="间隔：">
            <mic-number
              prefix="px"
              v-model:value="config.legend.symbol.gap"
            ></mic-number>
          </micField>
        </mic-panel>
        <mic-panel
          v-model:checked="config.legend.page.enabled"
          title="翻页功能"
        >
          <micField label="容器尺寸：" :span="2">
            <mic-number
              classWrap="item-5"
              prefix="px"
              v-model:value="config.legend.page.size.width"
              label="宽度"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              prefix="px"
              v-model:value="config.legend.page.size.height"
              label="高度"
            ></mic-number>
          </micField>
          <micField label="翻页按钮：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="config.legend.page.button.size"
              label="尺寸"
            ></mic-number>
            <mic-color
              v-model="config.legend.page.button.color"
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="config.legend.page.button.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
            <mic-color
              classWrap="item-5"
              label="禁用颜色"
              v-model:pureColor="config.legend.page.button.inactiveColor"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
          <micField label="页码颜色：">
            <mic-color
              v-model:pureColor="config.legend.page.pageNumColor"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
        </mic-panel>
      </mic-panel>
      <mic-panel title="动画">
        <micField label="持续时间：">
          <mic-number
            v-model:value="config.animation.duration"
            prefix="ms"
          ></mic-number>
        </micField>
        <micField label="缓动效果：">
          <a-select
            v-model:value="config.animation.easing"
            :options="animationEasings"
          ></a-select>
        </micField>
        <micField label="缓动效果：">
          <mic-number
            v-model:value="config.animation.delay"
            prefix="ms"
          ></mic-number>
        </micField>
      </mic-panel>
    </template>
    <template v-if="type == 'data'">
      <mic-panel title="字段映射：" :isExpand="true">
        <micField label="x：">
          <a-input v-model:value="config.dvField.x"></a-input>
        </micField>
        <micField label="y：">
          <a-input v-model:value="config.dvField.y"></a-input>
        </micField>
      </mic-panel>
    </template>
  </div>
</template>

<script>
import { barConfig } from "../../../echarts/config";
import {
  fontFamilys,
  selectSuggests,
  echartsLablePositions,
  fontWeights,
  axisTypes,
  titleLocations,
  lineStyles,
  valueFormats,
  timeFormats,
  hAligns,
  legendLocations,
  orients,
  echartIcons,
  fillTypes,
  animationEasings,
} from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "mic-bar-config",
  props: {
    type: {
      type: String,
      default: "component",
    },
  },
  setup(props) {
    const { config, getOptions } = rowVueInfo(barConfig);

    const handleAddItem = () => {
      config.value.series.push({
        type: "bar",
        id: `系列${config.value.series.length}_${uuid(7)}`,
        name: `系列${config.value.series.length}`,
        color: {
          type: "solid",
          value: "#00baff",
          from: "#fff",
          to: "#000",
        },
      });
    };

    const handleDelItem = () => {
      if (config.value.series.length === 1) {
        return;
      }
      config.value.series.splice(config.value.series.splice.length, 1);
    };

    return {
      config,
      getOptions,
      handleAddItem,
      handleDelItem,
      fontFamilys,
      selectSuggests,
      echartsLablePositions,
      fontWeights,
      axisTypes,
      titleLocations,
      lineStyles,
      valueFormats,
      timeFormats,
      hAligns,
      legendLocations,
      orients,
      echartIcons,
      fillTypes,
      animationEasings,
    };
  },
};
</script>

<style lang="scss" scoped>
.attribute-input-collapse {
  :deep(.ant-switch) {
    margin-left: 10px;
  }
}
</style>

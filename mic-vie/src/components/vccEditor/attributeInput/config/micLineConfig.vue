<template>
  <div class="attribute-input-collapse">
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
        <micField label="折线：" :span="2">
          <mic-select
            classWrap="item-5"
            label="类型"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="slotProps.item.line.color"
            :options="lineStyles"
          >
          </mic-select>
          <mic-number
            classWrap="item-5"
            label="粗细"
            prefix="px"
            v-model:value="slotProps.item.line.width"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            label="透明度"
            v-model:value="slotProps.item.line.opacity"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            label="曲线平滑程度"
            v-model:value="slotProps.item.line.smooth"
          ></mic-number>
          <mic-color
            classWrap="item-5"
            label="颜色"
            v-model:pureColor="slotProps.item.line.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <micField label="标记：" :span="2">
          <mic-select
            classWrap="item-5"
            label="符号"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="slotProps.item.point.icon"
            :options="echartIcons"
          ></mic-select>
          <mic-select
            classWrap="item-5"
            label="描边类型"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="slotProps.item.point.borderType"
            :options="lineStyles"
          ></mic-select>
          <mic-number
            classWrap="item-5"
            label="描边粗细"
            prefix="px"
            v-model:value="slotProps.item.point.borderWidth"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            label="透明度"
            v-model:value="slotProps.item.point.opacity"
          ></mic-number>
          <mic-color
            classWrap="item-5"
            label="填充色"
            v-model:pureColor="slotProps.item.point.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
          <mic-color
            classWrap="item-5"
            label="描边颜色"
            v-model:pureColor="slotProps.item.point.borderColor"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <mic-panel v-model:checked="slotProps.item.label.show" title="标注">
          <micField label="标注字段：">
            <mic-input
              label="标注字段"
              v-model:value="slotProps.item.label.field"
            >
            </mic-input>
          </micField>
          <micField label="数值格式：">
            <a-select
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="slotProps.item.label.valueFormat"
              :options="valueFormats"
            ></a-select>
          </micField>
          <micField label="前后缀：" :span="2">
            <mic-input
              classWrap="item-5"
              v-model:value="slotProps.item.label.describe.prefix"
              label="前缀"
            ></mic-input>
            <mic-input
              classWrap="item-5"
              v-model:value="slotProps.item.label.describe.suffix"
              label="后缀"
            ></mic-input>
          </micField>
          <micField label="相对偏移：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="slotProps.item.label.offset.x"
              prefix="px"
              label="水平"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="slotProps.item.label.offset.y"
              prefix="px"
              label="垂直"
            ></mic-number>
          </micField>
          <micField label="旋转角度：">
            <mic-number
              v-model:value="slotProps.item.label.rotate"
              prefix="度"
            ></mic-number>
          </micField>
          <micField label="文本样式：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="slotProps.item.label.textStyle.fontSize"
              label="字号"
            ></mic-number>
            <mic-select
              classWrap="item-5"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              v-model:value="slotProps.item.label.textStyle.fontWeight"
              :options="fontWeights"
              label="字体粗细"
            ></mic-select>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="slotProps.item.label.textStyle.color"
              pickerContainer=".attribute-input-collapse"
            ></mic-color>
          </micField>
          <micField label="描边：" :span="2">
            <mic-number
              classWrap="item-5"
              v-model:value="slotProps.item.label.stroke.width"
              label="粗细"
              prefix="px"
            ></mic-number>
            <mic-color
              classWrap="item-5"
              label="颜色"
              v-model:pureColor="slotProps.item.label.stroke.color"
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
      <micField label="边距：" :span="2">
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.margin.top"
          prefix="px"
          label="顶部"
        ></mic-number>
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.margin.bottom"
          prefix="px"
          label="底部"
        ></mic-number>
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.margin.left"
          prefix="px"
          label="左侧"
        ></mic-number>
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.margin.right"
          prefix="px"
          label="右侧"
        ></mic-number>
      </micField>
      <micField label="连接空数据：">
        <a-switch
          v-model:checked="config.global.connectNulls"
          class="mt8"
          size="small"
        />
      </micField>
    </mic-panel>
    <mic-panel title="X轴" v-model:checked="config.xAxis.show">
      <micField label="数据类型：">
        <a-radio-group
          v-model:value="config.xAxis.type"
          optionType="button"
          :options="axisTypes"
        ></a-radio-group>
      </micField>
      <micField
        v-if="config.xAxis.type === 'value'"
        label="显示范围："
        :span="2"
      >
        <mic-select
          classWrap="item-5"
          label="最小值"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          v-model:value="config.xAxis.extent.min"
          :options="selectSuggests"
        ></mic-select>
        <mic-select
          classWrap="item-5"
          label="最大值"
          :options="selectSuggests"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          v-model:value="config.xAxis.extent.max"
        ></mic-select>
      </micField>
      <micField label="两端留白：">
        <a-switch
          v-model:checked="config.xAxis.boundaryGap"
          class="mt8"
          size="small"
        />
      </micField>
    </mic-panel>
    <mic-panel title="Y轴" v-model:checked="config.yAxis.show">
      <micField label="数据类型：">
        <a-radio-group
          v-model:value="config.yAxis.type"
          optionType="button"
          :options="axisTypes"
        ></a-radio-group>
      </micField>
      <micField
        v-if="config.yAxis.type === 'value'"
        label="显示范围："
        :span="2"
      >
        <mic-select
          classWrap="item-5"
          label="最小值"
          v-model:value="config.yAxis.extent.min"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          :options="selectSuggests"
        ></mic-select>
        <mic-select
          classWrap="item-5"
          label="最大值"
          :options="selectSuggests"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          v-model:value="config.yAxis.extent.max"
        ></mic-select>
      </micField>
      <mic-panel v-model:checked="config.yAxis.title.show" title="轴标题">
        <micField label="标题名称：">
          <a-input v-model:value="config.yAxis.title.name"></a-input>
        </micField>
        <micField label="位置：">
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.yAxis.title.location"
            :options="titleLocations"
          ></a-select>
        </micField>
        <micField label="展示方式：" :span="2">
          <mic-number
            classWrap="item-5"
            v-model:value="config.yAxis.title.display.rotate"
            prefix="度"
            label="旋转"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            v-model:value="config.yAxis.title.display.offset"
            prefix="px"
            label="偏移"
          ></mic-number>
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
            v-model:pureColor="config.yAxis.axisTick.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
      </mic-panel>
      <mic-panel v-model:checked="config.yAxis.axisLabel.show" title="标签轴">
        <micField
          label="显示格式："
          v-if="config.yAxis.type === 'value'"
          tooltip="整数参照 d, 浮点参照 .1f"
        >
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.yAxis.axisLabel.valueFormat"
            :options="valueFormats"
          ></a-select>
        </micField>
        <micField
          v-if="config.yAxis.type === 'time'"
          label="显示格式："
          tooltip="时间请参照 YYYY/MM/DD HH:mm:ss"
        >
          <a-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.yAxis.axisLabel.timeFormat"
            :options="timeFormats"
          ></a-select>
        </micField>
        <micField label="两端间距：">
          <mic-number
            v-model:value="config.yAxis.axisLabel.boundaryGap"
            prefix="%"
          ></mic-number>
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
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            classWrap="item-5"
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
      <mic-panel v-model:checked="config.yAxis.grid.show" title="网格线">
        <micField label="线型样式：" :span="2">
          <mic-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            v-model:value="config.yAxis.grid.line.type"
            :options="lineStyles"
            classWrap="item-5"
            label="类型"
          ></mic-select>
          <mic-number
            v-model:value="config.yAxis.grid.line.width"
            classWrap="item-5"
            prefix="px"
            label="粗细"
          ></mic-number>
          <mic-color
            classWrap="item-5"
            label="颜色"
            v-model:pureColor="config.yAxis.grid.line.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
          <mic-number
            v-if="config.yAxis.grid.line.type === 'dashed'"
            v-model:value="config.yAxis.grid.line.dashedLength"
            prefix="px"
            classWrap="item-5"
            label="长度"
          ></mic-number>
          <mic-number
            v-if="config.yAxis.grid.line.type === 'dashed'"
            v-model:value="config.yAxis.grid.line.dashedSpace"
            prefix="px"
            classWrap="item-5"
            label="间距"
          ></mic-number>
        </micField>
      </mic-panel>
    </mic-panel>
    <mic-panel title="提示框">
      <micField label="触发方式：">
        <a-radio-group v-model:value="config.tooltip.triggerOn">
          <a-radio-button :value="'mousemove'">悬浮</a-radio-button>
          <a-radio-button :value="'click'">点击</a-radio-button>
        </a-radio-group>
      </micField>
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
        <micField label="触发方式：" :span="2">
          <mic-number
            classWrap="item-5"
            v-model:value="config.tooltip.background.padding.h"
            prefix="px"
            label="水平"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            v-model:value="config.tooltip.background.padding.v"
            prefix="px"
            label="垂直"
          ></mic-number>
        </micField>
        <micField label="背景色：">
          <mic-color
            v-model:pureColor="config.tooltip.background.color"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <micField label="边框颜色：">
          <mic-color
            v-model:pureColor="config.tooltip.background.borderColor"
            pickerContainer=".attribute-input-collapse"
          ></mic-color>
        </micField>
        <micField label="边框粗细：">
          <mic-number
            v-model:value="config.tooltip.background.borderWidth"
            prefix="px"
          ></mic-number>
        </micField>
      </mic-panel>
      <mic-panel v-model:checked="config.tooltip.pointer.show" title="轴指示器">
        <micField label="线型样式 ：" :span="2">
          <mic-select
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            classWrap="item-5"
            label="类型"
            v-model="config.tooltip.pointer.line.type"
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
    <mic-panel title="图例" v-model:checked="config.legend.show">
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
      <mic-panel v-model:checked="config.legend.page.enabled" title="翻页功能">
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
      <micField label="是否开启：">
        <a-radio-group v-model:value="config.animation.enabled">
          <a-radio-button :value="true">开启</a-radio-button>
          <a-radio-button :value="false">关闭</a-radio-button>
        </a-radio-group>
      </micField>
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
      <micField label="延迟：">
        <mic-number
          v-model:value="config.animation.delay"
          :options="animationEasings"
          prefix="ms"
        ></mic-number>
      </micField>
    </mic-panel>
  </div>
</template>

<script>
import { lineConfig } from "../../../echarts/config";
import {
  fontFamilys,
  fontWeights,
  axisTypes,
  selectSuggests,
  titleLocations,
  lineStyles,
  valueFormats,
  timeFormats,
  hAligns,
  legendLocations,
  orients,
  echartIcons,
  animationEasings,
} from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "mic-line-config",
  setup(props) {
    const { config } = rowVueInfo(lineConfig);

    const handleAddItem = () => {
      config.value.series.push({
        type: "line",
        id: `${uuid(7)}`,
        name: "",
        line: {
          color: "#34FFF5",
          style: "solid",
          width: 1,
          opacity: 1,
          smooth: 0.5,
        },
        point: {
          icon: "roundRect",
          color: "#34FFF5",
          borderColor: "rgba(0, 0, 0, 0.44)",
          borderWidth: 1,
          borderType: "solid",
          opacity: 1,
        },
        label: {
          show: false,
          field: "y",
          valueFormat: "auto",
          describe: {
            prefix: "",
            suffix: "",
          },
          offset: {
            x: 0,
            y: 0,
          },
          rotate: 0,
          textStyle: {
            fontSize: 12,
            color: "#ddd",
            fontWeight: "normal",
          },
          stroke: {
            color: "#000",
            width: 0,
          },
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
      handleAddItem,
      handleDelItem,
      fontWeights,
      axisTypes,
      selectSuggests,
      titleLocations,
      lineStyles,
      valueFormats,
      timeFormats,
      hAligns,
      legendLocations,
      orients,
      echartIcons,
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

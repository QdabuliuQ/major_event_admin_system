<template>
  <div id="mapChart"></div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import * as echarts from 'echarts';
import { getUserRegion } from '@/network/indexView';
import '@/assets/js/china.js' // 导入china.js配合地图显示

export default defineComponent({
  name: 'mapChart',
  setup() {
    const ec = echarts as any
    const data = reactive({})

    const option = {
      visualMap: {
        show: true,
        type: "piecewise",
        splitNumber: 4,
        itemWidth: 24,
        itemHeight: 12,
        itemGap: 5,
        textStyle: {
          color: "#999",
          fontSize: 12,
        },
        pieces: [// 图表参数
        {
          // 现存确诊
          min: 10000,
          color: "#40a1fc",
          label: "10000人以上",
        },
        {
          min: 1000,
          max: 9999,
          color: "#72b9fc",
          label: "1000-9999人",
        },
        {
          min: 100,
          max: 999,
          color: "#a4d2fd",
          label: "500-999人",
        },
        {
          min: 1,
          max: 99,
          color: "#cbe3fa",
          label: "1-99人",
        },
        {
          max: 0,
          min: 0,
          color: "#fbfbfb",
          label: "0人",
        }],
      },
      tooltip: {
        trigger: "item",
        triggerOn: "click",
        textStyle: {
          color: "#FFF", // 文字的颜色
          fontSize: "12", // 文字字体大小
        },
        padding: [7],
        backgroundColor: "rgba(0, 0, 0, 0.623)",
        borderColor: "transparent",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        formatter: function (params: any) {
          return (
            "地区：" +
            params.data.name +
            "<br>" +
            "注册用户：" +
            params.data.value + "人"
          );
        },
      },
      series: [
        {
          name: "",
          type: "map",
          mapType: "china",
          roam: false,
          zoom: 1.2,
          itemStyle: {
            normal: {
              label: {
                show: true,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 10,
                color: "#333",
              },
            },
            emphasis: {
              show: true,
            },
          },
          data: [],
        },
      ],
    }

    onMounted(() => {
      getUserRegion().then((res: any) => {
        option.series[0].data = res.data.data
        let chart = ec.init(document.getElementById('mapChart'));
        chart.setOption(option)
      })
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#mapChart {
  width: 100%;
  height: 100%;
}
</style>
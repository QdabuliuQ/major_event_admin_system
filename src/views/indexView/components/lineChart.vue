<template>
  <div id="lineChart"></div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import * as echarts from 'echarts';
import { getRegisterData } from "@/network/indexView";

export default defineComponent({
  name: 'lineChart',
  setup() {
    const ec = echarts as any
    const data = reactive({})

    let option = {
      grid: {
        top: '2%'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b} 用户注册数：{c}',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      color: ['#499afc'],
      xAxis: {
        type: 'category',
        data: <any>[],
        axisTick: {
          show: false
        },
        axisLabel: {
          rotate: '50'
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: <any>[],
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: ec.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          }
        }
      ]
    }

    onMounted(() => {
      getRegisterData().then((res: any) => {
        for (let item of res.data.data) {
          option.xAxis.data.push(item.days)
          option.series[0].data.push(item.count)
        }
        let chart = ec.init(document.getElementById('lineChart'));
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
#lineChart {
  width: 100%;
  height: 100%;
}
</style>
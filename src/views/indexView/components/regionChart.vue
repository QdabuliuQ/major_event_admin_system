<template>
  <div id="regionChart"></div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from 'vue'
import * as echarts from 'echarts';
import { getUserRegion } from '@/network/indexView';

export default defineComponent({
  name: 'regionChart',
  setup(props) {
    const ec = echarts as any
    const data = reactive({})

    let option: any = {
      title: {
        text: '用户分布',
        bottom: 4,
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}-用户数量：{c}'
      },
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      legend: {
        top: '1%',
        type: 'scroll',
        left: 'center'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          labelLine: {
            show: true
          },
          data: []
        }
      ]
    }

    onMounted(() => {
      getUserRegion().then((res: any) => {
        option.series[0].data = res.data.data

        let chart = ec.init(
          document.getElementById("regionChart") as HTMLDivElement
        );
        console.log(chart);
        
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
#regionChart {
  width: 100%;
  height: 300px;
}
</style>
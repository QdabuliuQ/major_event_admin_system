<template>
  <div id="indexView">
    <div class="item_1 cardItem">
      <dataPanel :panel-data="websiteData" />
    </div>
    <div class="row_2">
      <div class="cardItem">
        <span class="cardTitle">
          <div class="titleLeft">
            <el-icon>
              <Promotion />
            </el-icon>后台公告
          </div>
          <div class="titleRight">
            <el-icon @click="router.push('/noticeList/1')">
              <MoreFilled />
            </el-icon>
          </div>
        </span>
        <noticeList @itemClick="itemClick" :list="backNotice" type="1" :title="'title'" :is_top="'is_top'" :time="'time'" />
      </div>
      <div class="cardItem">
        <span class="cardTitle">
          <div class="titleLeft">
            <el-icon>
              <Promotion />
            </el-icon>前台公告
          </div>
          <div class="titleRight">
            <el-icon @click="router.push('/noticeList/2')">
              <MoreFilled />
            </el-icon>
          </div>
        </span>
        <noticeList @itemClick="itemClick" :list="receNotice" type="2" :title="'title'" :is_top="'is_top'" :time="'time'" />
      </div>
      <div class="cardItem">
        <div style="width: 100%; height: 100%" id="lineChartContainer_1"></div>
      </div>
    </div>
    <div class="row_3">
      <div class="cardItem">
        <regionChart />
      </div>
      <div class="cardItem">
        <mapChart />
      </div>
      <div class="cardItem">
        <lineChart />
      </div>
    </div>
  </div>
  <el-drawer class="noticeDrawerClass" v-model="drawer" :size="'40%'" :direction="'rtl'">
    <template #header>
      <h4>查看公告</h4>
    </template>
    <template #default>
      <noticeContent 
        v-if="tmpData"
        :title="tmpData.title" 
        :pub_name="tmpData.nickname" 
        :pub_id="tmpData.pub_id"
        :time="proxy.$moment(tmpData.time).format('YYYY-MM-DD HH:mm:ss')"
        :content="tmpData.content" />
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import * as echarts from 'echarts';
import { useRouter } from "vue-router";
import { defineComponent, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { InitData } from "@/types/indexView/indexView";
import { MoreFilled, Promotion } from '@element-plus/icons-vue';
import { getWebsiteData, getCateData, getBackNoticeList, getReceNoticeList } from "@/network/indexView";
import dataPanel from "./components/dataPanel.vue";
import noticeList from "./components/noticeList.vue";
import regionChart from "./components/regionChart.vue";
import mapChart from "./components/mapChart.vue";
import lineChart from "./components/lineChart.vue";
import noticeContent from "@/components/noticeContent.vue";

export default defineComponent({
  name: 'indexView',
  components: {
    dataPanel,
    noticeList,
    regionChart,
    mapChart,
    lineChart,
    noticeContent
  },
  setup() {
    const ec = echarts as any
    const router = useRouter()
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())
    let lineChart_1_config = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      legend: {},
      grid: {
        top: '1%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: []
      },
      series: {
        name: '',
        type: 'bar',
        data: []
      }
    }

    const getData = () => {
      getWebsiteData().then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取网站数据失败',
            type: 'error'
          })
        }
        let arr = [
          {
            title: '文章发布',
            total: res.data.data.art_total,
            icon: 'Document',
            add: res.data.data.art_total - res.data.data.art_yest
          },
          {
            title: '视频发布',
            total: res.data.data.video_total,
            icon: 'VideoPlay',
            add: res.data.data.video_total - res.data.data.video_yest
          },
          {
            title: '文章评论发布',
            total: res.data.data.art_comment_total,
            icon: 'ChatLineRound',
            add: res.data.data.art_comment_total - res.data.data.art_comment_yest
          },
          {
            title: '视频评论发布',
            total: res.data.data.video_comment_total,
            icon: 'ChatDotSquare',
            add: res.data.data.video_comment_total - res.data.data.video_comment_yest
          },
          {
            title: '文章总点赞量',
            total: res.data.data.art_praise_total,
            icon: 'CircleCheck',
            add: res.data.data.art_praise_total - res.data.data.art_praise_yest
          },
          {
            title: '视频总点赞量',
            total: res.data.data.video_praise_total,
            icon: 'CircleCheck',
            add: res.data.data.video_praise_total - res.data.data.video_praise_yest
          },
        ]
        data.websiteData = arr
      })

      getBackNoticeList({
        offset: 1
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取后台公告失败',
            type: 'error'
          })
        }
        data.backNotice = res.data.data
      })

      getReceNoticeList({
        offset: 1
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取前台公告失败',
            type: 'error'
          })
        }
        data.receNotice = res.data.data
      })

      getCateData().then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取分类数据失败',
            type: 'error'
          })
        }
        let chart = ec.init(document.getElementById('lineChartContainer_1') as HTMLDivElement);
        let yAxisData: any = [], xAxisData: any = []
        for (let item of res.data.data) {
          yAxisData.push(item.name)
          xAxisData.push(item.count)
        }
        lineChart_1_config.yAxis.data = yAxisData
        lineChart_1_config.series.data = xAxisData

        chart.setOption(lineChart_1_config)
        data.cateData = res.data.data
      })

    }
    getData()

    const itemClick = (e: {index: number, type: string}) => {
      data.tmpData = e.type == '1' ? data.backNotice[e.index] : data.receNotice[e.index]
      data.drawer = true
    }

    return {
      router,
      itemClick,
      MoreFilled,
      Promotion,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#indexView {
  width: 100%;
  display: grid;

  .item_1 {
    margin-bottom: 20px;
  }

  .cardItem {
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

    .cardTitle {
      display: block;
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .titleLeft {
        display: flex;
        align-items: center;
      }
      .titleRight {
        .el-icon {
          cursor: pointer;
        }
      }

      .el-icon {
        color: #499afc;
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }

  .row_2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
  }

  .row_3 {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
  }
}
</style>
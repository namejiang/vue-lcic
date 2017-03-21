<template>
    <div class="home-chart">
        <!--边框样式-->
        <home-border></home-border>
        <div class="chart">
            <div class="chart-nav">
                <ul>
                    <span class="state-left"></span>
                    <span class="state-right"></span>
                    <li v-for="(nav, key) in chart_nav.nav" :class="{'active': nav.active}" :init="[nav.init]" @click="echart_click(key)"><span>{{ nav.title }}</span></li>
                </ul>
            </div>
            <div class="chart-box">
                <ol>
                    <li v-for="(bodys, key) in chart_nav.body" :class="{'active': chart_nav.nav[key].active}">
                        <span v-for="body in bodys" v-show="body.time" class="time">
                            <span>时间段：</span>
                            <span class="time-input">
                                <input type="text" id="time_start">-
                                <input type="text" id="time_end">
                            </span>
                        </span> 
                        <div v-for="body in bodys" :id='body.id'></div>
                    </li>
                </ol>
                <div class="overY">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import $ from 'jquery'
import homeBorder from './../../component/home/home-border'

export default {
  name: 'home-chart',
  components: { homeBorder },
  props: [ 'sort' ],
  data () {
    return {
      chart_nav: require('./../../component/echart/JSON/echart-nav' + this.sort + '.json'),
      echart_option: require('./../../component/echart/JSON/echart-option.json'),
      chart: Object
    }
  },
  mounted () {
    this.$nextTick(() => {
      $.each(this.chart_nav.nav, (item, nav) => {
        nav.init = false
      })
      this.echart_click(0)
    })
  },
  methods: {
    echart_init (key) {
      const box = $('.chart-box li').eq(key).find('>div')
      this.chart_nav.nav[key].init = true
      for (let j = 0; j < box.length; j++) {
        let id = this.chart_nav.body[key][j].id
        let option = this.chart_nav.body[key][j].option
        // echarts  init
        this.chart[id] = echarts.init(box[j])
        $.each(option, (item, data) => {
          option[item] = typeof (data) === 'object' ? data : this.echart_option[data]
        })
        this.chart[id].setOption(option)
      }
    },
    echart_click (key) {
      for (let i = 0; i < this.chart_nav.nav.length; i++) {
        this.chart_nav.nav[i].active = false
      }
      this.chart_nav.nav[key].active = true
      // 图表是否初始化
      let init = this.chart_nav.nav[key].init
      console.log(this.chart_nav.body)
      if (!init) {
        setTimeout(() => {
          this.echart_init(key)
        })
      }
      // 请求图表数据
      const box = $('.chart-box li').eq(key).find('>div')
      for (let j = 0; j < box.length; j++) {
        let id = box[j].getAttribute('id')
        this.$http.get('./static/data' + this.sort + '/' + id + '.json').then((m) => {
          let data = m.data
          this.chart[id].setOption(data)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-chart{
    float: right;
    padding: 10px 15px;
    width: -webkit-calc(25% - 30px);
    width: -moz-calc(25% - 30px);
    width: calc(25% - 30px);
    height: 100%;
    position: relative;
    border: 2px solid #173b53;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
.home-chart .chart{
	height: calc(100% - 2px);
	border: 1px solid rgba(255,255,255,0.5);
	background: rgba(0,28,65,0.5);
	-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
.home-chart .chart-nav{
	position: relative;
	width: 100%;
    height: 40px;
    overflow: hidden;
    border-bottom: 2px solid rgba(255,255,255,0.5);
}
.home-chart .chart-nav ul{
    margin: 0;
    width: 100%;
    padding: 5px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
.home-chart .chart-nav ul span.state-left{
	background: url('./../../assets/hotspot/left.png') no-repeat center center; 
	left: 0px;
}
.home-chart .chart-nav ul span.state-right{
	background: url('./../../assets/hotspot/right.png') no-repeat center center; 
	right: 0px;
}
.home-chart .chart-nav ul span.state-left,.state .state-inline ul span.state-right{
	background-size: 100%;
	position: absolute; 
	display: block;
    top: 1px;
    width: 40px;
    height: 40px;	
	-webkit-opacity: 0;
	-moz-opacity: 0;
	opacity: 0;
}
.home-chart .chart-nav li{
    float: left;
    width: 30%;
    color: #fff;
    padding: 5px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    list-style: none;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    cursor: pointer;
}
.home-chart .chart-nav li.active{
    background-color: rgba(27,220,255,0.5);
    
}
.home-chart .chart-box{
	position: relative;
	overflow: hidden;
	width: 100%;
	height: -webkit-calc(100% - 40px);
	height: -moz-calc(100% - 40px);
	height: calc(100% - 40px);
}
.home-chart .chart-box ol{
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	width: -webkit-calc(100% + 20px);
	width: -moz-calc(100% + 20px);
	width: calc(100% + 20px);
	overflow-y: auto;
}
.home-chart .chart-box li{
	display: none;
	width: 100%;
	width: calc(100% - 20px);
	height: 410px;
	position: relative;
	color: #fff;
	padding: 5px 10px;
	list-style: none;
	-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
}
.home-chart .chart-box li>div{
	height: 300px; width: 100%;
}
.home-chart .chart-box li.active{
	display: block;
}
.home-chart .chart-box li .time{
    display: block; 
    overflow: hidden;
    position: absolute;
    margin-top: 30px;
}
.home-chart .chart-box li .time .time-input{
    border: 1px solid #ccc;
    border-radius: 2px;
    display: inline-block;
    background-color: #fff;
    padding-left: 2px;
    color: #666;
}
.home-chart .chart-box li .time input{
    display: inline-block;
    border: none;
    width: 105px;
    background-color: transparent;
    
}
@media (max-width: 1600px) {
	.home-chart{
		width: 350px !important;
	}
}
.img-land{
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100px;
	height: 100px;
	margin: -50px 0px 0px -50px;
}
#jedatebox{
    left: 0 !important;
    width: 99%;
}
</style>

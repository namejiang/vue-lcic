<template>
	<div class="home">
		<div class="container">
			<home-header></home-header>
			<home-border :border="true"></home-border>
			<div class="content">
				<div class="content-map">
					<!--start 边框样式-->
					<home-border></home-border>
					<!--地图-->
					<home-map :Event="Event"></home-map>
          <home-nav
						:Event="Event"
            @homeSort="homeSort"></home-nav>
					<!--hotspot 实时信息-->
					<div :is="hotspot" :sort="sort"></div>
				</div>	
				<!--start 图表信息-->
				<div :is="echart" :sort="sort"></div>
			</div>
		</div>
	</div>
</template>

<script>
import homeBorder from './../component/home/home-border'
import homeHeader from './../component/home/home-header'
import homeMap from './../component/map/home-map'
import homeHotspot from './../component/hotspot/home-hotspot'
import homeChart from './../component/echart/home-chart'
import homeNav from './../component/nav/home-nav'

import Vue from 'vue'
var Event = new Vue()
export default {
  name: 'home',
  components: { homeBorder, homeHeader, homeMap, homeNav },
  data () {
    return {
      Event: Event,
      hotspot: Object,
      echart: Object,
      sort: -1
    }
  },
  methods: {
    homeSort (sort) {
      this.sort = sort
    }
  },
  watch: {
    sort (curVal) {
      this.hotspot = false
      this.echart = false
      if (curVal !== -1) {
        setTimeout(() => {
          this.hotspot = homeHotspot
          this.echart = homeChart
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
	width:100%;
	height:100%;
	padding:10px;
	position:relative;
	background: url('./../assets/auth/background02.png');
}
.container {
  	width: -webkit-calc(100% - 20px);
    width: -moz-calc(100% - 20px);
    width: calc(100% - 20px);
    height: -webkit-calc(100% - 20px);
    height: -moz-calc(100% - 20px);
    height: calc(100% - 20px);
    border-top: 2px solid #24809a;
    border-bottom: 2px solid #24809a;
    position: relative;
}
.content {
	width: 100%;
	height: -webkit-calc(100% - 100px );
	height: -moz-calc(100% - 100px );
	height: calc(100% - 100px );
	padding: 15px 30px;
}
.content .content-map {
  	float: left;
	width: 75%;
	height: 100%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	box-sizing: border-box;
	position: relative;
	background: url('./../assets/home/background03.png');
	padding: 2px 0px;
	border: 2px solid #173b53;
}
.home-nav{
	position: absolute;
	top: 0;
	margin-left: 10px;
	margin-top: 40px;
}
.home-nav .home-nav-item{
	text-align: center;
    padding: 20px 10px;
    margin-bottom: 10px;
    color: #fff;
    opacity: 0.5;
    cursor: pointer; 
}
.home-nav .home-nav-item.active{
	opacity: 1;
}
.map-nav{
	position: absolute;
    bottom: 250px;
    right: 40px;
}
.map-nav .nav-item{
	display: block;
}
.map-nav .nav-item .label{
	display: block;
	width: 130px;
	padding: 10px 5px;
    margin-bottom: 5px;
    background-color: rgba(28, 126, 154, 0.7);
	background-position: 30px center;
	background-repeat: no-repeat;
	cursor: pointer;
}
.map-nav .nav-item .label span{
	color: #ffa85b; 
	margin-left: 25px;
}
.color-d85c60{
	color: #d85c60;
	background-image: url('./../assets/map/2_11.png');
}
.color-e8a05dC{
	color: #e8a05d;
	background-image: url('./../assets/map/car.png');
}
.color-d5d35f{
	color: #d5d35f;
	background-image: url('./../assets/map/2_13.png');
}
.color-e8a05d{
	color: #e8a05d;
	background-image: url('./../assets/map/2_12.png');
}
.back-6f7cd1{
	background-color: #6f7cd1;
}
.back-3b3e64{
	background-color: #3b3e64;
}
.back-c95c84{
	background-color: #c95c84;
}
.back-73a2dc{
	background-color: #73a2dc;
}
.back-885c45{
	background-color: #885c45;
}
.back-344355{
	background-color: #344355;
}
.back-2b355a{
	background-color: #2b355a;
}
@media (max-width: 1600px) {
	.content-map{
		width: -webkit-calc(100% - 370px) !important;
		width: -moz-calc(100% - 370px) !important;
		width: calc(100% - 370px) !important;
	}
}
</style>

<template>
	<div class="home">
		<div class="container">
			<home-border :border="true"></home-border>
			<home-header></home-header>
			<div class="content">
	    		<div class="content-map">
	    			<!--start 边框样式-->
	    			<home-border></home-border>
					<!--地图-->
	    			<home-map 
						@checked="checked_parent"  
						@checkedParent="checked_child">
					</home-map>
					<!--start 一级菜单-->
					<div class="home-nav">
						<div class="home-nav-item" v-for="(nav, key) in homeNavs" :class="[nav.background, {'active': nav.active}]" @click="homeNav_click(key)">
							<span>{{ nav.title }}</span>
						</div>
					</div>
					<!--start 二级菜单 marker-->
					<div class="map-nav">
						<div class="nav-item" v-for="(nav, key) in mapNavs">
							<label class="label" v-for="(item, keys) in nav" :class="item.color"  v-show="homeNavs[key].active">
								<input type="radio" :id="item.id" :checked="item.checked" @click="mapNav_click(key, keys)"/>
								<span>{{ item.title }}</span>
							</label>
						</div>
					</div>
	    			<!--hotspot 实时信息-->
					<home-hotspot></home-hotspot>
	    		</div>
	    		<!--start 图表信息-->
				<home-chart></home-chart>
			</div>
		</div>
	</div>
</template>

<script>
import homeBorder from './../component/home/home-border'
import homeHeader from './../component/home/home-header'
import homeMap from './../component/home/home-map'
import homeChart from './../component/home/home-chart'
import homeHotspot from './../component/home/home-hotspot'

export default {
  name: 'home',
  components: { homeBorder, homeHeader, homeMap, homeChart, homeHotspot },
  data () {
    return {
      homeNavs: [
        {title: '行政执法', background: 'back-6f7cd1', active: true},
        {title: '客运车辆', background: 'back-3b3e64', active: false},
        {title: '货运车辆', background: 'back-c95c84', active: false},
        {title: '旅游包车', background: 'back-73a2dc', active: false},
        {title: '出 租 车', background: 'back-885c45', active: false},
        {title: '驾培车辆', background: 'back-344355', active: false},
        {title: '客运场地', background: 'back-2b355a', active: false}
      ],
      mapNavs: [
        [
          {id: 'law_people', title: '执法人员', color: 'color-d85c60', checked: true},
          {id: 'law_vehicle', title: '执法车辆', color: 'color-e8a05dC', checked: false},
          {id: 'law_unit', title: '执法单位', color: 'color-d5d35f', checked: false}
        ],
        [{id: 'passenger_vehicle', title: '客运车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'danger_freight_vehicle', title: '货运车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'tourist_vehicle', title: '旅游包车', color: 'color-e8a05d', checked: false}],
        [{id: 'taxi', title: '出 租 车', color: 'color-e8a05d', checked: false}],
        [{id: 'training_vehicle', title: '驾培车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'passenger_station', title: '客运场地', color: 'color-d5d35f', checked: false}]
      ]
    }
  },
  watch: {
    homeNavs (curVal, oldVal) {
      console.log(1)
      console.log(curVal, oldVal)
    }
  },
  methods: {
    homeNav_click (key) {
      this.homeNavs[key].active = !this.homeNavs[key].active
      this.checked = {key: key, checked: this.homeNavs[key].active}
      for (let id in this.mapNavs[key]) {
        this.mapNavs[key][id].checked = this.homeNavs[key].active
      }
    },
    mapNav_click (key, id) {
      this.mapNavs[key][id].checked = !this.mapNavs[key][id].checked
    },
    checked_parent (checked) {
      this.homeNavs[checked.key].active = checked.active
    },
    checked_child (fun) {
      fun(this.homeNavs)
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

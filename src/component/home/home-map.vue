<template> 
    <div class="home-map">
        <!--地图-->
        <baidu-map 
            class="map"
            :scroll-wheel-zoom="true"
            :center="map.center"
            :zoom="map.zoom"
            @moving="mapMoving"
            @moveend="mapMoving"
            @zoomend="mapMoving">
        </baidu-map>
        <!--地图事件-->
        <div class="map-event">
            <span class="search" title="搜索" @click="mapSearch()">搜索</span>
            <span class="reset" title="复位" @click="mapReset(10)"></span>
            <span class="zoom-plus" @click="mapZoom(0)"></span>
            <span class="zoom-reduce" @click="mapZoom(1)"></span>
        </div>
        <!--历史轨迹时间选择-->
        <home-time></home-time>
        <!--车辆搜索-->
        <keep-alive>
          <div :is="search"
              :search="true"
              :homeNavs="homeNavs"
              @search="search_on" 
              @checked="checked_on" >
          </div>
        </keep-alive>
    </div>
</template> 

<script>
import homeSearch from './../../component/home/home-search'
import homeTime from './../../component/home/home-time'

export default {
  name: 'home-map',
  components: { homeTime },
  data () {
    return {
      map: {
        center: {
          lng: 106.706,
          lat: 26.605
        },
        zoom: 10
      },
      search: Object,
      homeNavs: Array
    }
  },
  methods: {
    mapMoving (e) {
      const {lng, lat} = e.target.getCenter()
      this.map.center = {lng, lat}
      this.map.zoom = e.target.getZoom()
    },
    mapReset () {
      this.map.center = {lng: 106.706, lat: 26.605}
      setTimeout(() => {
        this.map.zoom = 10
      }, 10)
    },
    mapZoom (massg) {
      if (massg === 0) {
        this.map.zoom++
      } else {
        this.map.zoom--
      }
    },
    mapSearch () {
      this.$emit('checkedParent', (homeNavs) => {
        this.homeNavs = homeNavs
      })
      this.search = homeSearch
    },
    search_on (search) {
      this.search = search
    },
    checked_on (checked) {
      this.$emit('checked', checked)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-map, .map {
    width:100%;
    height:100%;
    background: #333;
}
.home-map .map-event{
	right: 40px;
    bottom: 190px;
    position: absolute;
}
.home-map .map-event .reset{
	width: 50px;
    height: 50px;
    margin: 0;
    text-align: center;
    color: #fff;
    position: absolute;
    right: -10px;
    top: 60px;
    cursor: pointer;
    background-image: url('./../../assets/map/reset.png');
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: 32px;
    border-radius: 50%;
}
.home-map .map-event .zoom-plus{
	background-image: url('./../../assets/map/2_10.png');
    background-repeat:  no-repeat;
    margin-bottom: 5px;
	display: block;
    width: 30px;
    height: 28px;
    cursor: pointer;
}
.home-map .map-event .zoom-reduce{
	background-image: url('./../../assets/map/2_09.png');
    background-repeat:  no-repeat;
    display: block;
    width: 30px;
    height: 28px;
    cursor: pointer;
}
.home-map .map-event .search{
    position: absolute;
    color: #fff;
    width: 50px;
    display: block;
    right: 50px;
    top: 10px;
    background: #00aabd;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
}
</style>

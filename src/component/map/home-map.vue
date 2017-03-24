<template> 
    <div class="home-map">
        <!--地图-->
        <baidu-map 
          class="map"
          :scroll-wheel-zoom="true"
          :theme="theme"
          :center="map.center"
          :zoom="map.zoom"
          @moving="mapMoving"
          @moveend="mapMoving"
          @zoomend="mapMoving">
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"/>
            <bm-polygon 
              :path="map.polylinePath" 
              stroke-color="none"
              fill-color="rgba(25,24,55,0.7)"
              :stroke-opacity="1"/>   
            <bm-polygon 
              :path="map.BpolylinePath" 
              stroke-color="#fff"
              fill-color="none"
              :stroke-opacity="0.5"
              :stroke-weight="2"/>          
            
            <bm-label 
              v-for="(label, key) in map.label" 
              :key="key"
              :content="label.title" 
              :position="{lng: label.lng, lat: label.lat}" 
              :labelStyle="{color: 'rgba(255,255,255,0.6)', background: 'transparent',border:'none', fontSize : '12px'}" 
              :title="label.title"/>
            <div v-for="(data, key) in markers">
              <bm-marker 
                v-for="(mk, id) in data"
                :massClear="true"
                :position="{lng: mk.lng, lat: mk.lat}" 
                @click="marker_click(this)"></bm-marker>
            </div>
            
            
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
        <div :is="search"
            :search="true"
            :Event="Event"
            :homeNavs="homeNavs"
            @search="search_taggar" >
        </div>
    </div>
</template> 

<script>
// import $ from 'jquery'
import map from 'vue-baidu-map'
import homeSearch from './../../component/search/home-search'
import homeTime from './../../component/home/home-time'
import mapOption from './../../component/map/map_option.json'

export default {
  name: 'home-map',
  components: { homeTime },
  data () {
    return {
      theme: mapOption.theme,
      map: {
        label: mapOption.label,
        polylinePath: mapOption.polylinePath,
        BpolylinePath: mapOption.BpolylinePath,
        center: {
          lng: 106.706,
          lat: 26.605
        },
        zoom: 10
      },
      markers: {
        law_people: []
      },
      markerimg: {
        law_people: './../../static/map/2_11.png',
        law_vehicle: './../../assets/map/car.png',
        law_unit: './../../../assets/map/2_13.png',
        passenger_vehicle: './../../assets/map/2_12.png',
        danger_freight_vehicle: './../../assets/map/2_12.png',
        tourist_vehicle: './../../assets/map/2_12.png',
        taxi: './../../assets/map/2_12.png',
        training_vehicle: './../../assets/map/2_12.png',
        passenger_station: './../../assets/map/2_13.png'
      },
      search: Object,
      homeNavs: Array
    }
  },
  props: [ 'Event' ],
  mounted () {
    this.Event.$on('marker', (url, boolean) => {
      if (boolean) {
        this.$http.get('./static/mapdata/' + url + '.json')
          .then((m) => {
            let data = m.data.data
            this.markers[url] = data
          })
      } else {
        map.clearOverlays()
        this.markers[url] = []
      }
      console.log(this.markers)
    })
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
      this.Event.$emit('search', (homeNavs) => {
        this.homeNavs = homeNavs
      })
      this.search = homeSearch
    },
    search_taggar (search) {
      this.search = search
    },
    marker_click (s) {
      console.log(s)
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

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
          @zoomend="mapMoving"
          @ready="ready">
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"/>
            <bm-polygon 
              :path="map.polylinePath" 
              stroke-color="none"
              fill-color="rgba(25,24,55,0.7)"
              :stroke-opacity="1"
              @click="infoWindowtaggar(false)"/>   
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
            <bm-info-window 
              :position="infoWindow.position" 
              :title="infoWindow.title" 
              :show="infoWindow.show">
                <p v-text="infoWindow.contents"></p>
                <div>
                  <span @click="mapSearch(false)">详情</span>
                </div>
            </bm-info-window>
        </baidu-map>
        <!--地图事件-->
        <div class="map-event">
            <span class="search" title="搜索" @click="mapSearch(true)">搜索</span>
            <span class="reset" title="复位" @click="mapReset(10)"></span>
            <span class="zoom-plus" @click="mapZoom(0)"></span>
            <span class="zoom-reduce" @click="mapZoom(1)"></span>
        </div>
        <!--历史轨迹时间选择-->
        <home-time></home-time>
        <!--车辆搜索-->
        <div :is="infoSearch.info"
            :search="infoSearch.search"
            :Event="Event"
            :homeNavs="homeNavs"
            @search="search_taggar" >
        </div>
    </div>
</template> 

<script>
import $ from 'jquery'
// import map from 'vue-baidu-map'
import homeSearch from './../../component/search/home-search'
import homeTime from './../../component/home/home-time'
import mapOption from './../../component/map/map_option.json'

export default {
  name: 'home-map',
  components: { homeTime },
  data () {
    return {
      theme: mapOption.theme,
      Map: null,
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
      markers: {},
      infoWindow: {
        show: false,
        title: 'Info Window Title',
        position: {lng: 106.706, lat: 26.605},
        contents: 'Lgna aliqua.'
      },
      infoSearch: {
        search: false,
        info: Object
      },
      homeNavs: Array
    }
  },
  props: [ 'Event' ],
  mounted () {
    this.$nextTick(() => {
      this.Event.$on('marker', (url, boolean) => {
        if (boolean) {
          this.$http.get('./static/mapdata/' + url + '.json')
            .then((m) => {
              let datas = m.data.data
              this.addMarker(datas, url)
            })
        } else {
          this.removeMarker(url)
        }
      })
    })
  },
  methods: {
    ready (Map) {
      this.Map = Map
      this.marker_click()
    },
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
    mapSearch (search) {
      this.Event.$emit('search', (homeNavs) => {
        this.homeNavs = homeNavs
      })
      this.infoSearch.search = search
      this.infoSearch.info = homeSearch
    },
    search_taggar (search) {
      this.infoSearch.info = search
    },
    addMarker (datas, url) {
      $.each(datas, (key, data) => {
        let Icon = new this.Map.BMap.Icon('/static/img/2_11.3b1ff8c.png', new this.Map.BMap.Size(24, 24))
        let marker = new this.Map.BMap.Marker({lng: data.lng, lat: data.lat}, {icon: Icon})
        // marker.attr('name', '{lng: data.lng, lat: data.lat}')
        this.Map.map.addOverlay(marker)
        datas[key] = marker
      })
      this.markers[url] = datas
    },
    removeMarker (url) {
      $.each(this.markers[url], (key, marker) => {
        this.Map.map.removeOverlay(marker)
      })
      this.markers[url] = []
    },
    marker_click () {
      $('.map').delegate('.BMap_Marker', 'click', (e) => {
        console.log(e)
        this.infoWindow.position = e.point
        this.infoWindow.show = true
        // return false
      })
    },
    infoWindowtaggar (show) {
      this.infoWindow.show = show
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

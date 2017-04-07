<template>
    <div class="home-navs">
        <!--start 一级菜单-->
        <div class="home-nav">
            <div 
                class="home-nav-item" 
                v-for="(nav, key) in homeNavs" 
                :class="[nav.background, {'active': nav.active}]" 
                @click="homeNav_click(key)">
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
    </div>
</template>

<script>
export default {
  name: 'home-nav',
  props: [ 'Event' ],
  data () {
    return {
      homeNavs: [
        {title: '行政执法', background: 'back-6f7cd1', active: false},
        {title: '客运车辆', background: 'back-3b3e64', active: false},
        {title: '货运车辆', background: 'back-c95c84', active: false},
        {title: '旅游包车', background: 'back-73a2dc', active: false},
        {title: '出 租 车', background: 'back-885c45', active: false},
        {title: '驾培车辆', background: 'back-344355', active: false},
        {title: '客运场地', background: 'back-2b355a', active: false}
      ],
      mapNavs: [
        [
          {id: 'law_people', title: '执法人员', color: 'color-d85c60', checked: false},
          {id: 'law_vehicle', title: '执法车辆', color: 'color-e8a05dC', checked: false},
          {id: 'law_unit', title: '执法单位', color: 'color-d5d35f', checked: false}
        ],
        [{id: 'passenger_vehicle', title: '客运车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'danger_freight_vehicle', title: '货运车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'tourist_vehicle', title: '旅游包车', color: 'color-e8a05d', checked: false}],
        [{id: 'taxi', title: '出 租 车', color: 'color-e8a05d', checked: false}],
        [{id: 'training_vehicle', title: '驾培车辆', color: 'color-e8a05d', checked: false}],
        [{id: 'passenger_station', title: '客运场地', color: 'color-d5d35f', checked: false}]
      ],
      mapMarker: {
        law_people: false,
        law_vehicle: false,
        law_unit: false,
        passenger_vehicle: false,
        danger_freight_vehicle: false,
        tourist_vehicle: false,
        taxi: false,
        training_vehicle: false,
        passenger_station: false
      }
    }
  },
  mounted () {
    this.Event.$on('search', (fun) => {
      let type = typeof fun
      if (type === 'function') {
        fun(this.homeNavs)
      } else {
        this.homeNavs[fun.key].active = fun.active
      }
    })
    this.$nextTick(() => {
      setTimeout(() => {
        this.homeNav_click(0)
      }, 1000)
    })
  },
  computed: {
  },
  methods: {
    homeSort (key) {
      this.$emit('homeSort', key)
    },
    sort_ () {
      for (let id in this.homeNavs) {
        if (this.homeNavs[id].active) {
          this.homeSort(parseInt(id))
          return false
        }
        this.homeSort(-1)
      }
    },
    homeNav_click (key) {
      let Hnav = this.homeNavs[key]
      Hnav.active = !Hnav.active
      // 显示二级菜单
      for (let id in this.mapNavs[key]) {
        let nav = this.mapNavs[key][id]
        nav.checked = Hnav.active
        // this.mapMarker[nav.id] = Hnav.active ? nav.checked : ''
        this.Event.$emit('marker', nav.id, nav.checked)
      }
      // 第一层/最高层
      Hnav.active ? this.homeSort(key) : this.sort_()
    },
    mapNav_click (key, id) {
      this.mapNavs[key][id].checked = !this.mapNavs[key][id].checked
      // this.mapMarker[this.mapNavs[key][id].id] = this.mapNavs[key][id].checked
      this.Event.$emit('marker', this.mapNavs[key][id].id, this.mapNavs[key][id].checked)
    }
  },
  watch: {
    mapMarker: {
      handler: (newVal) => {
        // this.Event.$emit('marker', newVal)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	background-image: url('./../../assets/map/2_11.png');
}
.color-e8a05dC{
	color: #e8a05d;
	background-image: url('./../../assets/map/car.png');
}
.color-d5d35f{
	color: #d5d35f;
	background-image: url('./../../assets/map/2_13.png');
}
.color-e8a05d{
	color: #e8a05d;
	background-image: url('./../../assets/map/2_12.png');
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
</style>

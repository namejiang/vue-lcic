<template>
    <div class="home-search" @click.stop="Close()">
        <div class="details_content"  @click.stop>
            <div id="details">
                <div id="search" :class="{show:search}">
                    <div class="search-body">
                        <span class="item"
                            v-for="(nav, key) in items" 
                            :id="nav.id"
                            :class="{active: nav.active}"  
                            @click="search_tagger(key)">
                            {{ nav.title }}</span>
                        <input type="text" :name="[input]">
                        <button>搜索</button>
                        <div class="details_navHover"></div>
                        <div class="result"></div>
                        <div class="hierarchy">
                            <span>搜索层级</span>
                            <label v-for="(nav, key) in homeNavs">
                                <input type="checkbox" :checked="nav.active" @click.stop="checked_click(key)">
                                {{ nav.title }}
                            </label>
                        </div>
                    </div>
                </div>
                <div id="details_home" :class="{height:search}">
                    <div class="details_nav"></div>
                    <div class="details_body"></div>
                </div>
                <div class="details_del" @click="Close()"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home-search',
  data () {
    return {
      items: [
        {active: true, id: 'address', title: '地名'},
        {active: false, id: 'proprietor', title: '业户'},
        {active: false, id: 'vehicle_card', title: '车牌号'},
        {active: false, id: 'fence', title: '围栏选取'}
      ],
      input: 'address'
    }
  },
  props: [ 'homeNavs', 'search', 'Event' ],
  methods: {
    Close () {
      this.$emit('search', false)
    },
    checked_click (key) {
      this.homeNavs[key].checkbox = !this.homeNavs[key].checkbox
      this.Event.$emit('search', {key: key, active: this.homeNavs[key].checkbox})
    },
    search_tagger (key) {
      for (let nav of this.items) {
        nav.active = false
      }
      this.items[key].active = true
      this.input = this.items[key].id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-search{
	position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(50,50,50,0.7);
}
.home-search .details_content{
	position: relative;
    top: 10%;
    left: 10%;
    width: 60%;
    height: 80%;
}
#details{
	height: 100%;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	-ms-border-radius: 6px;
	border-radius: 6px;
	color: #fff;
    padding: 4px;
	background-color: rgba(255,255,255,.8);
}
#details #search{
	background: #50678e;
    padding: 20px 0px;
    height: 160px;
    display: none;
}
#details #search.show{
    display: block !important;
}
#details #search .search-body{
	position: relative;
    display: table;
    margin: 0 15%;
    border-collapse: separate;
}
#details #search .search-body span.item{
	padding: 0px 10px;
	line-height: 30px;
	display: inline-block;
	cursor: pointer;
    float: left;
}
#details #search .search-body span.item.active{
	background-color: #2d9cb6;
}
#details #search .search-body input[type="text"]{
	position: relative;
	float: left;
	width: calc(100% - 60px);
	margin-bottom: 0;
	height: 34px;
	padding: 6px 12px;
	font-size: 14px;
	line-height: 1.42857143;
	color: #555;
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
	background-color: #fff;
	background-image: none;
	border: 4px solid #2d9cb6;
}
#details #search .search-body button{
	padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    height: 34px;
    color: #fff;
    float: left;
    width: 60px;
    text-align: center;
    background-color: #2d9cb6;
    border: 1px solid #2d9cb6;
    border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}
#details #search .result{
    position: absolute;
    background-color: #2d9cb6;
    margin-top: 34px;
    width: calc(100% - 60px);
    z-index: -1;
	height: 300%;
    overflow-y: auto;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 5px 12px;
}
#details #search .hierarchy{
	margin-top: 40px;
}
#details #search .hierarchy span{
	display: inline-block;
    height: 50px;
    float: left;
}
#details #search .hierarchy label{
	display: inline-block;
}
.home-search .details_navHover{
    position: absolute;
    height: 300%;
    width: 100%;
    left: 0;
    top: 60px;
    background: #2d9cb6;
    overflow-y: auto;
    display: none;
}
.home-search #details_home{
    position: relative;
    height: 100%;
    overflow: hidden;
}
.home-search #details_home.height{
    height: calc(100% - 160px);
}
.home-search .details_nav ul{
	width: calc(100% + 4px);
	height: 100%;
	padding-left: 15px;
    margin: 0;
	overflow-y: auto;
}
.home-search .details_nav ul li,.details .details_navHover li{
	border-bottom: 1px solid #ccc;
    padding: 10px 0px 10px 40px;
    list-style: none;
    cursor: pointer;
}
.home-search .details_nav{
	width: 25%;
    height: 100%;
    float: left;
    position: relative;
    overflow: hidden;
    background: #1c7e9a;
}
.home-search .details_body{
	width: 75%;
    height: 100%;
    float: right;
	overflow-y: auto;
    background: #193f59;
}
.home-search .details_del{
	background: url('./../../assets/home/search/close.png') no-repeat center center;
	width: 25px;
	height: 25px;
	top: -10px;
	right: -10px;
	position: absolute;
}
</style>

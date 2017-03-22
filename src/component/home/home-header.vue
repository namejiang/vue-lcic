<template>
    <div class="home-header">
        <div class="icon">
            <img src="./../../assets/home/header/logotitle.png">
        </div>
        <div class="title">
            <p class="city"><span>26°34′ 51.14″ N 106°42′ 30.69″E</span> 中国 贵州省 贵阳市</p>
            <p class="time">
                <strong class="year">{{ year_time }}</strong>  
                <span style="padding-left:10px;"> 时间 <strong class='time'>{{ hours_time }}</strong></span> 
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home-header',
  data () {
    return {
      date_time: new Date()
    }
  },
  mounted () {
    setInterval(() => {
      this.date_time = new Date()
    }, 1000)
  },
  computed: {
    year_time () {
      return this.date_time.getFullYear() + ' 年 ' + this.Etime((this.date_time.getMonth() + 1)) + ' 月 ' + this.Etime(this.date_time.getDate()) + ' 日'
    },
    hours_time () {
      return this.Etime(this.date_time.getHours()) + ':' + this.Etime(this.date_time.getMinutes()) + ':' + this.Etime(this.date_time.getSeconds())
    }
  },
  methods: {
    Etime (val) {
      if (val < 10) {
        return '0' + val
      } else {
        return val
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-header{
    padding: 15px 30px;
	overflow: 	hidden;
	background: #1b1d36;
	height: 90px;
}
.home-header .icon,.home-header .title{
	float: left;
}
.home-header .title p{
	font-size: 16px;
    margin: 0;
    margin-top: 4px;
    padding: 1px 8px;
    letter-spacing: 3px;
    background-color: #2e3046;
}
.home-header .title p.city{
	color: #fff;
}
.home-header .title p.city span{
	color: #34a6de;
	letter-spacing: 0px;
	font-size: 12px;
}
.home-header .title p.time{
	color: #35bcfb;
}
.home-header .title p.time span{
   color: #d95455;
   border-left: 1px solid #35bcfb;
}
</style>

<template>
    <div class="home-header">
        <div class="icon">
            <img src="./../../assets/home/header/logotitle.png">
        </div>
        <div class="title">
            <p class="city"><span>26°34′ 51.14″ N 106°42′ 30.69″E</span> 中国 贵州省 贵阳市</p>
            <p class="time">
                <strong class="year">0000年00月00日</strong>  
                <span> 时间 <stong class='time'>00:00</stong> </span> 
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home-header'
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

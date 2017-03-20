<template>
    <div class="home-border">
        <span class="leftTop"></span>
        <span class="rightTop"></span>
        <span class="leftBut"></span>
        <span class="rightBut"></span>
        <div class="border-left" v-show='border'><span></span><span class='bottom'></span></div>
        <div class="border-right"  v-show='border'><span></span><span class='bottom'></span></div>
    </div>
</template> 

<script>
export default {
  name: 'home-border',
  props: [ 'border' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-border span{
	position: absolute;
    display: block;
    width: 23px;
    height: 23px;
    z-index: 1000;
}
.home-border .leftTop{
    top: -4px;
    left: -4px;
    background: url('./../../assets/home/border/2_05.png') no-repeat;
    
}
.home-border .leftBut{
    bottom: -4px;
    left: -4px;
    background: url('./../../assets/home/border/2_04.png') no-repeat;
    
}
.home-border .rightTop{
    top: -4px;
    right: -4px;
    background: url('./../../assets/home/border/2_02.png') no-repeat;
    
}
.home-border .rightBut{
    bottom: -4px;
    right: -4px;
    background: url('./../../assets/home/border/2_03.png') no-repeat;
    
}
.home-border .border-left,.home-border .border-right{
    position: absolute;
    background-color: #1e5974;
    top: 135px;
    width: 2px;
    /*height: -webkit-calc(100% - 300px); 
    height: -moz-calc(100% - 300px); 
    height: calc(100% - 300px);*/
    height: calc(100% - 190px);
}
.home-border .border-right{
	right: 0;
}
.home-border .border-left span,.home-border .border-right span{
	width: 8px;
	height: 8px;
	display: block;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	-ms-border-radius: 8px;
	border-radius: 8px;
	margin-left: -3px;
	background-color: #30dff6;
}
.home-border .border-left span.bottom,.home-border .border-right span.bottom{
	bottom: 0;
}
</style>

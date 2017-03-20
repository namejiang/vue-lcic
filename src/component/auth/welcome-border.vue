<template>
    <div class="welcome-border">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="right"></div>
        <div class="left"></div>
    </div>
</template>

<script>
export default {
  name: 'welcome-border'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome-border {
	width: 100%;
    height: 100%;
	position: absolute;
}
.welcome-border .top{
	background: url('./../../assets/auth/lgin_02.png') repeat-x; 
	position: absolute;
	width: calc(100% - 100px); 
	height:20px;
	left: 50px; 
	top: 50px;
}
.welcome-border .bottom{
	background: url('./../../assets/auth/lgin_02.png') repeat-x 550px 0px; 
	width: calc(100% - 100px); 
	height:20px;
	position: absolute;
	left: 50px; 
	bottom: 50px;
}
.welcome-border .right{
	background: url('./../../assets/auth/lgin_01.png') repeat-y; 
	width: 50px; 
	height: 80%;
	position: absolute;
	right: 50px; 
	top: 100px;
}
.welcome-border .left{
	background: url('./../../assets/auth/lgin_01.png') repeat-y; 
	width: 50px; 
	height: 80%;
	position: absolute;
	left: 50px; 
	top: 100px;
}
</style>

<template>
  <div class="welcome">
		<border></border>
 		<div class="lcome">
 			<img class="image" src="./../../assets/auth/welcome.png">
			<router-link class="action" :to="'login'"></router-link>
 		</div>
 	</div>
</template>

<script>
import border from './../../component/auth/welcome-border'
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { border }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
	width:100%;
	height: 100%; 
	background: url('./../../assets/auth/lgin_03.jpg'); 
	position: relative;
}
.welcome .lcome{
	width: calc(100% - 200px);
	height: calc(100% - 180px);
	position: absolute; 
	left: 90px; 
	top: 90px;
}
.welcome .image{
	width: 100%;
	height: 100%; 
	display: block;
}
.welcome .action{
	width: 8%;
    height: 8%;
    display: block;
    margin: 0 auto;
    bottom: 37px;
    position: absolute;
    left: 46%;
}
</style>

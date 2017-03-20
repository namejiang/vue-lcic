<template>
	<div class="login">
    <border></border>
    <div class="login-body">
      <div class="title"></div>
      <form method="post" action="/auth/login">
        <div class="item" >
          <input type="text" name="name">
        </div>
        <div class="item" >
          <input type="password" name="password" >
        </div>
        <div class="checkbox">
          <label  >
            <input type="checkbox" name="checkbox">   记住密码
          </label>
        </div>
        <div class="item" style="margin-top: 30px;">
          <router-link :to="'home'">
            <button type="submit"> 登录</button>
          </router-link>  
        </div>
      </form>
    </div>
	</div>
</template>

<script>
import border from './../../component/auth/welcome-border'
export default {
  name: 'login',
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
.login{
	width: 100%;
	height: 100%;
	background: url('./../../assets/auth/background02.png');
}
.login-body{
	position: absolute; 
	top: 50%;
	left: 50%;

	width: 526px; 
	height: 330px; 
	margin:  -192px -266px; 
	color: #fff;
	z-index: 10;
    border: 1px solid #064e65;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	-ms-border-radius: 4px;
	border-radius: 4px;
	background: rgba(6,78,101,0.3);
	overflow: hidden;
}

.login-body .title{
	height: 45px; 
	background: url('./../../assets/auth/login_03.png') no-repeat  center center;
	background-size: 85%;
	background-color: rgba(2,65,95,0.8);
}
.login-body form{
	padding: 38px 56px;
}

.login-body .item{
	margin-bottom:  15px; 
}
.login-body .item input{
	width: -webkit-calc( 100% - 8px ); 
	width: -moz-calc(100% - 8px ); 
	width: calc( 100% - 8px ); 
	height: 40px; 
	background-color: transparent; 
	border: 1px solid #23567b;
	padding-left: 40px; 
	-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box; 
	color: rgba(255,255,255,0.8);
	font-size: 16px;
	font-weight: 600;
	
}
.login-body .item input[name="name"]{
	background: url('./../../assets/auth/head_03.png') no-repeat 5px center;
}
.login-body .item input[name="password"]{
	background: url('./../../assets/auth/login_11.png') no-repeat 5px center;
}
.login-body .checkbox{
	text-align: right; 
	font-size: 16px; 
	font-weight: 500; 
	padding-top:8px; 
}
.login-body .checkbox input[type="checkbox"]{
	width: 15px; 
	height: 15px; 
	margin-right: 10px;
}
.login-body .item button,.content .item a{
	width: 100%;
	height: 45px; 
	line-height: 45px; 
	background-color: #08a8bc; 
	-webkit-border-radius: 50px;
	-moz-border-radius: 50px;
	-ms-border-radius: 50px;
	border-radius: 50px;
	border:none; 
	font-size: 18px; 
	color: #fff; 
	font-weight: 600;

	display: block;
	text-align: center;
}
</style>

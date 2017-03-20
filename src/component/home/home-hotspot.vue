<template>
    <div class="home-hotspot">
        <div class="hotspot">
            <div class="hotspot-item" >
                <div class="hotspot-title">执法热点<span></span></div>
                <div class="hotspot-body">
                    <ul>
                        <li>暂无数据</li>
                    </ul>
                    <div class="overY">
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="hotspot-item">
                <div class="hotspot-title">出租车聚集响应<span></span></div>
                <div class="hotspot-body">
                    <ul>
                        <li>暂无数据</li>
                    </ul>
                    <div class="overY">
                        <span></span>
                    </div>
                </div>
            </div>
            <!--隐藏-->
            <div class="Hotspot-togger"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home-hotspot'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-hotspot {
    position: absolute;
    bottom: 10px;
    left:0px;
    width: 80%;
	height:160px;
	border: none;
	overflow: hidden;
	display: block;
}
.home-hotspot .hotspot {
    color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
}
.home-hotspot .hotspot-item{
	float: left;
	width: -webkit-calc(50% - 48px);
	width: -moz-calc(50% - 48px);
	width: calc(50% - 48px);
	height: 100%;
    margin-left: 10px;
}
.home-hotspot .hotspot-item .hotspot-body{
	width: 100%;
    height: -webkit-calc(100% - 20px);
    height: -moz-calc(100% - 20px);
    height: calc(100% - 20px);
    position: relative;
	border: 1px solid #0e708f;
    background-color: rgba(25,122,153,0.4);
    overflow: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
.home-hotspot .hotspot-item ul{
    margin: 0;
    padding: 0;
    list-style: none;
    width: -webkit-calc(100% + 20px);
    width: -moz-calc(100% + 20px);
    width: calc(100% + 20px);
    height: 100%;
    overflow-y: scroll;
    
}
.home-hotspot .hotspot-item ul li{
	padding: 5px;
    color: rgba(255,255,255,0.9);
    cursor: pointer;
    font-size: 12px;
}
.home-hotspot .hotspot-item ul li span{
	float: right;
    display: block;
    margin-right: 20px;
}
.home-hotspot .hotspot-item .hotspot-title{
    background-color: #1c7e9a;
    width: 35%;
    padding: 0px 5px;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    position: relative;
}
.home-hotspot .hotspot-item .hotspot-title span{
    background: url('./../../assets/hotspot/2_01.png') no-repeat right center;
    background-size: 100%;
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top: 1px;
    left: 100%;
}
.home-hotspot .Hotspot-togger{
    width: 32px;
    height: 32px;
    position: absolute;
    right: 44px;
    top: 20px;
    background: url('./../../assets/hotspot/left.png');
    background-position: center center;
    background-size: 32px;
    background-repeat: no-repeat; 
    cursor: pointer;
    text-align: center;
    border-radius: 0px 5px 5px 0px;
    opacity: 0.5;
}
</style>

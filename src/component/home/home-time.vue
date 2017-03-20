<template>  
    <div class="history-time">
        <h2>历史记录查询</h2>
        <input id="time_vehicle_card" type="hidden">
        <div class="time">车牌号<br>
            <input id="vehicle_card" class="laydate-icon" type="text" readonly="true" ></div>
        <div class="time">开始时间<br>
            <input id="time_start" class="laydate-icon" type="text" readonly="true"></div>
        <div class="time">结束时间<br>
            <input id="time_end" class="laydate-icon" type="text" readonly="true"></div>
        <span onclick="document.getElementsByClassName('history')[0].style = 'display:none'">取消</span>
        <span onclick="marker.historySubmit(this)">查询</span>
    </div>
</template>   

<script>
export default {
  name: 'history-time'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history-time{
	position: absolute;
	background: #fff;
	padding: 10px;
	display: none;
	top: 50%;
    left: 50%;
    margin: -100px 0px 0px -250px;
}
 .history-time h2{
	font-size: 16px;
	line-height: 16px;
	margin: 0;
	padding: 5px 0px;
}
 .history-time .time{
	margin-bottom: 5px;
}
 .history-time .time input{
	width: 100%;
	border-radius: 4px;
	height: 20px;
	padding: 10px 5px;
}
.history-time span{
	text-align: center;
	display: inline-block;
	padding: 2px;
	width: 40px;
	border-radius: 4px;
	/*margin-left: calc(100% - 40px);*/
	background-color: #b1d2ec;
	cursor: pointer;
}
.drop{
	position: absolute; 
	top: 10px;   
	right: 20px;  
	background: #00aabd;    
	font-size: 12px;    
	padding: 20px 15px;   
	border-radius: 50%;
}
.history_lang{
	position: absolute;
	display:block;
	top: 50%;
	left: 50%;
	width:100px;
	height:100px;
	background-size:100%
}
</style> 

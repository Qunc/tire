<template>
	
    <div>
    	
		<section>
			<div class="tire_bg">
				<img src="./assets/img/tire.png"/>
			</div>
		</section>
		<footer>
			<div class="details">
				<p class="name">经典轮胎 205/55R16 PRIMACY 3ST 浩悦91W</p>
				<p class="tips">线上预约 线下安装!</p>
				<p class="price"><span>&yen; </span>225</p>
			</div> 
			<div class="bottom_OrderNow" v-on:click="OrderNow">
				立即下单
			</div>
		</footer>
	</div>
</template>
<script>
module.exports = {
	created: function () {
        document.getElementsByTagName("body")[0].setAttribute("style","background-color:#fff");
		//this.fetchData();
    },
	methods: {
        OrderNow: function () {
            this.$router.push('/SelectShop');
        },
        fetchData: function () {

        }
    }
}
</script>

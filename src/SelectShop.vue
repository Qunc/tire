<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="SelectShop_back"><img src="./assets/img/left.png"/></div><span>选择门店</span>
		</header>
		<section>
			<div class="shop" v-on:click="go_contact">
				<p class="name">南山区俊红轮胎店</p>
				<p class="extent">270m</p>
				<p class="address">地址:南光路53-1号</p>
			</div>
		</section>
	</div>
</template>
<script>
module.exports = {
	created: function(){
		this.fetchData();
	},
	methods: {
		SelectShop_back: function(){
			this.$router.push('/');
		},
		go_contact: function(){
			this.$router.push('/contact');
		},
		fetchData: function(){
            this.$http.get(API_BASE_URL + '/shop?token='+localStorage.token).then(function (res) {
            	console.log(res.data);
            }, function (res) {});
		}
	}
}
</script>


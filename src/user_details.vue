<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="userdetails_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>订单详情</span>
		</header>
		<section>
			<div class="user_details_shop" v-on:click="go_shopdetails">
				<div class="AddressIcon">
					<img src="./assets/img/address.png"/>
				</div>
				<p class="ShopName">
					南山区俊红轮胎店
				</p>
				<p class="ShopPhoneNumber">
					13815634853
				</p>
				<p class="ShopContact">
					<span>联系人：</span>陈先生
				</p>
				<p class="ShopAddress">
					<span>门店地址：</span>南海大道西海岸大厦3楼3K室
				</p>
			</div>
			<div class="CarOwner">
				<div class="CarOwnerName">
					车主信息：刘军
				</div>
				<div class="CarOwnerPhone">
					15935642358
				</div>
			</div>
			<div class="user_details_indent">
				<div class="ProductName">
					经典轮胎 205/55R16 PRIMACY 3ST浩悦91W
				</div>
				<div class="ProductPrice">
					&yen; 225
				</div>
			</div>
		</section>
	</div>
</template>

<script>
module.exports = {
	created: function () {
		this.fetchData();
	},
	methods: {
		userdetails_back: function(){
			this.$router.push('/contact');
		},
		go_shopdetails: function(){
			this.$router.push('/shop_details');
		},
		fetchData: function(){
			this.$http.get(API_BASE_URL + '/order?token='+localStorage.token).then(function (res) {
            	console.log(res);
            }, function (res) {});
		}
		
	}
}
</script>

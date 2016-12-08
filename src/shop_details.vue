<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="shop_details_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>刘军</span>
		</header>
		<section>
			<div class="user_details_shop plhack">
				<p class="ShopName">
					<span>车主信息：</span>刘军
				</p>
				<p class="Shop_Details_PhoneNumber">
					&nbsp;&nbsp;15964865933
				</p>
				<p class="ShopContact">
					<span>下单时间：</span>2016-10-23 18:46:02
				</p>
				<p class="ShopAddress">
					<span>总金额</span>：225.00元
				</p>
			</div>
			<div class="user_details_indent plhack">
				<div class="ProductName WidthHack">
					经典轮胎 205/55R16 PRIMACY 3ST 浩悦91W
				</div>
				<div class="ProductPrice">
					&yen; : 225
				</div>
			</div>
		</section>
		<footer>
			<div class="bottom_OrderNow ServerOver_LetterHack">
				服务完成
			</div>
		</footer>
	</div>
</template>

<script>
module.exports = {
	methods: {
		shop_details_back: function(){
			this.$router.push('/user_details');
		}
	}
}
</script>

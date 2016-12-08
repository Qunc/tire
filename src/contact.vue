<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="contact_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>南山区俊红轮胎店</span>
		</header>
		<section>
			<div class="contact">
				<p>联系方式</p>
			</div>
			<div class="contact_name">
				<input type="text" value="刘军" placeholder="输入您的姓名"/>
			</div>
			<div class="contact_PhoneNum WidthHack">
				<input type="number" value="15863465983" placeholder="输入您的电话号码"/>
				<div class="SendIdentCode" v-on:click="SendOver">
					<a>发送验证码</a>
				</div>
			</div>
			<div class="IdentCode">
				<input type="number" value="5295" placeholder="输入验证码"/>
			</div>
		</section>
		<footer>
			<div class="bottom_OrderNow letter_hack" v-on:click="go_userdetails">
				提交
			</div>
		</footer>
	</div>
</template>

<script>
module.exports = {
	methods: {
		contact_back: function(){
			this.$router.push('/SelectShop');
		},
		go_userdetails: function(){
			this.$router.push('/user_details');
		},
		SendOver: function(){
			console.log(this);
		}
	}
}
</script>

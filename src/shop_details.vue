<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="shop_details_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>{{order.service_shop.contacts}}</span>
		</header>
		<section>
			<div class="user_details_shop plhack">
				<p class="ShopName">
					<span>车主信息：</span>{{order.contacts}}
				</p>
				<p class="Shop_Details_PhoneNumber">
					&nbsp;&nbsp;{{order.contacts_phone}}
				</p>
				<p class="ShopContact">
					<span>下单时间：</span>{{order_time}}
				</p>
				<p class="ShopAddress">
					<span>总金额</span>：{{(order.amount/100).toFixed(2)}}元
				</p>
			</div>
			<div class="user_details_indent plhack">
				<div class="ProductName WidthHack">
					经典轮胎 205/55R16 PRIMACY 3ST 浩悦91W
				</div>
				<div class="ProductPrice">
					&yen; : {{(order.amount/100).toFixed(2)}}
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
	data: function () {
		return {
			order: {},
			order_time: ''
		}
	},
	created: function(){
		this.fetchData();
	},
	methods: {
		shop_details_back: function(){
			this.$router.push('/user_details');
		},
		fetchData: function(){
			this.$http.get(API_BASE_URL + '/order/' + this.$route.params.order_id + '?token='+localStorage.token).then(function (res) {
            	console.log(res);
//          	var date = new Date(1481511946*1000);
//          	console.log(date);

				this.order = res.body;

				var date = new Date(this.order.created_at*1000);
				Y = date.getFullYear() + '-';
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
				h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
				m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
				s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
				//console.log(Y+M+D+h+m+s); 
				this.order_time = Y+M+D+h+m+s;


            	
            }, function (res) {});	
		}
	}
}
</script>

<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="userdetails_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>订单详情</span>
		</header>
		<section>
			<div class="user_details_shop">
				<div class="AddressIcon">
					<img src="./assets/img/address.png"/>
				</div>
				<p class="ShopName">
					{{shop.name}}
				</p>
				<p class="ShopPhoneNumber">
					{{shop.contacts_phone || shop.mobile}}
				</p>
				<p class="ShopContact">
					<span>联系人：</span>{{shop.contacts}}
				</p>
				<p class="ShopAddress">
					<span>门店地址：</span>{{shop.address}}
				</p>
			</div>
			<div class="CarOwner">
				<div class="CarOwnerName">
					车主信息：{{order.contacts}}
				</div>
				<div class="CarOwnerPhone">
					{{order.contacts_phone}}
				</div>
			</div>
			<div class="user_details_indent">
				<div class="ProductName">
					经典轮胎 205/55R16 PRIMACY 3ST浩悦91W
				</div>
				<div class="ProductPrice">
					&yen; {{order.amount / 100}}
				</div>
			</div>
		</section>
	</div>
</template>
<script>
module.exports = {
	data: function () {
		return {
			order: {},
			shop: {}
		}
	},
	created: function () {
		this.fetchData();
	},
	methods: {
		userdetails_back: function(){
			this.$router.push('/');
		},
		fetchData: function(){
			this.$http.get(API_BASE_URL + '/order/' + this.$route.params.order_id + '?token='+localStorage.token).then(function (res) {
				if (res.body.err_code != 0) {
					return;
				}
				this.order = res.body;
				this.shop = res.body.service_shop;
			}, function (res) {});
		},
		wxpay: function() {
			this.$http.post(API_BASE_URL + '/order?token=' + localStorage.token, {order_id: order.order_id}).then(function (res) {
				WeixinJSBridge.invoke('getBrandWCPayRequest', res.package, function(res){
					// 使用以上方式判断前端返回,微信团队郑重提示：
					// res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠
					if(res.err_msg == "get_brand_wcpay_request：ok" ) {

					}
				});
			})
		}
	}
}
</script>

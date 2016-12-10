<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="contact_back">
				<img src="./assets/img/left.png"/>
			</div>
			<span>{{shop.name}}</span>
		</header>
		<section>
			<div class="contact">
				<p>联系方式</p>
			</div>
			<div class="contact_name">
				<input type="text" v-model="contacts" placeholder="输入您的姓名"/>
			</div>
			<div class="contact_PhoneNum WidthHack">
				<input type="text" v-model="contacts_phone" placeholder="输入您的电话号码"/>
				<div class="SendIdentCode" v-on:click="SendCode">
					<a>发送验证码</a>
				</div>
			</div>
			<div class="IdentCode">
				<input type="text" v-model="verify_code" placeholder="输入验证码"/>
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
	data: function () {
        return {
        	contacts: '',
        	contacts_phone: '',
            verify_code: '',
			shop: {},
			send_code: {}
        }
    },
	created: function(){
		this.fetchData();
	},
	methods: {
		contact_back: function(){
			this.$router.push('/SelectShop');
		},
		go_userdetails: function(){
			var data = {
				contacts: this.contacts,
				contacts_phone: this.contacts_phone,
				service_shop_id: this.shop._id,
				verify_code: this.verify_code
			};
			console.log(data)
			this.$http.post(API_BASE_URL + '/order?token='+localStorage.token, data).then(function (res) {
				if (res.body.err_code != 0) {
					return;
				}
				//跳转到订单详情页
				this.$router.push('/user_details/' + res.body.order_id);
            }, function (res) {});
		},
		fetchData: function(){
			 this.$http.get(API_BASE_URL + '/shop/' + this.$route.params.shop_id + '?token='+localStorage.token).then(function (res) {
//          	this.billings.shop_id = res.data[0]._id;
//          	this.billings.contacts = res.data[0].contacts;
				//_id = res.body[0]._id;
				 this.shop = res.body;
            }, function (res) {});
            
		},
		SendCode: function(){
			this.$http.get(API_BASE_URL + '/site/sms-code/' + this.contacts_phone + '?token=' + localStorage.token).then(function(res){

			})
		}
		
	}
}
</script>

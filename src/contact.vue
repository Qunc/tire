<template>
    <div>
		<!--<div id="box_wrap">
			<div class="loader_box">
				<img src="./assets/img/wx_loader.gif"/>
			</div>
		</div>-->
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
				<span class="error_tips">{{errors.contacts}}</span>
				<div class="contact_PhoneNum WidthHack">
					<input type="text" v-model="contacts_phone" placeholder="输入您的电话号码"/>
					<div class="SendIdentCode" v-on:click="SendCode" v-show="verify_code_active">
						发送验证码
					</div>
					<div class="SendIdentCode BgHack" v-show="!verify_code_active" id="SendIdentCode">
						{{verify_code_time ? (verify_code_time + '秒重新发送') : '正在发送'}}
					</div>
				</div>
				<span class="error_tips">{{errors.contacts_phone}}</span>
				
				<div class="IdentCode">
					<input type="text" v-model="verify_code" placeholder="输入验证码"/>
				</div>
				<span class="error_tips">{{errors.verify_code}}</span>
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
			send_code: {},
			verify_code_active: true,
			verify_code_time: 0,
			errors: {}
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
				console.log(res.body.err_code != 0)
				if (res.body.err_code != 0) {
					this.errors = res.body.err_msg;
					return;
				}
				//跳转到订单详情页
				this.$router.push('/user_details/' + res.body.order_id);
				//this.$router.push('/user_details/' + '584e140a2e9ffc4740461d0e');//用已支付订单号来测试button状态
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
			
			
			this.verify_code_active = false;

			document.getElementById('SendIdentCode').style.background = '#20b37b';
			this.$http.get(API_BASE_URL + '/site/sms-code/' + this.contacts_phone + '?token=' + localStorage.token).then(function(res){
				document.getElementById('SendIdentCode').style.background = '#b9b9b9';
				if (res.body.err_code != 0) {
					this.verify_code_active = true;
					this.errors.verify_code = res.body.err_msg;
					//错误
					
					//结束
					return;
				}
				//res.body.interval = 10;
				this.verify_code_time = res.body.interval - 1;
				var self = this;
				var timeId = setInterval(function () {
					self.verify_code_time --;
					
					if (self.verify_code_time <= 0) {
						self.verify_code_time = 0;
						self.verify_code_active = true;
						
						clearInterval(timeId);
					}
//					if(self.verify_code_time < 10){
//						self.verify_code_time = '0' + self.verify_code_time;
//					}
					
					
				}, 1000);
			}, function () {
				//失败的话，按钮变为可点击状态
				this.verify_code_active = true;
			})
			
			
		}
		
	}
}
</script>

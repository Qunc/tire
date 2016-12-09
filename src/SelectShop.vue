<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="SelectShop_back"><img src="./assets/img/left.png"/></div><span>选择门店</span>
		</header>
		<section>
			<router-link :to="{path:'/contact/'+billings.shop_id}">
			<div class="shop" v-on:click="" v-for="">
				<p class="name">南山区俊红轮胎店</p>
				<p class="extent">270m</p>
				<p class="address">地址:南光路53-1号</p>
			</div>
			</router-link>
		</section>
	</div>
</template>
<script>
module.exports = {
	data: function () {
        return {
            billings: []
        }
    },
	created: function(){
		this.fetchData();
	},
	methods: {
		SelectShop_back: function(){
			this.$router.push('/');
		},
//		go_contact: function(){
//			this.$router.push('/contact');
//		},
		fetchData: function(){
            this.$http.get(API_BASE_URL + '/shop?token='+localStorage.token).then(function (res) {
            	console.log(res.data);
            	console.log(this);
            	this.billings.shop_id = res.data[0]._id;
            	this.billings.contacts = res.data[0].contacts;
		console.log(this.billings.shop_id +'+'+this.billings.contacts);
            	
            }, function (res) {});
		}
	}
}
</script>


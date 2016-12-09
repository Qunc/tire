<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="SelectShop_back"><img src="./assets/img/left.png"/></div><span>选择门店</span>
		</header>
		<section>
			<router-link :to="{path:'/contact'}">
				<div class="shop" v-for="item in SelectShop_Data">
					<p class="name">{{item.name}}</p>
					<p class="extent">270m</p>
					<p class="address">{{item.address}}</p>
				</div>
			</router-link>
		</section>
	</div>
</template>
<script>
module.exports = {
	data: function () {
        return {
            SelectShop_Data: {}
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
            	
            	this.SelectShop_Data = res.data;
            	
            }, function (res) {});
		}
	}
}
</script>


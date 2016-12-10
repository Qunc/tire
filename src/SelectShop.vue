<template>
    <div>
		<header class="header_title">
			<div class="SelectShop_Back" v-on:click="SelectShop_back"><img src="./assets/img/left.png"/></div><span>选择门店</span>
		</header>
		<section>

			<div class="shop" v-for="item in SelectShop_Data">
				<router-link :to="{path:'/contact/' + item._id}">
					<p class="name">{{item.name}}</p>
					<p class="extent"></p>
					<p class="address">{{item.address}}</p>
				</router-link>
			</div>

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
        document.getElementsByTagName("body")[0].setAttribute("style","background-color:#ebebeb");
		//转菊花
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


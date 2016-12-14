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

var geo = require('./geo.js');

module.exports = {
	data: function () {
        return {
            SelectShop_Data: {}
        }
    },
	created: function(){
		//alert('');
		var obj_vue = this;
		geo.getLocation(function(ret){
			var res = ret.body;
			console.log(res.status)
			if (res.status != 0) {
				return;
	        }
			var lng = res.result[0].x;
			var lat = res.result[0].y;
			obj_vue.$http.get(API_BASE_URL + '/shop?token='+localStorage.token + '&coord[lng]=' + lng + '&coord[lat]=' + lat).then(function (res) {
        		obj_vue.SelectShop_Data = res.body;
            }, function (res) {});
		});
		
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
            	
            	this.SelectShop_Data = res.body;
            	
            }, function (res) {});
		}
	}
}
</script>


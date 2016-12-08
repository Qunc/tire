<template>
    <div>
        <header>
            <!-- 以下是超额提示和遮罩层 -->
            <div v-if="exceed" class="OverfullDebt" id="Index_OverfullDebt">
                <div class="OverfullDebt_top">
                    <p>温馨提示</p>
                </div>
                <div class="OverfullDebt_middle">
                    <p class="p1">您的累计欠款已超额,</p>
                    <p class="p2">支付后才能完成本次订货哦!</p>
                </div>
                <div class="OverfullDebt_bottom">
                    <p v-on:click="OverfullDebt_cancel" class="cancel"><a>取消</a></p><p><router-link to="/indent">去支付</router-link></p>
                </div>
            </div>
            <div v-if="exceed" class="shade" id="Index_shade"></div>
            <!-- 超额提示和遮罩层End -->
            
            <!-- 一键下单失败提示和遮罩层 -->
			<div v-show="edit_success_tips">
	            <div class="OverfullDebt" id="Indent_OverfullDebt">
	                <img src="./assets/img/Order_success.gif"/>
	                <p class="Order_Success_Text phack" id="refund_tiptext">下单失败，如有疑问请联系客服</p>
	            </div>
	            <div class="shade success-tips" id="Indent_shade"></div>
            </div>
        	<!-- 一键下单失败提示和遮罩层 End-->
            <div class="tips"><span>温馨提示：</span>以下的订货量为上笔订货单的数量，如无需更改，请直接点击“一键订货”。</div>
        	
        </header>

        <section style="margin-bottom: 95px;">
            <div class="products" v-for="(item, index) in product_list">
                <div class="products_left">
                    <img :src="item.main_img"/>
                </div>
                <div class="products_right">
                    <p>{{item.name}}</p>
                    <p class="price">&yen;{{item.price}}</p>
                    <div v-show="!parseInt(item.last_buy_quantity) && !item.edit" class="order_button">
                        <button v-on:click="edit_item(index)" id="ClickOrder">点击订货</button>
                    </div>
                    <div v-show="parseInt(item.last_buy_quantity) || item.edit" class="order_num">
                        <span>订货量：<input type="number" v-model="item.last_buy_quantity" v-on:focus="edit_item(index)" v-on:blur="item.edit=false" id="OrderNum_Input" class="quantity-input"/></span>
                        <span>{{item.unit}}</span>
                    </div>
                </div>
            </div>

            <!-- 以下是一键订货 -->
            <div class="footer_accounts">
                <span class="total">合计：</span>
                <i> &yen</i>
                <span class="accounts_price">{{total_cost || 0}}</span>
            </div>
            <button v-show="total_cost" class="accounts" v-on:click="submit_order">一键订货</button>
            <button v-show="!total_cost" disabled="disabled" class="accounts" id="OneKeyOrder">一键订货</button>
            <!-- 一键订货End -->
        </section>
        <footer>

            <!-- 以下是底部导航 -->
            <div class="index_bottom">
                <div class="index_bottom_left">
                	<div class="box_left" id="box_left">
	                    <dl>
	                        <dt>
	                            <img src="./assets/img/cart_active.gif"/>
	                        </dt>
	                        <dd><p style="color:#52BE44;">订购</p></dd>
	                    </dl>
                    </div>
                </div>
                <div class="cut-off"></div>
                <div class="index_bottom_right">
                	<router-link to="/indent" class="box_right" id="box_right">
	                    <dl>
	                    	
		                        <dt>
		                            <img src="./assets/img/bill.gif"/>
		                        </dt>
		                        <dd><p>账单</p></dd>
	                    	
	                    </dl>
                    </router-link>
                </div>
            </div>
            <!-- 底部导航End -->
        </footer>
    </div>
</template>

<script>
module.exports = {
    beforeRouteLeave: function (to, from ,next) {
        //下单成功的话，通知下一个路由，做成功提示
        to.params.order_success_tips = this.order_success;
        next();
    },
    data: function () {
        return {
            loading: true,
            product_list: [],
            exceed: false, //超额
            order_success: false, //订单成功标志
            edit_success_tips: false //
        }
    },
    created: function () {
        this.fetchData();
        this.exceed = false;
        //重置订单成功标志
        this.order_success = false;
    },
    computed: {
        //合计金额
        total_cost: function () {
            var cost = 0;
            for (i in this.product_list) {
                var item = this.product_list[i];
                if (item.last_buy_quantity) {
                	var single = (item.last_buy_quantity * item.price * 100 )/100;
                    cost =  (cost * 100 + single *100 )/100;
                }
            }
            return cost;
        }
    },
    methods: {
        fetchData: function () {
            this.$http.get(API_BASE_URL + '/factory/products?token='+localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    var list = res.body.product_list;
                    for (var i=0; i < list.length; i++) {
                        list[i].edit = false;
                    }
                    this.product_list = list;
                }
            }, function (res) {});
        },
        edit_item: function (index) {
            this.product_list[index].edit = true;
            var list = document.getElementsByClassName('quantity-input');

            if (list[index]) {
                list[index].focus();
            }
        },
        submit_order: function () {
            var buy_items = [];
            for (i in this.product_list) {
                var item = this.product_list[i];
                if (item.last_buy_quantity > 0) {
                    //cost += item.last_buy_quantity * item.price;
                    buy_items.push({
                        product_id: item.product_id,
                        quantity: item.last_buy_quantity
                    });
                }
            }

            this.$http.post(API_BASE_URL + '/order?token=' +localStorage.token, {buy_items: buy_items}).then(function (res) {
                if (res.body.err_code == 2001) {//这情况要显示超额提示
                    this.exceed = true;
                } else if(res.body.err_code == 0){
                    this.order_success = true;
                    this.$router.push('/indent')
                }else{
//              	document.getElementById('refund_tiptext').innerHTML = 
                	this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
                }
            })
            
        },
        OverfullDebt_cancel: function () {
        	this.exceed = false;
        }
    }
}
</script>

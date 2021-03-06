require('./assets/css/index.css');

var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var geo = require('./geo.js');


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.headers.common['Content-Type'] = 'application/json';

var getQueryParam = function (paras) {
    var url = location.href;
    url = url.indexOf('#') == -1 ? url: url.substring(0, url.indexOf('#'));  //舍弃#及以后的数据
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"); //得到?号后面的数据
    //paraString里放的是token=abcde
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    //returnValue里放的是"token="后面的东西abcde
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

//做一些初始化动作
var currentUri = location.href.split('#')[0];
currentUri += currentUri.lastIndexOf('/') !== currentUri.length - 1 ? '/' : '';

Vue.http.get(API_BASE_URL + '/init?uri=' + encodeURIComponent(currentUri)).then(function (res) {
    if (res.body.js_config) {
        //wx.config
        wx.config(res.body.js_config);
        /*
        wx.ready(function(){
            geo.getLocation(function(ret){
                var res = ret.body;
                if (res.status != 0) {
                    return;
                }
                var lng = res.result[0].x;
                var lat = res.result[0].y;
                localStorage.setItem('lng', lng);
                localStorage.setItem('lat', lat);
            });
        })
        */
    }
})

//检查是否保存有token
var token = localStorage.getItem('token');
var code = getQueryParam('code');

var gotoWechatOauth = function () {
    //获取微信授权地址，跳转微信授权
    Vue.http.get(API_BASE_URL + '/auth/url?backurl=' + currentUri).then(function (res) {
        if (res.body.wechatOauthUrl) {
            window.location.href = res.body.wechatOauthUrl;
        }
    })
}

//检查是否保存有token
var token = localStorage.getItem('token');
var code = getQueryParam('code');

if (!token) {
    //如果没有token，是否已经通过微信授权
    //如果通过授权，就用code换取用户token
    //否则就跳转到微信授权
    if (!!code) {
        Vue.http.post(API_BASE_URL + '/auth', {code: code}).then(function(res){
            localStorage.setItem('token', res.body.token)
        }, function (err) {})
    } else {
        gotoWechatOauth();
    }
} else {
    //暂时删除token的本地存储,待验证完成后再存入
    //localStorage.removeItem('token');
    //检验token是否有效
    Vue.http.get(API_BASE_URL + '/auth?token=' + token).then(function(res){
        if (!res.body._id) {
        	//无效删除
        	localStorage.removeItem('token');
            //500毫秒后跳转到微信授权
            setTimeout(gotoWechatOauth, 500);
            return
        }
    }, function (err) {
        //无效删除
        localStorage.removeItem('token');
        //500毫秒后跳转到微信授权
        setTimeout(gotoWechatOauth, 500);
    })
}

var index = require('./index.vue');
var contact = require('./contact.vue');
var SelectShop = require('./SelectShop.vue');
var shop_details = require('./shop_details.vue');
var user_details = require('./user_details.vue');

const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: index },
        {path: '/SelectShop', component: SelectShop },
        {path: '/contact/:shop_id', component: contact },
        {path:'/user_details/:order_id',component: user_details },
        {path:'/shop_details/:order_id',component: shop_details }
    ]
});

new Vue({
    router: router
}).$mount('#app');


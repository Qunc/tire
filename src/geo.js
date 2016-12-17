var Vue = require('vue');
var VueResource = require('vue-resource');

var createCallback = function (cb) {
        var cbname = 'geo_call_back_' + Math.ceil(Math.random() * 1000);
        window[cbname] = cb;
        return cbname;
    }


function GeoParser () {
    this.ak = 'wV6EvFpEazxRUmS9bqTzvyYuGUPKyYAz'
}

/**
 * wgs84坐标系转换为百度坐标系
 * @param long
 * @param lat
 * @param cb
 */
GeoParser.prototype.geoconv = function (long, lat, cb) {
    var url = "http://api.map.baidu.com/geoconv/v1/?from=1&to=5&callback=?&coords=" + long + "," + lat + "&ak=" + this.ak;
    /*
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'jsonp',
        jsonpCallback: createCallback(cb)
    });
    */
    Vue.http.jsonp(url).then(cb)
}

GeoParser.prototype.geocoder = function (address, cb) {
    var url = 'http://api.map.baidu.com/geocoder/v2/?ak=' + this.ak + '&output=json&callback=?&address=' + address + (city ? '&city=' + city : '');
    Vue.http.jsonp(url).then(cb)
}

GeoParser.prototype.getLocation = function (cb) {
	//this.geoconv(113.323568, 23.146436, cb);return;
    var self = this;
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                self.geoconv(res.longitude, res.latitude, cb);
            }
        });
    }else{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                self.geoconv(position.coords.longitude, position.coords.latitude, cb);
            });
        }
    }
}

module.exports = new GeoParser()
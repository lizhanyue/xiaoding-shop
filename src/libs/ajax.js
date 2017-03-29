var $ = require("jquery");
var pop = require("pop/pop.js");
var store = require("store");
var def_opt = {
    cache : false,
    dataType : "json"
};
var sess_key = "_alliance_sess", user_key="_alliance_usr",
    city_key = "city_key";
var ajax = function(opt){
    opt = $.extend({},def_opt , opt );
    //如果非外站的请求， 统一加上URL 前缀
    if (!opt.outer) {
      opt.url = http.url_prefix + opt.url;
    }
    return $.ajax(opt).always(function(rs){
        var deferred = $.Deferred();
        if (rs.errcode == 3) {
            //
            pop.alert('登录已超时,请重新登录',{
                callback: function(){
                    store.remove(sess_key);
                    store.remove(user_key);
                    store.remove(city_key);
                    window.location.href = "/";
                }
            });

        }
        deferred.resolve(rs);
    });
};

var http = {
    url_prefix  : "/server",
    get : function(opt){
        opt.type = "get";
        return ajax(opt);
    },
    post : function(opt){
        opt.type = "post";
        opt.headers = opt.headers || {};
        if (!opt.headers["Content-Type"]) {
          opt.headers["Content-Type"] =  "application/x-www-form-urlencoded";
        }
        return ajax(opt);
    }
};

module.exports = http;

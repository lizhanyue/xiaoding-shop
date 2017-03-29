require("./pop.scss");
var $ = require("jquery");
var Dialog = require("idialog.js");
var alert_tpl = require("./pop.alert.hbs");
var confirm_tpl = require("./pop.confirm.hbs");
var tip_tpl = require("./pop.tip.hbs");
var jump_tpl = require("./pop.jump.hbs");

var alert_instance , confirm_instance , tip_instance , jump_instance;
var __t ;

var Pop = {
    /**
     * @param {string} content
     * @param {object} opt  {callback: function}
     **/
    "alert" : function(content, opt){
        opt = opt || {};
        if (alert_instance) {
            alert_instance.remove();
        }
        var $dom = $(alert_tpl({
            content : content
        }));
        $dom.find(".js-btn").click(function(){
            alert_instance.hide();
            opt.callback && opt.callback();
        });
        alert_instance = new Dialog({
            newMask : true,
            content : $dom
        });
        alert_instance.hide();
        alert_instance.show();
    },
    /**
     * @param {object} param {title: 标题, content: 主内容, info: 副内容}
     * @param {object} opt  {ok: function , cancel: function}
     **/
    "confirm" : function(param, opt){

        if (confirm_instance) {
            confirm_instance.remove();
        }
        var $dom = $(confirm_tpl({
            title: param.title,
            content: param.content,
            info: param.info
        }));
        $dom.find(".js-cancel").click(function(){
            confirm_instance.hide();
            opt.cancel && opt.cancel();
        });
        $dom.find(".js-ok").click(function(){
            confirm_instance.hide();
            opt.ok && opt.ok();
        });
        confirm_instance = new Dialog({
            newMask : true,
            content : $dom
        });
        confirm_instance.hide();
        confirm_instance.show();
    },
    "tip" : function(text, opt){
         opt = opt || {};
         if (!tip_instance) {
             tip_instance = new Dialog({
                content : tip_tpl(),
                maskVisible : false,
                newMask : true
             });
             tip_instance.hide();
         };
         if (__t) {
             clearTimeout(__t);
             __t = null;
             tip_instance.hide();
         }
         tip_instance.getDlgDom().find(".js-tip").text(text);
         tip_instance.show();
         __t = setTimeout(function(){
             tip_instance.hide();
             opt.callback && opt.callback();
         }, opt.timer || 1500);
    },
    "jump" : function(opt){
        opt = opt || {};
        if (jump_instance) {
            jump_instance.remove();
        }
        var $dom = $(jump_tpl({
            title: opt.title || '提示',
            content : opt.content,
            oktxt : opt.btnTxt[0],
            ctp : opt.ctp,
            canceltxt:opt.btnTxt[1],
            jzNo : opt.jzNo
        }));
        $dom.find(".js-btn").click(function(){
            jump_instance.hide();
            opt.callback && opt.callback();
        });
        $dom.find(".js-ok").click(function(){
            jump_instance.hide();
            opt.ok && opt.ok();
        });
        $dom.find(".js-cancel").click(function(){
            jump_instance.hide();
            opt.cancel && opt.cancel();
        });
        jump_instance = new Dialog({
            newMask : true,
            content : $dom
        });
        jump_instance.hide();
        jump_instance.show();
        opt.end && opt.end();
    },
}

module.exports = Pop;

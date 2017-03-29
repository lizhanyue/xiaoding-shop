require("./pop.scss");
var $ = require("jquery.js");
var Dialog = require("idialog.js");
var addr_tpl = require("./pop.address.hbs");
var ajax = require('ajax.js');
var url = '/au/order/update '
var pop = require('./pop.js');

require('distpicker.data');
require('distpicker');

var PopaddrDialog = function(textObj) {
    var me = this;

    this._data = textObj;
    this.$dom = $(addr_tpl(textObj));
    this.address_instance = new Dialog({
        newMask : true,
        content : $dom
    });

    var distpicker = this.$dom.find('[data-toggle="distpicker"]');
    distpicker.distpicker({
        autoSelect: false
    });
    this.$dom.find(".js-close").click(function(){
        me.address_instance.remove();
        distpicker.distpicker('reset');
    });
    this.$dom.find(".js-ok").click(function(){
        me.submit();
    });

    this.address_instance.show();
    this.submit = function() {
        var me = this;
        var $dom = this.$dom;
        var $item = this._data.$item;
        var name = $dom.find('input[name="name"]').val();
        var phone = $dom.find('input[name="phone"]').val();
        var info = $dom.find('input[name="addr-info"]').val();
        var temp = [];
        var $select = $dom.find('select');
        $select.each(function() {
            temp.push($(this).find('option:selected').text());
        });
        var address = temp.join('') + info;
        if (validForm($dom)) {
            ajax.post({
                url: url,
                data: JSON.stringify({
                    id: me._data.id,
                    name: name,
                    phone: phone,
                    address: address
                })
            }).then(function(res) {
                if(res.status==0){
                    me.address_instance.remove();
                    distpicker.distpicker('reset');

                    pop.alert('修改成功！');
                    $item.find('.oi-dt .person em').text(name);
                    $item.find('.oi-dt .tel').text(phone);
                    $item.find('.oi-dt .addr').text(address);
                }else if(res.status==1){
                    pop.alert('部分订单已发货，地址不可修改！');
                }
            }).fail(function(){
                pop.alert('修改失败！请重新尝试');
            });
    }

    }
};

function validForm($form) {
    var $input = $form.find('input');
    var isValid;
    $input.each(function() {
        var value = $(this).val();
        var type = $(this).attr('name');
        var name = $(this).parents('.form-col ').find('.label').text();
        var regexp = "^((\d3)|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}";
        if (!value) {
            pop.alert('请输入' + name + '!');
            isValid = false;
            return false;
        }
        if (type == 'phone') {
            if(!(/^1[3|5|6|7|8|9][0-9]{9}$/.test(value))) {
                pop.alert('请输入正确的手机号!');
                isValid = false;
                return false;
            }
        }
        isValid = true;
    });

    return isValid;
}


module.exports = PopaddrDialog;

var ajax = require("ajax");
var Dialog = require("idialog.js");
var register_tpl = require("./register.hbs");
require("../css/register.scss");
var R = {
	init : function(){
  this.$listDom = $('#dlzc');
	this.bindDom();
	},
	bindDom : function(){
    var $listDom = this.$listDom;
		$listDom.on('click',".js-register",function(){
			this.showPop();
		}.bind(this));
    $listDom.on('click','.js_close',function(){
  		dlg.hide();
  	});
	},
	showPop : function(){
		var html = register_tpl(),
			dlg = new Dialog({
			content : html
		});
		dlg.show();
	}
}
module.exports=R;

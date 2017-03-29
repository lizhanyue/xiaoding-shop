var ajax = require("ajax");
var Dialog = require("idialog.js");
var login_tpl = require("./login.hbs");
require("../css/login.scss");
var M = {
	init : function(){
  this.$listDom = $('#dlzc');
	this.bindDom();
	},
	bindDom : function(){
    var $listDom = this.$listDom;
		$listDom.on('click',".js-login",function(){
			this.showPop();
		}.bind(this));
    $listDom.on('click','.js_close',function(){
  		dlg.hide();
  	});
	},
	showPop : function(){
		var html = login_tpl(),
			dlg = new Dialog({
			content : html
		});
		dlg.show();
	}
}
module.exports=M;
// $(function(){
// 	M.init();
// });

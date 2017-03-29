var h_tep=require("./header.hbs");
require("./header.scss");
var login=require("header/login/js/login.js");
var register=require("header/login/js/register.js");
  var M = {
    init:function(){
      login.init();
      register.init();
    },
    addhead:function(){
    // var $listDom=$(".nav-header");
      var html = h_tep();
      var dom=$(html);
      return dom;
    }

  };
module.exports = M;

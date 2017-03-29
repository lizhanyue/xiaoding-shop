var heade=require("header/header.js");
$(function(){
// 引入头部
  var $header=$("#header");
  $header.append(heade.addhead());
  heade.init();
})

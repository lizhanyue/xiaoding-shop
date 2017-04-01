var heade=require("header/header.js");
$(function(){
// 引入头部
  var $header=$("#header");
  $header.append(heade.addhead());
  heade.init();

  $(".pagemg").on('click','li',function(){
    var index=$(this).index();
    $(".page-right section").hide().eq(index).show();
  })
})

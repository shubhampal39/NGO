// JavaScript Document
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
  
  $('.hide-readmore').click(function(){
	var _this = $(this);
	_this.hide().closest('.hidden-content').find('.hidden-content-show').slideDown('slow');
	$(".hide-readless").show();
  });


  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
  
  $('.hide-readless').click(function(){
	var _this = $(this);
	_this.hide().closest('.hidden-content').find('.hidden-content-show').slideUp('slow');
	$(".hide-readmore").show();
  });
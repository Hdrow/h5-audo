(function() {
	
	orientation();//横屏提示功能
	
	function orientation(){
		window_resize_orientation();//一进入页面判断是否横屏
		if(os.ios) $(window).on('resize',window_resize_orientation);
		else $(window).on('resize',window_orientation);
	}//end func
	
	function window_resize_orientation(e){
		if($(window).width()>$(window).height()) orientationHandler('landscape');
		else orientationHandler('portrait');
		console.log('window size:'+$(window).width()+'/'+$(window).height());
	}//end func
	
	function window_orientation(e) {
		if (window.orientation == 90 || window.orientation == -90) orientationHandler('landscape');
		else if (window.orientation == 0 || window.orientation == 180) orientationHandler('portrait');
	}//end if
	
	function orientationHandler(orientation){
		//翻转提示浮层
		var turnBox=$('#turnBox');
		if (orientation=='landscape') {
			if(os) os.orientation = 'landscape';		
			if(turnBox.length==0) turnBox=$('<aside class="turnBox" id="turnBox"><img src="images/common/turn.gif" class="turn"><p>请将手机调至竖屏状态，获得最佳浏览体验！</p></aside>').appendTo($('body'));
		}//end if
		else if (orientation=='portrait'){
			if(os) os.orientation='portrait';
			if(turnBox.length>0) turnBox.remove();
		}//edn else
		console.log('mobile orientation:'+os.orientation);
	}//end func
	
}());
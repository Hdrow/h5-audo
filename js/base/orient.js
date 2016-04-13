//2016.3.11
var iorient=importOrient();

function importOrient(){
	var orient={};
	var first=true;
	
	orient.init=function(dir){
		this.dir=dir||'portrait';
		window_orientation();
		first=false;
		if(os.ios) $(window).on('resize',window_orientation);
		else $(window).on('orientationchange',window_orientation);
		if( this.dir!= this.get()){
			if(os.ios) $(window).one('resize',window_reload);
			else $(window).one('orientationchange',window_reload);
		}//end if
	}//end func
	
	orient.lock=function(dir,callback){
		this.dir=dir||'portrait';
		window_orientation();
		if(callback && this.dir!= this.get() ){
			if(os.ios) $(window).one('resize',{callback:callback},callback_handler);
			else $(window).one('orientationchange',{callback:callback},callback_handler);
		}//end if
	}//end func
	
	orient.unlock=function(){
		if(os.ios) $(window).off('resize',window_orientation).off('resize',callback_handler).off('resize',window_reload);
		else $(window).off('orientationchange',window_orientation).off('orientationchange',callback_handler).off('orientationchange',window_reload);
		$('#turnBox').remove();
	}//end func
	
	orient.get=function(){
		if(first || os.ios) return $(window).width()>$(window).height()?'landscape':'portrait';
		else return window.orientation == 90 || window.orientation == -90?'landscape':'portrait';
	}//end func
	
	function window_orientation(e){
		var orientation=orient.get();
		var turnBox=$('#turnBox');
		if(orient.dir=='portrait'){
			if (orientation=='landscape') {
				if(turnBox.length==0) turnBox=$('<aside class="turnBoxPortrait" id="turnBox"><img src="images/common/turn.gif" class="turn"><p>请将手机调至竖屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if(turnBox.length>0) turnBox.remove();
		}//end if
		else{
			if (orientation=='portrait') {
				if(turnBox.length==0) turnBox=$('<aside class="turnBoxLandscape" id="turnBox"><img src="images/common/turn_hor.png" class="turn"><p>请将手机调至横屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if(turnBox.length>0) turnBox.remove();
		}//end else
	}//end func
	
	function callback_handler(e){
		var callback=e.data.callback;
		if(orient.dir== orient.get()) callback();
	}//end func
	
	function window_reload(e){
		location.reload();
	}//end func
	
	return orient;
}//end import
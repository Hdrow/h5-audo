//2015.11.12
var iOrient=importOrient();

function importOrient(){
	var orient={};
	
	orient.init=function(dir){
		orient.dir=dir||'portrait';
		window_orientation();
		$(window).on('resize',window_orientation);
		if( orient.dir!= orient.get()) $(window).one('resize',function(){location.reload();});
	}//end func
	
	orient.lock=function(dir,callback){
		orient.dir=dir||'portrait';
		orient.callback=callback;
		window_orientation();
		if(callback && orient.dir!= orient.get() ) $(window).on('resize',callback_handler);
	}//end func
	
	function callback_handler(e){
		if(orient.dir== orient.get() ){
			orient.callback();
			orient.callback=undefined;
			$(window).off('resize',callback_handler);
		}//end if
	}//end func
	
	orient.unlock=function(){
		$(window).off('resize',window_orientation);
		if(orient.callback) $(window).off('resize',callback_handler);
		$('#turnBox').remove();
	}//end func
	
	orient.get=function(){
		if(window.orientation) return window.orientation == 90 || window.orientation == -90?'landscape':'portrait';
		else return $(window).width()>$(window).height()?'landscape':'portrait';
	}//end func
	
	function window_orientation(e){
		var orientation=orient.get();
		console.log('orientation:'+orientation);
		if(orient.dir=='portrait'){
			if (orientation=='landscape') {
				$('<aside class="turnBoxPortrait" id="turnBox"><img src="images/common/turn.gif" class="turn"><p>请将手机调至竖屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if (orientation=='portrait') $('#turnBox').remove();
		}//end if
		else{
			if (orientation=='portrait') {
				turnBox=$('<aside class="turnBoxLandscape" id="turnBox"><img src="images/common/turn_hor.png" class="turn"><p>请将手机调至横屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if (orientation=='landscape') $('#turnBox').remove();
		}//end else
	}//end func
	
	return orient;
}//end import
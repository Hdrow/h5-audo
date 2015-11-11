//2015.11.11
var iOrient=importOrient();

function importOrient(){
	var orient={};
	
	orient.init=function(dir){
		orient.dir=dir||'portrait';
		window_orientation();
		if( orient.dir!= orient.get()) $(window).one('orientationchange',function(){location.reload();});
		else $(window).on('resize',window_orientation);
	}//end func
	
	orient.lock=function(dir,callback){
		orient.dir=dir||'portrait';
		window_orientation();
		if(callback || orient.dir!= orient.get() ) $(window).one('resize',callback);
	}//end func
	
	orient.unlock=function(){
		$(window).off('resize',window_orientation);
	}//end func
	
	orient.get=function(){
		if(window.orientation) return window.orientation == 90 || window.orientation == -90?'landscape':'portrait';
		else return $(window).width()>$(window).height()?'landscape':'portrait';
	}//end func
	
	function window_orientation(e){
		var orientation=orient.get();
		console.log('orientation:'+orientation);
		var turnBox=$('#turnBox');
		if(orient.dir=='portrait'){
			if (orientation=='landscape') {
				if(os) os.orientation = 'landscape';
				if(turnBox.length==0) turnBox=$('<aside class="turnBox" id="turnBox"><img src="images/common/turn.gif" class="turn"><p>请将手机调至竖屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if (orientation=='portrait'){
				if(os) os.orientation='portrait';
				if(turnBox.length>0) turnBox.remove();
			}//edn else
		}//end if
		else{
			if (orientation=='portrait') {
				if(os) os.orientation = 'portrait';
				if(turnBox.length==0) turnBox=$('<aside class="turnhorBox" id="turnBox"><img src="images/common/turn_hor.png" class="turn"><p>请将手机调至横屏状态...</p></aside>').appendTo($('body'));
			}//end if
			else if (orientation=='landscape'){
				if(os) os.orientation='landscape';
				if(turnBox.length>0) turnBox.remove();
			}//edn else
		}//end else
	}//end func
	
	return orient;
}//end import
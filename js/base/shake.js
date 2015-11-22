//2015.11.23
var ishake=importShake();

function importShake(){
	var defaults = {hold:100,max:20,delay:50,stopDelay:500,type:1},opts;
	var $lev=0,$now=0,$last,$lastX,$lastY,$lastZ,$stop;
	var shake={};
	
	shake.on=function(options){
		opts = $.extend(defaults,options);
		opts.type=opts.type<1?1:opts.type;
		opts.type=opts.type>3?3:opts.type;
		window.addEventListener('devicemotion',devicemotion_handler,false);		
	}//end func

	shake.off=function(){
		window.removeEventListener('devicemotion',devicemotion_handler);
	}//end func
	
	function devicemotion_handler(event) {
		if($last){
			var curTime = new Date().getTime();
			var diffTime = curTime -$last;
			if (diffTime>opts.delay) {
				$last = curTime;
				// 获取含重力的加速度
				var acceleration = event.accelerationIncludingGravity; 
				var speed = Math.abs(acceleration.x+acceleration.y+acceleration.z-$lastX-$lastY-$lastZ)/diffTime*10000;
				if (speed >= opts.hold){
					$lev++;
					$now++;
					if(opts.onCount) opts.onCount($now);
					if($now==1 && opts.onStart) opts.onStart();
					else if( (opts.type==1 && $lev==opts.max) || (opts.type==2 && $now==opts.max) || (opts.type==3 && $lev==opts.max && $now==opts.max) ){
						if(opts.onComplete) opts.onComplete();
						shake.off();
					}//end if
					clearTimeout($stop);
					$stop=setTimeout(function(){
						if(opts.onStop) opts.onStop();
					},opts.stopDelay);
				}//end if
				else{
					$lev--;
					$lev=$lev<0?0:$lev;
				}//end else 
				$lastX=acceleration.x;
				$lastY=acceleration.y;
				$lastZ=acceleration.z;
				if(opts.onLevel) opts.onLevel($lev);
			}//end if
		}//end if
		else $last=new Date().getTime();
	}//end event
	
	return shake;
	
}//end import


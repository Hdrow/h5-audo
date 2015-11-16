//2015.11.16

var ishake=importShake();

function importShake(){
	
	var _delay=50,_hold=100,_max=10,_lev=0,_now=0,_type=1;
	var onStart,onCount,onLevel,onComplete,onStop;
	var lastTime=0,lastX,lastY,lastZ;
	var stopTimer,stopDelay=500;
	
	var shake={};
	
	shake.on=function(option){
		if(option){
			onStart=option.onStart;
			onCount=option.onCount;
			onLevel=option.onLevel;
			onComplete=option.onComplete;
			onStop=option.onStop;
			_hold=option.hold!=null?option.hold:100;
			_max=option.max!=null?option.max:10;
			_delay=option.delay!=null?option.delay:50;
			stopDelay=option.stopDelay!=null?option.stopDelay:500;
			_type=option.type!=null?option.type:1;
			_type=_type<1?1:_type;
			_type=_type>3?3:_type;
		}//end option
		window.addEventListener('devicemotion',devicemotion_handler,false);		
	}//end func

	shake.off=function(){
		window.removeEventListener('devicemotion',devicemotion_handler);
	}//end func
	
	function devicemotion_handler(event) {
		var curTime = new Date().getTime();
		if ((curTime-lastTime)>_delay) {
			var diffTime = curTime -lastTime;
			lastTime = curTime;
			// 获取含重力的加速度
			var acceleration = event.accelerationIncludingGravity; 
			var speed = Math.abs(acceleration.x+acceleration.y+acceleration.z-lastX-lastY-lastZ)/diffTime*10000;
			if (speed >= _hold){
				_lev++;
				_now++;
				if(onCount) onCount(_now);
				if(_now==1 && onStart) onStart();
				else if( (_type==1 && _lev==_max) || (_type==2 && _now==_max) || (_type==3 && _lev==_max && _now==_max) ){
					if(onComplete) onComplete();
					shake.shakeOff();
				}//end if
				clearTimeout(stopTimer);
				stopTimer=setTimeout(function(){
					if(onStop) onStop();
				},stopDelay);
			}//end if
			else{
				_lev--;
				_lev=_lev<0?0:_lev;
			}//end else 
			lastX=acceleration.x;
			lastY=acceleration.y;
			lastZ=acceleration.z;
			if(onLevel) onLevel(_lev);
		}//end if
	}//end event
	
	return shake;
	
}//end import


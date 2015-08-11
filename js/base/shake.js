//2015.8.3

var ishake=importShake();

function importShake(){
	
	var _delay=50,_hold=100,_max=10,_lev=0,_now=0,_type=1;
	var onStart,onCount,onLevel,onComplete,onStop;
	var _lastTime=0,_lastX,_lastY,_lastZ;
	var stopTimer,stopDelay=750;
	
	var shake={};
	
	shake.shakeOn=function(option){
		if(option){
			onStart=option.onStart;
			onCount=option.onCount;
			onLevel=option.onLevel;
			onComplete=option.onComplete;
			onStop=option.onStop;
			_hold=option.hold!=null?option.hold:100;
			_max=option.max!=null?option.max:10;
			_delay=option.delay!=null?option.delay:50;
			stopDelay=option.stopDelay!=null?option.stopDelay:750;
			_type=option.type!=null?option.type:1;
			_type=_type<1?1:_type;
			_type=_type>3?3:_type;
		}//end option
		window.addEventListener('devicemotion',deviceMotionHandler,false);		
	}//end func

	shake.shakeOff=function(){
		window.removeEventListener('devicemotion',deviceMotionHandler);
	}//end func
	
	function deviceMotionHandler(event) {
		var curTime = new Date().getTime();
		if ((curTime-_lastTime)>_delay) {
			var diffTime = curTime -_lastTime;
			_lastTime = curTime;
			// 获取含重力的加速度
			var acceleration = event.accelerationIncludingGravity; 
			var speed = Math.abs(acceleration.x+acceleration.y+acceleration.z-_lastX-_lastY-_lastZ)/diffTime*10000;
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
				stopTimer=setTimeout(stop_handler,stopDelay);
			}//end if
			else{
				_lev--;
				_lev=_lev<0?0:_lev;
			}//end else 
			_lastX=acceleration.x;
			_lastY=acceleration.y;
			_lastZ=acceleration.z;
			if(onLevel) onLevel(_lev);
		}//end if
	}//end event
	
	function stop_handler(){
		if(onStop) onStop();
	}//end func
	
	return shake;
	
}//end import


//2015.2.12
//--------------------------------摇一摇函数
function shakeOn(option){
	var _delay=50,_hold=100,_max=3,_now=0,_start,_complete,_stop=false;
	var _lastTime=0,_lastX,_lastY,_lastZ;
	if(option){
		_start=option.start;
		_complete=option.complete;
		_hold=option.hold!=null?option.hold:100;
		_max=option.max!=null?option.max:3;
		_delay=option.delay!=null?option.delay:50;
		_stop=option.stop!=null?option.stop:false;
	}//end option
	if(_complete) init();
	function init(){
		_now=0;
		_lastTime=0;
		if(window.DeviceMotionEvent) window.addEventListener('devicemotion',deviceMotionHandler,false);
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
				_now++;
				if(_now>=_max){
					_now=0;
					_complete();
					if(_stop) window.removeEventListener('devicemotion',deviceMotionHandler);
				}//end if
				else if(_start) _start(_now);
			}//end if
			else{
				_now--;
				_now=_now<0?0:_now;
			}//end else 
			_lastX=acceleration.x;
			_lastY=acceleration.y;
			_lastZ=acceleration.z;
		}//end if
	}//end event
}//end func

function shakeOff(){
	if (window.DeviceMotionEvent) window.removeEventListener('devicemotion',deviceMotionHandler);
}//end func
//2015.4.23
//--------------------------------摇一摇函数
function shakeOn(option){
	var _delay=50,_hold=150,_max=10,_lev=0,_now=0,_type=1;
	var _start,_count,_level,_complete;
	var _lastTime=0,_lastX,_lastY,_lastZ;
	
	if(option){
		_start=option.start;
		_count=option.count;
		_level=option.level;
		_complete=option.complete;
		_hold=option.hold!=null?option.hold:150;
		_max=option.max!=null?option.max:10;
		_delay=option.delay!=null?option.delay:50;
		_type=option.type!=null?option.type:1;
		_type=_type<1?1:_type;
		_type=_type>3?3:_type;
		console.log('_type:'+_type)
	}//end option
	init();
	function init(){
		window.addEventListener('devicemotion',deviceMotionHandler,false);
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
				if(_count) _count(_now);
				if(_now==1 && _start) _start();
				else if( (_type==1 && _lev==_max) || (_type==2 && _now==_max) || (_type==3 && _lev==_max && _now==_max) ){
					if(_complete) _complete();
					window.removeEventListener('devicemotion',deviceMotionHandler);
				}//end if
			}//end if
			else{
				_lev--;
				_lev=_lev<0?0:_lev;
			}//end else 
			_lastX=acceleration.x;
			_lastY=acceleration.y;
			_lastZ=acceleration.z;
			if(_level) _level(_lev);
		}//end if
	}//end event
}//end func

function shakeOff(){
	window.removeEventListener('devicemotion',deviceMotionHandler);
}//end func
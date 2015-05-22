//2015.5.22
var imath=importMath();
//------------------------------------------------------------------------------数学函数------------------------------------------------------------------------------	
function importMath(){
	var math={};
	
	//获得范围内随机整数
	math.randomRange=function(min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}//end func 
	
	//随机打乱一个数组
	math.randomSort=function(ary) {
		var len=ary.length;
		var rnd = [];
		for (var i=0; i<=len-1; i++) {
			var ran = Math.floor(Math.random()*ary.length);//从数组shu中随机选一个元素（第k个）
			rnd.push(ary[ran]);//把数组shu中选出的元素的值赋给数组myArry第i个元素；
			ary.splice(ran,1);//把数组shu中第k个元素删掉（保证下一次选的一定不会重复)
		}//end for
		for (i=0; i<=len-1; i++) ary[i]=rnd[i];
	}//end func 
	
	//随机正负
	math.randomPlus=function() {
		return Math.random()<0.5?-1:1;
	}//end func 
	
	//等比缩放
	math.autoSize=function(aryNum,aryMax){
		var aryNow=new Array()
		var aryRate= aryNum[0]/aryNum[1];
		aryNow[0] = aryMax[0];
		aryNow[1] = Math.round(aryNow[0]/aryRate);
		if(aryNow[1]<aryMax[1]){
			aryNow[1]=aryMax[1];
			aryNow[0] = Math.round(aryNow[1]*aryRate);
		}//end if				
		return aryNow;
	}//end func
	
	//缓动函数
	math.ease=function(_now,_tar,_speed,_space){
		_speed=_speed||10;
		_space=_space||0.1;
		var _dis=_tar-_now;
		if(Math.abs(_dis)>_space) return _dis/_speed+_now;
		else return _tar;
	}//end func
	
	//角度转弧度
	math.toRadian=function(degree) {
		return degree * Math.PI / 180;
	}//end func 
	
	//弧度转角度
	math.toDegree=function(radian) {
		return radian / Math.PI * 180;
	}//end func 
	
	//获得2点之间的距离
	math.getDis=function(pos1,pos2){
		var lineX=pos2[0]-pos1[0];
		var lineY=pos2[1]-pos1[1];
		return Math.sqrt(Math.pow(Math.abs(lineX),2)+Math.pow(Math.abs(lineY),2));
	}//end func 
	
	//获得2点之间的夹角
	math.getDeg=function(pos1,pos2){
		var deg;
		if(pos1[0]==pos2[0] && pos1[1]==pos2[1]){deg=0;}
		else{
			var dis_y=pos2[1]-pos1[1];
			var dis_x=pos2[0]-pos1[0];	
			deg=Math.atan(dis_y/dis_x)*180/Math.PI;
			if (dis_x<0) {deg=180+deg;}
			else if (dis_x>=0 && dis_y<0) {deg=360+deg;}
		}//end else
		return deg;
	}//end func
	
	return math;
}//end import
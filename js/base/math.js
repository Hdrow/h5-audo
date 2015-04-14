//---------------------------------------数学函数
	
function randomRange(min, max) {
	var randomNumber;
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumber;
}//end func 获得范围内随机整数

function randomSort(ary) {
	var len=ary.length;
	var rnd = [];
	for (var i=0; i<=len-1; i++) {
		var ran = Math.floor(Math.random()*ary.length);//从数组shu中随机选一个元素（第k个）
		rnd.push(ary[ran]);//把数组shu中选出的元素的值赋给数组myArry第i个元素；
		ary.splice(ran,1);//把数组shu中第k个元素删掉（保证下一次选的一定不会重复)
	}//end for
	for (i=0; i<=len-1; i++) ary[i]=rnd[i];
}//end func 随机排序一个数组

function getRound(num,n){
	n=n||2;
	var r=Math.pow(10, n);
	return Math.round(num*r)/r;
}//end func 获得几位小数点

function randomPlus() {
	return Math.random()<0.5?-1:1;
}//end func 随机正负

function toRadian(degree) {
	return degree * Math.PI / 180;
}//end func 角度转弧度

function toDegree(radian) {
	return radian / Math.PI * 180;
}//end func 弧度转角度	

function getDis(pos1,pos2){
	var lineX=pos2[0]-pos1[0];
	var lineY=pos2[1]-pos1[1];
	return Math.sqrt(Math.pow(Math.abs(lineX),2)+Math.pow(Math.abs(lineY),2));
}//end func 获得2点之间的距离

function getDeg(pos1,pos2){
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
}//end func 获得2点之间的夹角

function hitTest(obj1,obj2){
	var pos1=[obj1.offset().left+obj1.width()/2,obj1.offset().top+obj1.height()/2];
	var pos2=[obj2.offset().left+obj2.width()/2,obj2.offset().top+obj2.height()/2];

	var disX=Math.abs(pos2[0]-pos1[0]);
	var disY=Math.abs(pos2[1]-pos1[1]);
	if(disX<=obj1.width()/2+obj2.width()/2 && disY<=obj1.height()/2+obj2.height()/2) return true;
	else return false;
}//end func 碰撞函数，测试2个DOM对象是否碰撞

//等比缩放
function mathAutoSize(aryNum,aryMax){
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

//获得一个圆周上平均角度分布的点的坐标
function getCircle(num,r){
	var pos=[];
	var per=360/num;
	for(var i=0; i<num; i++){
		var deg=per*i;
		pos[i]=[];
		pos[i][0]=getRound(Math.cos(toRadian(deg))*r,3);
		pos[i][1]=getRound(Math.sin(toRadian(deg))*r,3);
		pos[i][2]=deg;
		console.log(pos[i]);
	}//end for
	return pos;
}//end func

//缓动函数
function ease(_now,_tar,_speed,_space){
	_speed=_speed||10;
	_space=_space||0.1;
	var _dis=_tar-_now;
	if(Math.abs(_dis)>_space) return _dis/_speed+_now;
	else return _tar;
}//end func
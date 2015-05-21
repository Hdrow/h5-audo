//2015.5.21

//-------------------------------------------------------定义顶级变量
var os=os||{};

//-------------------------------------------------------辅助功能
//addSignBar('本页面为测试版本,抽奖结果无效!');//测试版页面统一添加顶部提示条
os.iphone4Scroll=iphone4Scroll(true);//article 作为每个页面的根标签,iphone4Scroll(true)会让iphone4下的article标签高度拉伸到与iphone5一致，默认开启

//-------------------------------------------------------定义当前站点的分享设置
os.url='http://t.buzzreader.cn/common/iphone/';
os.content={
	link:os.url,
	image:os.url+"images/share.jpg",
	title:'分享给朋友的标题文字',
	friend:'分享给朋友的内容文字',
	timeline:'分享到朋友圈的内容文字',
	weibo:'分享到新浪微博的内容文字'
};
os.wxId='wx7cdae278cdb40e02';//客户公众号的appid
os.wxKey='dsglgj21csi1';//老古给的key
os.wxSigned=false;

//-------------------------------------------------------加载微信SDK验证和分享程序
if(os.weixin){
	document.write('<script type="text/javascript" src="js/base/jweixin.js"></script>');
	document.write('<script type="text/javascript" src="js/base/weixin.js"></script>');
}//end if

os.loadBox=$('#loadBox');//loading浮层

$(document).ready(function(e) {	

	//分享
	var shareBtn=$('a.btnShare,#btnShare');
	var shareBox=$('#shareBox');
	
	//输入框
	var inputBox=$('input[type=text],input[type=tel],textarea');
	
	init();
	
	function init(){
		window_orientation();
		$(window).on('resize',window_orientation);//横屏提示
		if(shareBtn.length>0 && !os.weixin && !os.weibo) wb_share(shareBtn);//如果有分享按钮，不在微信也不再微博下，点击分享按钮直接跳去微博分享页
		//安卓输入法改变窗体高度，缩回后窗体高度无法及时弹回的BUG解决方案
		if(os.android && inputBox.length>0){
			inputBox.on('focus blur',input_resize);
			$(window).on('resize',input_resize);
		}//end if
	}//end func
	
	//横屏提示
	function window_orientation(e){
		//翻转提示浮层
		var turnBox=$('#turnBox');
		if($(window).width()>$(window).height()){
			os.orient='landscape';
			if(turnBox.length==0) turnBox=$('<aside class="turnBox" id="turnBox"><img src="images/common/turn.png" class="turn"><p>请将手机调至竖屏状态，获得最佳浏览体验！</p></aside>').appendTo($('body'));
		}//end if
		else{
			os.orient='portrait';
			if(turnBox.length>0) turnBox.remove();
		}//end else
		console.log('window size:'+$(window).width()+'/'+$(window).height());
		console.log('iphone orientation:'+os.orient);
	}//end func
	
	//遇到有输入框的页面，在安卓下，打开输入法会直接改变窗体高度，则必须对输入框所在内容容器进行高度刷新，好让输入法关闭后内容容器高度回到正常
	function input_resize(e){
		$('article').css({height:$(window).height()});
	}//end if
	
	function shareBtn_click(e){
		shareBox.show().one('touchend',function(e){
			$(this).hide();
		});
	}//end func

});//end docuemnt ready

//--------------------------------新浪微博分享
function wb_share(btn) {
    if (btn && btn.length > 0){
		btn.each(function(i) {
           wbShare({ obj: $(this), url: os.content.link, text: os.content.weibo, image: os.content.image }); 
        });
	}//end if
}//end func

function wbShare(option){
	var _url,_txt,_img,_this,imgHtml='';
	if(option && option.obj){
		_this=option.obj;
		_url=option.url||window.location.href;
		_txt=option.text||"";
		_img=option.image;
		_txt=encodeURIComponent(_txt);
		_url=encodeURIComponent(_url);
		if(_img && _img.length>0){
			imgHtml="&pic=";
			if($.type(_img) === "string") imgHtml+=_img;
			else for(var i=0; i<_img.length; i++){
				imgHtml+=_img[i];
				if(i<_img.length-1) imgHtml+='||'
			}//end for
			imgHtml+='&searchPic=false';
		}//end for
		_this.attr({target:'_blank',href:'http://service.weibo.com/share/share.php?url=' + _url + '&title=' + _txt + imgHtml });
	}//end if
}//end func

//------------------------
function iphone4Scroll(scr){
	scr=scr||0;
	if(os.iphone4){
		if(scr){
			if(os.weixin) $('article').css({height:'121.2%'});
			else $('article').css({height:'123.6%'});
		}//end if
		else{
			$(document).on('touchmove',function(e){e.preventDefault();});
			$('article').css({height:'100%'});
		}//end else
	}//end if
	else $(document).on('touchmove',function(e){e.preventDefault();});
	return scr;
}//end func

//--------------------------------------------------------------公共方法--------------------------------------------------------------

//简易版popOn
function popOn(option){
	var _obj=option.obj;
	var _text=option.text;
	var _callback=option.callback;
	var _remove=option.remove;
	var _closeEvent=option.closeEvent||'touchend';
	var _close;
	if(_obj){
		if(_text) _obj.find('.text').html(_text);
		_obj.show();
		_close=_obj.find('a.close');
		if(_close.length>0) _close.one(_closeEvent,obj_close);
		else _obj.one(_closeEvent,obj_close);
	}//end if
	function obj_close(e){
		if(_close.length>0) _close.off();
		else _obj.off();
		if(_remove) _obj.remove();
		else _obj.hide();
		if(_callback) _callback();
	}//end func
}//end func

//取代jquery的fadeIn
function fadeIn(obj,dur,callback){
	if(obj){
		dur=dur||500;
		obj.show().css({opacity:0}).transition({opacity:1},dur,function(){
			if(callback) callback();
		});
	}//end if
}//end func

//取代jquery的fadeOut
function fadeOut(obj,dur,callback){
	if(obj){
		dur=dur||500;
		obj.transition({opacity:0},dur,function(){
			$(this).hide();
			if(callback) callback();
		});
	}//end if
}//end func

//取代系统alert
function alertFunc(text,callback){
	var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></aside>').appendTo($('body'));
	popOn({obj:box,text:text,callback:callback,remove:true,closeEvent:'click'});
}//end func


//获得http url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]); return null;
}//end func

//获得http url文件名末尾的数字
function getQueryId(len){
	len=len!=null?len:1;
	var path=window.location.pathname.split('/');
	var file=path[path.length-1];
	var str=file.split('.');
	return parseInt(str[0].substr(str[0].length-len));
}//end func

//带Loading的载入图片函数
function imageLoad(src,callback){
	//载入图
	if(src){
		var loader = new PxLoader();
		if($.type(src) === "string" && src!='') loader.addImage(src);
		else if($.type(src) === "array" && src.length>0){
			for(var i=0; i<src.length; i++){
				loader.addImage(src[i]);
			}//end for
		}//end else
		loader.addCompletionListener(function() {
			console.log('images load complete');
			loader=null;
			if(callback) callback(src);
		});			
		loader.start();	
	}//end if
}//end func	

//新增测试版提示信息
function addSignBar(text){
	$('#signBar').remove();
    var sign=$('<div id="signBar"></div>').appendTo('body');
	var text=$('<span></span>').html(text).appendTo(sign);
}//end func

function removeSignBar(){
	$('#signBar').remove();
}//end func

//打印json数据
function jsonPrint(data){
	console.log("-----------------------------------------------------------------------------");
	for(var i=0; i<data.length; i++) objectPrint(data[i]);
	console.log("-----------------------------------------------------------------------------");
}//end func

//打印object数据
function objectPrint(data){
	console.log("-----------------------------------------------------------------------------");
	var info="";
	for(var i in data) info+=i+":"+data[i]+"  "
	console.log(info);
	console.log("-----------------------------------------------------------------------------");
}//end func

//常用正则
function checkStr(str,type){
	type=type||0;
	switch(type){
		case 0:
			var reg= new RegExp(/^1[3-9]\d{9}$/);//手机号码验证
			break;
		case 1:
			var reg= new RegExp(/\w+@\w+/);//匹配EMAIL
			break;
		case 2:
			var reg= new RegExp(/^\d+$/);//是否为0-9的数字
			break;
		case 3:
			var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);//不能以数字或符号开头
			break;
		case 4:
			var reg= new RegExp(/^\w+$/);//匹配由数字、26个英文字母或者下划线组成的字符串
			break;
		case 5:
			var reg= new RegExp(/^[\u0391-\uFFE5]+$/);//匹配中文
			break;
		case 6:
			var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/);//不能包含数字和符号
			break;
	}//end switch
	if(reg.exec($.trim(str))) return true;
	else return false;
}//end func

//------------------------------------------------------------------------------数学函数------------------------------------------------------------------------------
	
//获得范围内随机整数
function randomRange(min, max) {
	var randomNumber;
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumber;
}//end func 

//随机打乱一个数组
function randomSort(ary) {
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
function randomPlus() {
	return Math.random()<0.5?-1:1;
}//end func 

//等比缩放
function autoSize(aryNum,aryMax){
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
function ease(_now,_tar,_speed,_space){
	_speed=_speed||10;
	_space=_space||0.1;
	var _dis=_tar-_now;
	if(Math.abs(_dis)>_space) return _dis/_speed+_now;
	else return _tar;
}//end func

//角度转弧度
function toRadian(degree) {
	return degree * Math.PI / 180;
}//end func 

//弧度转角度
function toDegree(radian) {
	return radian / Math.PI * 180;
}//end func 

//获得2点之间的距离
function getDis(pos1,pos2){
	var lineX=pos2[0]-pos1[0];
	var lineY=pos2[1]-pos1[1];
	return Math.sqrt(Math.pow(Math.abs(lineX),2)+Math.pow(Math.abs(lineY),2));
}//end func 

//获得2点之间的夹角
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
}//end func

//碰撞函数，测试2个DOM对象是否碰撞
function hitTest(obj1,obj2){
	if(obj1 && obj2){
		var pos1=[obj1.offset().left+obj1.outerWidth()/2,obj1.offset().top+obj1.outerHeight()/2];
		var pos2=[obj2.offset().left+obj2.outerWidth()/2,obj2.offset().top+obj2.outerHeight()/2];
		var disX=Math.abs(pos2[0]-pos1[0]);
		var disY=Math.abs(pos2[1]-pos1[1]);
		if(disX<=obj1.outerWidth()/2+obj2.outerWidth()/2 && disY<=obj1.outerHeight()/2+obj2.outerHeight()/2) return true;
		else return false;
	}//end if
	else return false;
}//end func

//获得几位小数点
function getRound(num,n){
	n=n||2;
	var r=Math.pow(10, n);
	return Math.round(num*r)/r;
}//end func

//碰撞函数，测试1个点是否在一个区域内
function hitPoint(pt,obj){
	if(pt && obj){
		var area=[obj.offset().left,obj.offset().left+obj.width(),obj.offset().top,obj.offset().top+obj.height()];
		if(pt[0]>=area[0] && pt[0]<=area[1] && pt[1]>=area[2] && pt[1]<=area[3]) return true;
		else return false;
	}//end if
	else return false;
}//end func 

//碰撞函数，测试一个点是否在透明区域
function hitPixel(pt,size,pixel){
	if(pt && size && pixel){
		var id=pt[0]+pt[1]*size[0];
		if(pixel[id*4+3]) return true;
		else return false;
	}//end if
	else return false;
}//end func


//------------------------------------------------------------------------------兼容性HACK------------------------------------------------------------------------------
//安卓部分浏览器不支持原生requestAnimationFrame，这里做兼容性处理
if(os.android){
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function() {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};
	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());
}//end if
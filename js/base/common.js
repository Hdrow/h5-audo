//2015.5.22
var icom=importCom();

$(document).ready(function(e) {
	
	//article 作为每个页面的根标签,iphone4ToIphone5(true)会让iphone4下的article标签高度拉伸到与iphone5一致，默认开启
	icom.iphone4ToIphone5(true);
	
	//测试版页面统一添加顶部提示条
	//icom.addSignBar('本页面为测试版本,抽奖结果无效!');
	
	//输入框
	var inputBox=$('input[type=text],input[type=tel],textarea');
	
	var os=window.os||{};
	
	init();
	
	function init(){
		window_orientation();
		$(window).on('resize',window_orientation);//横屏提示
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

});//end docuemnt ready

//------------------------------------------------------------------------------公共方法------------------------------------------------------------------------------
function importCom(){
	var com={};

	//--------------------------------iphone4 article标签适配到iphone5高度
	com.iphone4ToIphone5=function(scr){
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
	
	//简易版popOn
	com.popOn=function(option){
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
	com.fadeIn=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.show().css({opacity:0}).transition({opacity:1},dur,function(){
				if(callback) callback();
			});
		}//end if
	}//end func
	
	//取代jquery的fadeOut
	com.fadeOut=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.transition({opacity:0},dur,function(){
				$(this).hide();
				if(callback) callback();
			});
		}//end if
	}//end func
	
	//取代系统alert
	com.alert=function(text,callback){
		var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></aside>').appendTo($('body'));
		com.popOn({obj:box,text:text,callback:callback,remove:true,closeEvent:'click'});
	}//end func
	
	
	//获得http url参数
	com.getQueryString=function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	}//end func
	
	//获得http url文件名末尾的数字
	com.getQueryId=function(len){
		len=len!=null?len:1;
		var path=window.location.pathname.split('/');
		var file=path[path.length-1];
		var str=file.split('.');
		return parseInt(str[0].substr(str[0].length-len));
	}//end func
	
	//带Loading的载入图片函数
	com.imageLoad=function(src,callback){
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
	com.addSignBar=function(text){
		$('#signBar').remove();
		var sign=$('<div id="signBar"></div>').appendTo('body');
		var text=$('<span></span>').html(text).appendTo(sign);
	}//end func
	
	//打印object数据
	com.objectPrint=function(data){
		console.log("-----------------------------------------------------------------------------");
		var info="";
		for(var i in data) info+=i+":"+data[i]+"  "
		console.log(info);
		console.log("-----------------------------------------------------------------------------");
	}//end func
	
	//打印json数据
	com.jsonPrint=function(data){
		console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------");
		for(var i=0; i<data.length; i++) com.objectPrint(data[i]);
		console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------");
	}//end func
	
	//常用正则
	com.checkStr=function(str,type){
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
	
	//碰撞函数，测试2个DOM对象是否碰撞
	com.hitTest=function(source,target){
		if(source && target){
			if($.isArray(source)){
				var area=[target.offset().left,target.offset().left+target.width(),target.offset().top,target.offset().top+target.height()];
				if(source[0]>=area[0] && source[0]<=area[1] && source[1]>=area[2] && source[1]<=area[3]) return true;
				else return false;
			}//end if
			else{
				var pos1=[source.offset().left+source.outerWidth()/2,source.offset().top+source.outerHeight()/2];
				var pos2=[target.offset().left+target.outerWidth()/2,target.offset().top+target.outerHeight()/2];
				var disX=Math.abs(pos2[0]-pos1[0]);
				var disY=Math.abs(pos2[1]-pos1[1]);
				if(disX<=source.outerWidth()/2+target.outerWidth()/2 && disY<=source.outerHeight()/2+target.outerHeight()/2) return true;
			}//end else
		}//end if
		else return false;
	}//end func
	
	return com;
}//end import

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
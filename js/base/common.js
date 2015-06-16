//2015.6.16
var icom=importCom();

$(document).ready(function(e) {
	
	/*
	 * screenTo169(iphone4,androidVirtualKey)：默认把article作为页面的根容器，如果屏幕高宽比不是16：9，则强制拉伸到16:9
		 * 参数：
		 * iphone4：让iphone4下的article标签高度拉伸到与iphone5一致，默认值true
		 * androidVirtualKey：让使用虚拟系统按键安卓机的article标签高度拉伸到与使用物理系统按键的安卓机一致，默认值false
	 *如果页面是自动高度的，则可以注释掉这个方法，这样页面就可以滑动滚动 
	*/ 
	icom.screenTo169(true,false);
	
	//测试版页面统一添加顶部提示条
	//icom.addSignBar('本页面为测试版本,抽奖结果无效!');
	
	var os=window.os||{};
	
	init();
	
	function init(){
		window_resize_orientation();//一进入页面判断是否横屏
		$(window).on('resize',window_orientation);//横屏提示
	}//end func
	
	//---------------------------横屏提示
	function window_resize_orientation(e){
		if($(window).width()>$(window).height()) orientationHandler('landscape');
		else orientationHandler('portrait');
		console.log('window size:'+$(window).width()+'/'+$(window).height());
	}//end func
	
	function window_orientation(e) {
		if (window.orientation == 90 || window.orientation == -90) orientationHandler('landscape');
		else if (window.orientation == 0 || window.orientation == 180) orientationHandler('portrait');
	}//end if
	
	function orientationHandler(orientation){
		//翻转提示浮层
		var turnBox=$('#turnBox');
		if (orientation=='landscape') {
			os.orientation = 'landscape';		
			if(turnBox.length==0) turnBox=$('<aside class="turnBox" id="turnBox"><img src="images/common/turn.gif" class="turn"><p>请将手机调至竖屏状态，获得最佳浏览体验！</p></aside>').appendTo($('body'));
		}//end if
		else if (orientation=='portrait'){
			os.orientation='portrait';
			if(turnBox.length>0) turnBox.remove();
		}//edn else
		console.log('mobile orientation:'+os.orientation);
	}//end func

});//end docuemnt ready

//------------------------------------------------------------------------------公共方法------------------------------------------------------------------------------
function importCom(){
	var com={};

	//--------------------------------iphone4 article标签适配到iphone5高度
	com.screenTo169=function(iphone4,androidVirtualKey){
		iphone4=iphone4||false;
		androidVirtualKey=androidVirtualKey||false;
		var article=$('article');
		if(article.length>0){
			if(os.ios){
				if(os.iphone4){
					if(iphone4){
						$(document).off('touchmove',noScroll);
						if(os.weixin) article.css({height:'121.2%'});
						else article.css({height:'123.6%'});
					}//end if
					else{
						$(document).on('touchmove',noScroll);
						article.css({height:'100%'});
					}//end else
				}//end if
				else $(document).on('touchmove',noScroll);
			}//end if
			else if(os.android){
				if(!os.android169){
					if(androidVirtualKey){
						$(document).off('touchmove',noScroll);
						article.css({height:'109%'});
					}//end if
					else{
						$(document).on('touchmove',noScroll);
						article.css({height:'100%'});
					}//end else
				}//end if
				else $(document).on('touchmove',noScroll);
			}//end else if
			else $(document).on('touchmove',noScroll);
			alert(article.height());
		}//end if
		else $(document).on('touchmove',noScroll);
	}//end func
	
	function noScroll(e){
		e.preventDefault();
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
	
	//简易版popOn
	com.popOn=function(option){
		if(option && option.obj){
			var _obj=option.obj;
			var _fade=option.fade;
			var _text=option.text;
			var onOpen=option.onOpen;
			var onClose=option.onClose;
			var _remove=option.remove;
			var _closeEvent=option.closeEvent||'touchend';
			var _closeType=option.closeType||'button';
			var _closeBtn=_obj.find('a.close');
			if(_text) _obj.find('.text').html(_text);
			if(_fade) com.fadeIn(_obj,_fade);
			else _obj.show();
			if(onOpen) onOpen();
			if(_closeBtn.length>0 && _closeType=='button') _closeBtn.one(_closeEvent,obj_close);
			else _obj.one(_closeEvent,obj_close);
		}//end if
		function obj_close(e){
			if(_closeBtn.length>0 && _closeType=='button') _closeBtn.off(_closeEvent,obj_close);
			else _obj.off(_closeEvent,obj_close);
			if(_fade) com.fadeOut(_obj,_fade,function(){
				if(_remove) _obj.remove();
			});
			else if(_remove) _obj.remove();
			else _obj.hide();
			if(onClose) onClose();
		}//end func
	}//end func
	
	//取代系统alert
	com.alert=function(text,callback){
		if(text && text!=''){
			var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></aside>').appendTo($('body'));
			com.popOn({obj:box,text:text,onClose:callback,remove:true,closeEvent:'click'});
		}//end if
	}//end func
	
	
	//获得http url参数
	com.getQueryString=function(name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
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
		if(src && src!=''){
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
		if(text && text!=''){
			var sign=$('#signBar');
			if(sign.length>0) sign.find('.text').html(text);
			else{
				sign=$('<div id="signBar"></div>').appendTo('body');
				$('<span></span>').html(text).appendTo(sign);
			}//end if
		}//end if
	}//end func
	
	//打印object数据
	com.objectPrint=function(data){
		if(data){
			console.log("-----------------------------------------------------------------------------");
			var info="";
			for(var i in data) info+=i+":"+data[i]+"  "
			console.log(info);
			console.log("-----------------------------------------------------------------------------");
		}//end if
	}//end func
	
	//打印json数据
	com.jsonPrint=function(data){
		if(data){
			console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------");
			for(var i=0; i<data.length; i++) com.objectPrint(data[i]);
			console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------");
		}//end if
	}//end func
	
	//常用正则
	com.checkStr=function(str,type){
		if(str && str!=''){
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
		}//end if
		else return false;
	}//end func
	
	return com;
}//end import

//------------------------------------------------------------------------------兼容性HACK------------------------------------------------------------------------------
//安卓版微信目前还不支持原生requestAnimationFrame，这里做兼容性处理
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
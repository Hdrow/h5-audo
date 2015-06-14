//2015.6.14
//平台检测，判断浏览器、操作系统、机型、环境
var os=importOS();
function importOS() {
	var	userAgent=navigator.userAgent;
	var os = {};
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp=userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	if(os.ios) os.iosVer=parseInt(userAgent.match(/OS \d_/)[0].match(/\d/)[0]);
	else os.iosVer=0;
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.iphone6Plus=os.ios && screen.width==414 && screen.height==736 && window.devicePixelRatio==3;
	os.iphone6==os.ios && screen.width==375 && screen.height==667;
	os.iphone5=os.ios && screen.width==320 && screen.height==568;
	os.iphone4=os.ios && screen.width==320 && screen.height==480;
	os.android169=os.android && (screen.width/screen.height==9/16 || screen.height/screen.width==9/16);
	os.androidHD=os.android && (screen.width>=1080 && window.devicePixelRatio>=3);
	return os;
}//end func
//写入loadBox
document.write('<aside class="loadBox" id="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><b></b></aside>');


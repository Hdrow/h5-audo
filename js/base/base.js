//2017.4.26
//-----------------------------------os
var os = importOS();

function importOS() {
	var userAgent = navigator.userAgent;
	var os = {};
	os.userAgent = userAgent;
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp = userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	if(os.ios) os.iosVer = userAgent.match(/OS \d+_/).length > 0 ? parseInt(userAgent.match(/OS \d+_/)[0].match(/\d+/)[0]) : 0;
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
	os.netease = userAgent.indexOf("NewsApp") >= 0 ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.pc = !(os.android || os.ios || os.wp);
	os.test = window.innerWidth == 540 && window.innerHeight == 850;
	os.iphone6Plus = (os.ios && ((screen.width == 414 && screen.height == 736) || (screen.width == 736 && screen.height == 414) && window.devicePixelRatio == 3)) || (screen.width == 540 && screen.height == 876);
	os.iphone6 = (os.ios && ((screen.width == 375 && screen.height == 667) || (screen.width == 667 && screen.height == 375))) || (screen.width == 540 && screen.height == 868);
	os.iphone5 = os.ios && ((screen.width == 320 && screen.height == 568) || (screen.width == 568 && screen.height == 320));
	os.iphone4 = (os.ios && ((screen.width == 320 && screen.height == 480) || (screen.width == 480 && screen.height == 320))) || (screen.width == 540 && screen.height == 702);
	os.screen169 = screen.width / screen.height == 9 / 16 || screen.height / screen.width == 9 / 16 || (window.innerWidth == 540 && window.innerHeight == 850);
	os.huawei = os.android && !os.screen169;
	return os;
} //end func

//-----------------------------------base
var ibase = importBase();

function importBase() {
	var base = {}
	base.dir = 'portrait';
	base.keyboard = false;
	base.lock = false;
	base.cssMedia = 750;
	base.scrollTop = -1;

	base.init = function(dir, unit, wd, ht, scale) {
		this.dir = dir || 'portrait';
		this.landscapeWidth = wd || 1206;
		this.landscapeHeight = ht || 750;
		this.landscapeScale = scale || 'cover';
		this.unit = this.dir == 'landscape' ? 'px' : (unit || 'rem');
		console.log('css unit:' + unit);
		if(this.dir == 'portrait') {
			if(base.dir == 'portrait') {
				if(this.unit == 'rem' || this.unit == 'em'){
					document.write('<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');
					document.write('<link rel="stylesheet" type="text/css" href="css/common.css" />');
				}//end if
				else{
					document.write('<meta name="viewport" content="width='+base.cssMedia+', minimum-scale = '+window.screen.width/base.cssMedia+', maximum-scale = '+window.screen.width/base.cssMedia+', target-densitydpi=device-dpi">');
					document.write('<link rel="stylesheet" type="text/css" href="css/common.px.css" />');
				}//edn else
			} //end if
			document.write('<aside class="turnBoxPortrait" id="turnBox"><img src="images/common/turn.png" class="turn"><p>请将手机调至竖屏模式</p></aside>');
			this.turnBox = document.getElementById("turnBox");
			if(this.dir != base.getOrient(true)) {
				this.turnBox.style.display = "block";
				this.lock = true;
			} //edn if
			window.addEventListener("orientationchange", window_orientation, false);
		} //edn if
		else document.write('<link rel="stylesheet" type="text/css" href="css/common.landscape.css" />');
	} //end func

	base.unlockOrient = function() {
		window.removeEventListener("orientationchange", window_orientation, false);
		base.turnBox.style.display = 'none';
		document.body.scrollTop = 0;
	}; //end func

	base.getOrient = function(resize) {
		resize = resize || 0;
		if(resize) var dir = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		else var dir = window.orientation == 90 || window.orientation == -90 ? 'landscape' : 'portrait';
		console.log('window orientation:' + dir);
		return dir;
	}; //end func

	function window_orientation(e) {
		if(!base.keyboard) {
			if(base.dir != base.getOrient()) {
				base.turnBox.style.display = 'block';
				base.lock = true;
				if(os.ios) {
					if(base.scrollTop == -1 && document.body.scrollTop > 0) {
						base.scrollTop = document.body.scrollTop;
						document.body.scrollTop = 0;
					} //edn if
				} //end if
			} //edn if
			else {
				base.turnBox.style.display = 'none';
				base.lock = false;
				if(os.ios) {
					if(base.scrollTop != -1) {
						document.body.scrollTop = base.scrollTop;
						base.scrollTop = -1;
					} //edn if
				} //edn if
			} //end else
		} //edn if
	} //end func

	base.load = function(f, shell, nocache) {
		nocache = nocache != null ? nocache : true;
		var file = get_filetype(f, nocache);
		if(file.type == "css") {
			shell = shell || 'head';
			var fileref = document.createElement('link');
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", file.src);
			document.getElementsByTagName(shell)[0].appendChild(fileref);
		} //end if
		else if(file.type == "js") {
			shell = shell || 'body';
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", file.src);
			document.getElementsByTagName('body')[0].appendChild(fileref);
		} //end else
	} //end func

	base.creatNode = function(nodeName, idName, className, innerHTML) {
		nodeName = nodeName || 'div';
		className = className || '';
		idName = idName || '';
		innerHTML = innerHTML || '';
		var newNode = document.createElement(nodeName);
		if(className != '') newNode.className = className;
		if(idName != '') newNode.id = idName;
		if(innerHTML != '') newNode.innerHTML = innerHTML;
		document.getElementsByTagName('body')[0].appendChild(newNode);
	} //end func

	base.getUrl = function(url, box, fade) {
		var hmsr = icom.getQueryString('hmsr');
		hmsr = hmsr || '';
		var utm_source = icom.getQueryString('utm_source');
		utm_source = utm_source || '';
		fade = fade || 500;
		if(url && url != '') {
			url += (hmsr != '' ? (url.indexOf('?') == -1 ? '?' : '&') + 'hmsr=' + hmsr : '') + (utm_source != '' ? '&utm_source=' + utm_source : '');
			if(box && box.length > 0) icom.fadeOut(box, fade, function() {
				location.href = url;
			});
			else location.href = url;
		} //end if
	} //edn func

	function get_filetype(f, nocache) {
		nocache = nocache != null ? nocache : true;
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src = f + (nocache ? '?v=' + Math.random() : '');
		return {
			type: type,
			src: src
		};
	} //end func

	return base;
} //end func
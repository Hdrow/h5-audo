//2015.5.26
var ishare=importShare();

function importShare(){
	var share={};
	//-------------------------------------------------------定义当前站点的分享设置
	share.url='http://t.buzzreader.cn/common/iphone/';
	share.content={
		link:share.url,
		image:share.url+"images/share.jpg",
		title:'分享给朋友的标题文字',
		friend:'分享给朋友的内容文字',
		timeline:'分享到朋友圈的内容文字',
		weibo:'分享到新浪微博的内容文字'
	};
	share.wxId='wxebba976e487ba7d7';//微信 appid
	share.wxKey='dd8h3gbidsb9';//老古生成的key
	share.wxSigned=false;
	
	//-------------------------------------------------------微信SDK验证
	function wxSign(){
		$.getJSON("http://s.gumutianqi.com/jssdk/get_sign?callback=?&key="+share.wxKey+"&url="+ encodeURIComponent(window.location.href), function(data){
			if(data  && data.errcode == "0") {
				wx.config({
					debug: false,
					appId: share.wxId,
					timestamp: data.result.timestamp,
					nonceStr: data.result.noncestr,
					signature: data.result.signature,
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'hideMenuItems',
						'showMenuItems',
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem',
						'translateVoice',
						'startRecord',
						'stopRecord',
						'onRecordEnd',
						'playVoice',
						'pauseVoice',
						'stopVoice',
						'uploadVoice',
						'downloadVoice',
						'chooseImage',
						'previewImage',
						'uploadImage',
						'downloadImage',
						'getNetworkType',
						'openLocation',
						'getLocation',
						'hideOptionMenu',
						'showOptionMenu',
						'closeWindow',
						'scanQRCode',
						'chooseWXPay',
						'openProductSpecificView',
						'addCard',
						'chooseCard',
						'openCard'
					]
				});//end wx.config
				share.wxSigned=true;//通过微信新SDK验证
				wx.ready(function(){
					wx.showOptionMenu();//用微信“扫一扫”打开，optionMenu是off状态，默认开启
					share.wxShare();
				});//end wx.ready
			}//end if(data)
		});//end ajax
	}//end func
	
	//-------------------------------------------------------微信分享函数
	share.wxShare=function(){
		if(share.wxSigned){
			wx.onMenuShareTimeline({
				title: share.content.timeline, // 分享标题
				link: share.content.link, // 分享链接
				imgUrl: share.content.image, // 分享图标
				success: function () { 
					// 用户确认分享后执行的回调函数
					monitorAdd({label:'分享到朋友圈'});
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: share.content.title, // 分享标题
				desc: share.content.friend, // 分享描述
				link: share.content.link, // 分享链接
				imgUrl: share.content.image, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () { 
					// 用户确认分享后执行的回调函数
					monitorAdd({label:'分享给朋友'});
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
		}//end if
		else setTimeout(share.wxShare,250,content);
	}//end func
	
	//-------------------------------------------------------微博站外分享函数
	share.wbShare=function(option){
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
	
	if(os.weixin){
		document.write('<script type="text/javascript" src="js/base/jweixin.js"></script>');
		wxSign();
	}//end if
	
	return share;
}//end import

$(document).ready(function(e) {

	//分享
	var shareBtn=$('a.btnShare,#btnShare');
	var shareBox=$('#shareBox');
	
	init();
	
	function init(){
		if(shareBtn.length>0){
			if(os.weixin){
				if(shareBox.length<1) shareBox=$('<aside class="shareBox"><img src="images/common/share.png"></aside>').appendTo($('body'));
				shareBtn.on('touchend',shareBtn_click);
			}//end if
			else if(!os.weibo) ishare.wbShare({ obj: shareBtn, url: ishare.content.link, text: ishare.content.weibo, image: ishare.content.image });
		}//end if
	}//end func
	
	function shareBtn_click(e){
		shareBox.show().one('touchend',function(e){
			$(this).hide();
		});
	}//end func

});//end docuemnt ready
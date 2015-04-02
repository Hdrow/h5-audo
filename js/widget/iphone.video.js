//2015.3.25

//视频
var videoIos='system';//ios视频播放模式是和安卓一样点击按钮弹出全屏弹层，还是点击按钮直接调用系统播放器
var videoBtn=$('a.btnVideo,#btnVideo');
var videoBox=$("<div id='videoBox'><a class='close'></a></div>");
var videoContainer,videoPoser;

$(document).ready(function(e) {
	
	//视频播放按钮，ios8的video标签必须占据全屏宽度，旧版小尺寸按钮点击播放方案无效，现在IOS和ANDOID一样作为弹窗播放处理，保持用户体验一致
	if(videoBtn.length>0){	
		if(!os.ios || (os.ios && videoIos!='system')){
			videoBox.appendTo($('body'));
			videoBtn.on('touchend',video_play);
		}//end else
		else video_ios();
	}//end if

});//end docuemnt ready

//-------------------视频播放,支持优酷
function video_ios(){
	videoBtn.each(function(i) {
		var vid=$(this).data('vid');
		if(vid && vid!=''){
			var type=$(this).data('type');
			type=type||'youku';
			if(type=='youku'){
				$(this).children('iframe').remove();
				var video=$('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen></iframe>').appendTo($(this));
			}//end if
			else{
				$(this).children('video').remove();
				var video=$('<video type="video/mp4">').attr({src:vid}).appendTo($(this));
				var poster=$(this).data('poster');
				if(poster) video.attr({poster:poster});
			}//end else
		}//end if
	});
}//end func

function video_play(e){
	var vid=$(this).data('vid');
	if(vid && vid!=''){
		var type=$(this).data('type');
		type=type||'youku';
		var ht=$(window).width()*9/16;
		videoBox.show();
		if(type=='youku') videoContainer=$('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen isAutoPlay="true"></iframe>').css({height:ht,marginTop:$(window).height()/2-ht/2}).prependTo(videoBox);
		else{
			videoContainer=$('<video type="video/mp4" controls autoplay>').attr({src:vid}).css({height:ht,marginTop:$(window).height()/2-ht/2}).prependTo(videoBox);
			videoPoser=$(this).data('poster');
			if(videoPoser) videoContainer.attr({poster:videoPoser});
			videoContainer[0].play();
		}//end else
	}//end if
	videoBox.children('a.close').one('touchend',video_close);
}//end event

function video_close(e){
	videoContainer.remove();
	videoBox.hide();
}//end event
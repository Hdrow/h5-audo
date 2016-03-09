$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	//----------------------------------------页面初始化----------------------------------------
	iOrient.init();//屏幕翻转锁定，默认锁定竖屏，横屏提示
	icom.screenTo169(true,true);//把article标签拉伸至iphone5的高宽比例
//	icom.screenToPx(320,504,true);//把以px为单位的article标签拉伸到适应屏幕的高宽比例，iphone4默认等比压缩左右留白
//	loadBox.show();
	//iuser.init(userGetted);
	load_handler();
//	sound_handler();
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*100);
//		}); 	

		loader.addCompletionListener(function() {
			init_handler();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		console.log('init handler');
		icom.fadeOut(loadBox,500);

		var swiper = new Swiper('.user_list', {
				loop:true,
				nextButton: '.user_list .swiper-button-next',
        prevButton: '.user_list .swiper-button-prev',
        slidesPerView: 'auto',
        paginationClickable: true,
        direction: 'vertical'
    });

		monitor_handler();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
		imonitor.add({obj:$('.bar a.fl'),action:'touchend',category:'首页',label:'梦想排名'});
		imonitor.add({obj:$('.bar a.fr'),action:'touchend',category:'首页',label:'参与活动'});
	}//end func
	
});//end ready

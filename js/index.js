$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var windowScale=window.innerWidth/750;
    
    var page1 = $(".page1");
    var page2 = $(".page2");
    var page3 = $(".page3");
    var page4 = $(".page4");

    var bg1 = $(".bg1");
    var bg2 = $(".bg2");
    var bg3 = $(".bg3");
    var bg4 = $(".bg4");

    var btnGif1 = $('#btnGif1');
    var btnGif2 = $('#btnGif2');
    var btnGif3 = $('#btnGif3');
    var btnGif4 = $('#btnGif4');
    
    var handClick1 = $(".hand_click1")
    var handClick2 = $(".hand_click2")
    var handClick3 = $(".hand_click3")
    var handClick4 = $(".hand_click4")

    var tit1 = $(".tit1");
    var tit2 = $(".tit2");
    var tit3 = $(".tit3");
    var tit4 = $(".tit4");

    var content1 = $(".content1");
    var content2 = $(".content2");
    var content3 = $(".content3");
    var content4 = $(".content4");

    // canvas蒙版擦画
    var ticketCode;
	var ticketBox=$('section.ticket');
	var ticketInput=$('input[name=ticket]')
	var ticketSign=$('#ticketSign');
    
    var bgm = $(".bgm");
    var soundList;
	var webAudioOpen=false;
	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	
	function init(){
		requestAnimationFrame(function(){
//			loadBox.show();
			iuser.init(userGetted);
//			load_handler();
		});
	}//edn func
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn_phone.png');
		
		//实际加载进度
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*50);
//			loadPer.html(per+'%');
//		});
		
		loader.addCompletionListener(function() {
			init_handler();
//			load_timer(50);//模拟加载进度
			loader=null;
		});
		loader.start();	
	}//end func
	
	//模拟加载进度
	function load_timer(per){
		per=per||0;
		per+=imath.randomRange(1,3);
		per=per>100?100:per;
		loadPer.html(per+'%');
		if(per==100) setTimeout(init_handler,200);
		else setTimeout(load_timer,33,per);
	}//edn func
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
        // 函数执行
        function pageInit () {
            scratchCanvas();
            
            btnGif1.gifPause();
            btnGif2.gifPause();
            btnGif3.gifPause();
            btnGif4.gifPause();
            

            evenBInd();
        }//end func
        pageInit();

        //事件绑定
        function evenBInd () {
            $(".bgmBtn").on("click",function() {
                console.log(1);
                if(bgm.hasClass("bgm")) {
                    bgm.removeClass("bgm");
                }else {
                    bgm.addClass("bgm");
                }
            })
            handClick1.on("touchend",function () {
                page1.addClass("hide");
                page2.removeClass("hide");
                $("body").on("touchstart",function () {bg2.removeClass("hide")});            
                page2.scratchOn('images/audi/mask2.jpg',{brush:'images/audi/circle.png',left: 0.5,line: 50,onComplete:scratchComplete2});
            })
            handClick2.on("touchend",function () {
                page2.addClass("hide");
                page3.removeClass("hide");
                $("body").on("touchstart",function () {bg3.removeClass("hide")});            
                page3.scratchOn('images/audi/mask3.jpg',{brush:'images/audi/circle.png',left: 0.5,line: 50,onComplete:scratchComplete3});
            })
            handClick3.on("touchend",function () {
                page3.addClass("hide");
                page4.removeClass("hide");
                $("body").on("touchstart",function () {bg4.removeClass("hide")});                        
                page4.scratchOn('images/audi/mask4.jpg',{brush:'images/audi/circle.png',left: 0.5,line: 50,onComplete:scratchComplete4});
            })
        }//end func

        //初始化蒙版第一层
        function scratchCanvas() {
            $("body").on("touchstart",function () {bg1.removeClass("hide")});            
            page1.scratchOn('images/audi/mask1.jpg',{brush:'images/audi/circle.png',left: 0.5,line: 50,onComplete:scratchComplete1});
        }


		console.log('init handler');
//		icom.fadeOut(loadBox,500);
        monitor_handler();
        
        function onFrame(frame){
            // console.log('git play now:'+frame);
        }//edn func
        
        function onComplete(repeat){
            // console.log('git play complete:'+repeat);
        }//edn func
      
        function scratchComplete1(){
            btnGif1.gifOn({path:'images/audi/p1_',num:6,speed: 300,onFrame:onFrame,onComplete:onComplete}); 
            handClick1.css("opacity","1");
            tit1.addClass("top1");
            content1.addClass("top2");
        }//end func

        function scratchComplete2(){
            btnGif2.gifOn({path:'images/audi/p2_',num:3,speed: 300,onFrame:onFrame,onComplete:onComplete}); 
            handClick2.css("opacity","1");         
            tit2.addClass("top1");
            content2.addClass("top2");
        }//end func
        
        function scratchComplete3(){
            btnGif3.gifOn({path:'images/audi/p3_',num:4,speed: 300,onFrame:onFrame,onComplete:onComplete}); 
            handClick3.css("opacity","1");                     
            tit3.addClass("top1");
            content3.addClass("top2");
        }//end func

        function scratchComplete4(){
            btnGif4.gifOn({path:'images/audi/p4_',num:4,speed: 300,onFrame:onFrame,onComplete:onComplete}); 
            handClick4.css("opacity","1");                    
            tit4.addClass("top1");
            content4.addClass("top2");
        }//end fun

        // 背景音乐
        requestAnimationFrame(sound_handler);
        
        function sound_handler(){
            if(os.weixin) {
                try {
                    WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
                }//end try
                catch(e) {
                    wx.ready(sound_creat);
                }//edn catch
            }//edn if
            else sound_creat();
        }//edn func

        function sound_creat(){
            console.log('sound_creat');
            //bgm
            //webaudio在ios下自动播放目前不行
            ibgm.init({src:'sound/bgm.mp3',onLoaded:bgm_loaded_complete,autoplay:os.weixin});
            //audio
            soundList=iaudio.on([{src:'sound/bgm.mp3',onTimeupdate:audio_timeupdate_handler}],{onProgress:soundList_loaded_progress,onLoadComplete:soundList_loaded_complete});
   
            //测试mp3转base64
            var sound=new Audio;
            sound.src=base64Sound;
            // sound.play();
        }//end func

        function audio_timeupdate_handler(event){
            console.log(this.currentTime/this.duration*100+'%');
        }//edn func
        
        function webaudio_timeupdate_handler(_this){
    //		console.log(_this.context.currentTime/_this.buffer.duration*100+'%');
        }//edn func
        
        function bgm_loaded_complete(){
            console.log('bgm load complete');
            console.log(ibgm.audio);
            
            setTimeout(function(){
    //			ibgm.pause();
    //			ibgm.hide(true);
            },1000);
            
            setTimeout(function(){
    //			ibgm.play();
            },2000);
            
        }//edn func
        
        function soundList_loaded_progress(progress){
            console.log('progress:'+progress);
        }//edn func
        
        function soundList_loaded_complete(){
            console.log(soundList.sound);
            init_handler();
        }//edn func
    
        
        function init_handler(){
            
        }//end func
       
        var base64Sound='data:audio/mp3;base64,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';

	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	}//end func
});//end ready

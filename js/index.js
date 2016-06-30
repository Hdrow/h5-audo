$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var loadPer = loadBox.children('b');
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	//camera
	var imgShell=$('div.shell');
	var imgPanel=$('div.panel');
	var imgAdd=imgPanel.children('.btnAdd');
	var imgSub=imgPanel.children('.btnSub');
	var imgRotate=imgPanel.children('.btnRotate');
	var btnSubmit=$('.btnSubmit');
	var btnCamera=$('.btnCamera');
	var imgCanvas,imgLayer;
	var imgScaleMin=0.1,imgScaleMax=5,imgScaleTimer;
    var fileBox,fileInput;
	var btnHeart = $('.heart');
	var username = '郭沐泽';
	var headsrc = 'images/children/boy.png';
	var usenam = icom.getQueryString('username');
	var headsr = icom.getQueryString('headsrc');
	console.log(usenam+'&&'+headsr);
	$('.boy').attr({src:headsr});
	$('.usetit').html(usenam);
	var airplane = $('.airplan');
	var btnInvite = $('.btninvite');
	//----------------------------------------页面初始化----------------------------------------
	iorient.init();//屏幕翻转初始化
	icom.screenTo169(true,true);//把article标签拉伸至iphone5的高宽比例
	loadBox.show();
	iuser.init(userGetted);
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){ 
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.png');		
		//实际加载进度
		loader.addProgressListener(function(e) {
			var per=Math.round(e.completedCount/e.totalCount*50);
			loadPer.html(per+'%');
		});
		
		loader.addCompletionListener(function() {
			load_timer(50);//模拟加载进度
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
		console.log('init handler');
		icom.fadeOut(loadBox,500);
		monitor_handler();
		share_init();
		camera_init();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
	//imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	btnHeart.on('touchend',btn_Heart);
	btnInvite.on('touchend',btn_Invite);
	function btn_Heart(){
		icom.fadeIn($('.one'),20,function(e){
			$('.heart').attr({src:'images/children/heartb.png'});
			$('.one').transition({y:-50,opacity:0},1000);
		});
	}
	function btn_Invite(){
		icom.fadeIn($('.floor'),20);
		$('.floor').one('touchend',btn_Close);
	}
	function btn_Close(){
		icom.fadeOut($('.floor'),20);
	}
	function share_init(){   	 
	    var share={};  	        
	    share.link=ishare.url+'share.html?&headsrc='+headsrc+'&username='+username;
	    share.image=ishare.url+'images/share.png';
	    share.title='';
	    share.friend=share.timeline=share.other='我正在参加青岛最洋气萌宝的评选点赞最多的小萌宝能够赢取“国际安全大奖”快帮我点赞吧！';
	    ishare.reset(share);
	}
	function camera_init(){
		fileBox=$('<div id="fileBox"><input type="file" capture="camera" accept="image/*" name="fileInput"/></div>').appendTo($('body'));
		fileInput=fileBox.children();
		fileInput.on('change',file_select);
		btnCamera.on('touchend',btnCamera_click);
		btnSubmit.on('touchend',btnSubmit_click);
	}//end func
	//---------------------------------------------------拍照事件
	
	//图片确定按钮，图片编辑步骤控制
	function btnSubmit_click(e){
		var canvas = document.getElementById('mycanvas');
		canvas_send(canvas,image_combine_complete,'loop_test','png');
	}//end func
	
	function canvas_send(canvas,callback,secretkey,type){
		type=type||'jpg';
		loadBox.show();
		if(type=='png') var data=canvas.toDataURL().split(",")[1];
		else var data=canvas.toDataURL('image/jpeg', 0.8).split(",")[1];
		base64_send(data,callback,secretkey);
	}//end func
	
	function base64_send(data,callback,secretkey){
		loadBox.show();
		$.post('http://upload.be-xx.com/upload', { data: data, key: secretkey }, function (resp) {
			callback(resp);
        })
	}//end func
	
	function image_combine_complete(src){
		loadBox.hide();
		console.log('image src:'+src);
	}//end func
	
	//拍照按钮
	function btnCamera_click(e){
		$('.actrule').addClass('hidden');
		// icom.fadeOut($('.actrule'),function(){
			icom.fadeIn($('.upload'),20);
			fileInput.click();
		// });
		
	}//end func
	
	//拍照或打开本地图片
	function file_select(e) {
        var file = this.files[0];
        if (file) {
			loadBox.show();
			ireader.read({ file: file, callback: function (resp,wd,ht) {
                if (resp) img_creat(resp,wd,ht);
                else loadBox.hide();
            }});
        }//end if
      }//end select
	
	//复制图片至canvas
	function img_creat(src,wd,ht){	
		loadBox.hide();
		imgPanel.show();
		btnSubmit.show();
		imgShell.empty();
		imgCanvas=$('<canvas id="mycanvas"></canvas>').attr({width:imgShell.width(),height:imgShell.height()}).prependTo(imgShell);
		var size=imath.autoSize([wd,ht],[imgShell.width(),imgShell.height()],1);
		imgCanvas.clearCanvas().drawImage({
		  layer: true,
		  source: src,
		  width:size[0],height:size[1],
		  x: imgCanvas.width()/2, y: imgCanvas.height()/2,
		  scale:1,
		  fromCenter: true
		});
		imgCanvas.drawLayers();
		imgLayer=imgCanvas.getLayer(0);
		img_addEvent(imgCanvas,imgShell,imgLayer);
	}//end func
	
	
	//添加图片编辑事件
	function img_addEvent(canvas,shell,obj){
		imgAdd.off().on('touchstart',{obj:obj,canvas:canvas,offset:1},imgScale_touchstart).on('touchend',imgScale_touchend);
		imgSub.off().on('touchstart',{obj:obj,canvas:canvas,offset:-1},imgScale_touchstart).on('touchend',imgScale_touchend);
		imgRotate.off().on('click',{obj:obj,canvas:canvas},img_rotate);
		shell.off().on('pinch',{obj:obj,canvas:canvas},img_pinch).on('pinchmove',{obj:obj,canvas:canvas},img_pinchmove).on('pinchscale',{obj:obj,canvas:canvas},img_pinchscale).on('pinchrotate',{obj:obj,canvas:canvas},img_pinchrotate);
	}//end func
	
	//单指双指触控
	function img_pinchmove(e,xOffset,yOffset){
		var obj=e.data.obj;
   		obj.x+=xOffset;
		obj.y+=yOffset;
   	}//end func
   	
   	function img_pinchscale(e,scaleOffset){
   		var obj=e.data.obj;
   		obj.scale+=scaleOffset*0.5;
   		obj.scale=obj.scale<=imgScaleMin?imgScaleMin:obj.scale;
		obj.scale=obj.scale>=imgScaleMax?imgScaleMax:obj.scale;
   	}//end func
   	
   	function img_pinchrotate(e,rotateOffset){
   		var obj=e.data.obj;
   		obj.rotate+=rotateOffset;
// 		obj.rotate=obj.rotate>360?obj.rotate%360:obj.rotate;
// 		obj.rotate=obj.rotate<-360?-obj.rotate%360:obj.rotate;
   	}//end func
	
	function img_pinch(e){
		var canvas=e.data.canvas;
		canvas.drawLayers();
	}//end func
	
	//图片缩放
	function imgScale_touchstart(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
		imgScaleTimer=setInterval(imgScale_handler,33,e.data.obj,e.data.canvas,e.data.offset,0.05);
	}//end func
	
	function imgScale_touchend(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
	}//end func
	
	function imgScale_handler(obj,canvas,offset,speed){
		speed=speed!=null?speed:0.05;
		obj.scale+=speed*offset;
		obj.scale=obj.scale<=imgScaleMin?imgScaleMin:obj.scale;
		obj.scale=obj.scale>=imgScaleMax?imgScaleMax:obj.scale;
		canvas.drawLayers();
	}//end func
	
	//图片旋转
	function img_rotate(e){
		var canvas=e.data.canvas;
		var obj=e.data.obj;
		if(obj.rotate%90!=0) obj.rotate=Math.floor(obj.rotate/90)*90;
		else obj.rotate+=90;
		obj.rotate=obj.rotate>360?obj.rotate%360:obj.rotate;
   		obj.rotate=obj.rotate<-360?-obj.rotate%360:obj.rotate;
		canvas.drawLayers();
	}//end func
});//end ready

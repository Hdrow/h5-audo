//2015.05.05

$(document).ready(function(e) {	
	
	//结构
	var fileBox,fileInput;
	var cameraBox=$('div.camera');
	var canvasBox=$('div.canvas');
	var imgShell=$('div.shell');
	var imgPanel=$('div.panel');
	var imgBtnAdd=imgPanel.children('a.btnAdd');
	var imgBtnSub=imgPanel.children('a.btnSub');
	var imgBtnR=imgPanel.children('a.btnR');
	var imgBtnCf=$('a.btnCf');
	var imgCanvas,imgPic;
	var imgScale=0.5,imgSaleMin=0.1,imgScaleMax=2,imgScaleTimer;
	
	//拍照
	var btnCamera=$('.btnCamera');
	var btnCf=$('#btnCf');
	var btnsBox=$('div.btns');
	var imgBaby=$('img.baby');
    var imgFocus=$('.focus');	
	
	//touch 
	var mutiTouch;
	var posLast1=[],posLast2=[],disLast,disSt,degSt,degLast;
	
	init();
	
	function init(){
		fileBox=$('<div id="fileBox"><input type="file" capture="camera" accept="image/*" name="fileInput"/></div>').appendTo(htmlBox);
		fileInput=fileBox.children();
		imgShell.css({height:imgShell.width()*0.75});
		addEvent();		
	}//end func
	
	function addEvent(){
		fileInput.on('change',fileSelected);
		btnCamera.on('touchend',btnCamera_click);
		imgBtnCf.on('touchend',imgBtnCf_click);
	}//end func
	
	//---------------------------------------------------拍照事件
	
	//图片确定按钮，图片编辑步骤控制
	function imgBtnCf_click(e){
		imgSend();
	}//end func
	
	//拍照按钮
	function btnCamera_click(e){
		/*
		//微信新SDK拍照接口，由于CANVAS的toDataURL方法的安全沙箱限制，无法把通过微信接口打开的图片转成BASE64上传至服务器，此方法暂时搁置
		if(isWeixin){
			wx.chooseImage({
				success: function (res) {
					if(res.localIds.length>1) alertFunc('请选择单张照片...');
					else{
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						imageLoad(localIds,imgCreat);
					}//end else
				}
			});
		}//end if
		else fileInput.click();
		*/
		fileInput.click();
	}//end func
	
	//拍照或打开本地图片
	function fileSelected(e) {
        var file = this.files[0];
        if (file) {
			loadBox.show();
		  	var reader = new FileReader();  
		  	reader.onloadend = function() {
				loadBox.hide();
				//console.log('result.length: '+this.result.length);
				//console.log('file path: '+fileInput.val());
				if(this.result.length>0) imgCreat(this.result);
				else alertFunc('无法正确读取图片');
		  	}//end onload	
			reader.readAsDataURL(file);	
        }//end if
      }//end select
	
	//----------------------------------复制图片至canvas
	function imgCreat(src){
		loadBox.hide();
		imgBaby.hide();
		imgPanel.children('a').show();
		btnCamera.children('img').attr({src:'images/camera/btn_redo.png'});
		imgBtnCf.show();
		imgShell.empty();
		imgCanvas=$('<canvas></canvas>').attr({width:imgShell.width(),height:imgShell.height()}).prependTo(imgShell);
		imgCanvas.clearCanvas();
		imgCanvas.drawImage({
		  layer: true,
		  source: src,
		  x: imgCanvas.width()/2, y: imgCanvas.height()/2,
		  fromCenter: true
		}).drawLayers();
		imgPic=imgCanvas.getLayer(0);
		imgScale=0.5;
		imgScaleSet(imgPic);
		addImgEvent(imgPic);
	}//end func
	
	//----------------------------------上传图片
	function imgSend(e){
		loadBox.show();
		
		//模拟一下发送图片然后跳转到结果页
		setTimeout(function(){
			window.location.href='result.html';
			loadBox.hide();
		},1000);
		
		/*
		//ajax发送图片数据到服务器
		var data=$('canvas')[0].toDataURL("image/png").split(","); //图片BASE64数据
		$.post("handler.php?action=update", { data:data[1] },function(resp){
			if(resp.code == 200){
				window.location.href='result.html?photo='+resp.src;
			}
			if(data.code == 12) $('#popAlert').popOn({text:'参数错误，请重新上传~',url:"index.html"});
			if(data.code == 13) $('#popAlert').popOn({text:'图片数据错误，请重新上传~'});
			if(data.code == 14) $('#popAlert').popOn({text:'数据库错误，请重新提交~'});
		}, "json");
		*/
		//图片BASE64数据
        var data=$('canvas')[0].toDataURL("image/png").split(",");
		//头像取景框的左上角和右下角位置
		var params={x:imgFocus.width()/2,y:imgFocus.position().top,width:imgFocus.width(),height:imgFocus.height()};
		$.post("webajax/screenshot.ashx", { data:data[1],x:params.x,y:params.y,width:params.width,height:params.height },function(resp){
			if(resp.code == 200){
				window.location.href = 'select.html?photo=' + resp.src;
			}
			if(data.code == 12) $('#popAlert').popOn({text:'参数错误，请重新上传~',url:"index.html"});
			if(data.code == 13) $('#popAlert').popOn({text:'图片数据错误，请重新上传~'});
			if(data.code == 14) $('#popAlert').popOn({text:'数据库错误，请重新提交~'});
		}, "json");
		
	}//end func
	
	//----------------------------------图片编辑
	//添加图片编辑事件
	function addImgEvent(obj){//obj是ocanvas对象
		removeImgEvent();
		imgBtnAdd.on('touchstart',{obj:obj,offset:1},imgScale_touchstart);
		imgBtnAdd.on('touchend',imgScale_touchend);
		imgBtnSub.on('touchstart',{obj:obj,offset:-1},imgScale_touchstart);
		imgBtnSub.on('touchend',imgScale_touchend);
		imgBtnR.on('click',{obj:obj},imgBtnR_click);
		imgShell.on('touchstart',imgShell_touchstart);
		imgShell.on('touchmove',{obj:obj},imgShell_touchmove);
		imgShell.on('touchend',{obj:obj},imgShell_touchend);
	}//end func
	
	//移除图片编辑事件
	function removeImgEvent(){
		imgBtnAdd.off();
		imgBtnSub.off();
		imgBtnR.off();
		imgShell.off();
	}//end func
	
	//-------------------图片操控
	
	//-------单指双指触控
	function imgShell_touchstart(e){
		e.preventDefault();
		if(event.touches.length==1){
			mutiTouch=false;
			posLast1=[event.touches[0].clientX,event.touches[0].clientY];
		}//end if
		else if(event.touches.length>=2){
			mutiTouch=true;
			posLast1=[event.touches[0].clientX,event.touches[0].clientY];
			posLast2=[event.touches[1].clientX,event.touches[1].clientY];
			disLast=getDis(posLast1,posLast2);
			degSt=degLast=getDeg(posLast1,posLast2);
		}//end if
	}//end func
	
	function imgShell_touchmove(e){
		e.preventDefault();
		var obj=e.data.obj;
		if(!mutiTouch && event.touches.length==1){
			var pos1=[event.touches[0].clientX,event.touches[0].clientY];
			obj.x+=pos1[0]-posLast1[0];
			obj.y+=pos1[1]-posLast1[1];
			posLast1=pos1;
		}//end if
		else if(event.touches.length>=2){
			var pos1=[event.touches[0].clientX,event.touches[0].clientY];
			var pos2=[event.touches[1].clientX,event.touches[1].clientY];
			var dis=getDis(pos1,pos2);
			if(Math.abs(dis-disLast)>0.5){
				imgScale+=0.01*(dis-disLast)/Math.abs(dis-disLast);
				imgScale=imgScale<=imgSaleMin?imgSaleMin:imgScale;
				imgScale=imgScale>=imgScaleMax?imgScaleMax:imgScale;
				obj.scale=imgScale;
			}//end if
			var deg=getDeg(pos1,pos2);
			obj.rotate+=deg-degLast;
			posLast1=pos1;
			posLast2=pos2;
			disLast=dis;
			degLast=deg;
		}//end if
		imgCanvas.drawLayers();
	}//end func

	function imgShell_touchend(e){
		if(event.touches.length>=1) mutiTouch=true;
		else mutiTouch=false;
	}//end func
	
	//图片缩放
	function imgScale_touchstart(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
		imgScaleTimer=setInterval(imgScaleFunc,33,e.data.obj,e.data.offset);
	}//end func
	
	function imgScale_touchend(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
	}//end func
	
	function imgScaleFunc(obj,offset,speed){
		speed=speed!=null?speed:0.05;
		imgScale+=speed*offset;
		imgScaleSet(obj);
	}//end func
	
	function imgScaleSet(obj){
		imgScale=imgScale<=imgSaleMin?imgSaleMin:imgScale;
		imgScale=imgScale>=imgScaleMax?imgScaleMax:imgScale;
		obj.scale=imgScale;
		imgCanvas.drawLayers();
	}//end func
	
	//图片旋转
	function imgBtnR_click(e){
		var obj=e.data.obj;
		if(obj.rotate%90!=0) obj.rotate=Math.floor(obj.rotate/90)*90;
		else obj.rotate+=90;
		imgCanvas.drawLayers();
	}//end func

});
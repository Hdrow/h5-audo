//2015.4.7
(function($) {	
	jQuery.fn.extend({
		frameOn: function(option) {
			var _this=$(this);
			var _box=_this.children('.box');
			var _load=_this.children('.load');
			var _sign=_this.children('.sign');
			var imgNow,imgMax=30,imgWd,imgHt,imgSelf,imgPath='images/frame/',imgType='jpg',imgRepeat=true;
			var posXSt,posYSt,posXLast,posYLast;
			var idBox;
			if(option){
				imgMax=option.num!=null?option.num:30;//图片多少张
				imgPath=option.path!=null?option.path:'images/frame/';//360图片路径
				imgType=option.type!=null?option.type:'jpg';//360图片路径
				imgWd=option.width;
				imgHt=option.height;
				imgRepeat=option.repeat!=null?option.repeat:true;//是否循环序列
			}//end if
			
			loadFunc();
			
			function loadFunc(){
				//载入图
				var loader = new PxLoader();
				for(var i=0; i<imgMax; i++) loader.addImage(imgPath+i+'.jpg');			
				loader.addProgressListener(function(e) { 
					_load.html(Math.round(e.completedCount/e.totalCount*100)); 
				}); 			
				loader.addCompletionListener(function() {
					console.log('load complete');
					_load.remove();
					_sign.show();
					init();
					loader=null;
				});			
				loader.start();	
			}//end func
			
			function init(){
				_box.empty();
				imgSelf=$('<img>').appendTo(_box);	
				var size=[];
				if(imgWd && imgHt && imgWd>0 && imgHt>0){
					size=mathAutoSize([imgWd,imgHt],[_box.width(),_box.height()]);
					imgSelf.css({width:size[0],height:size[1],marginLeft:Math.floor(_box.width()/2-size[0]/2),marginTop:Math.floor(_box.height()/2-size[1]/2)});
				}//end if
				_this.on("off",_this_off).on("reset",resetFunc).on("goto",gotoFunc);
				_this.on("touchstart",touchstartHandler).on("touchmove",touchmoveHandler);
				resetFunc();
			}//end func
			
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off).off("reset",resetFunc).off("goto",gotoFunc);
				_this.off("touchstart",touchstartHandler).off("touchmove",touchmoveHandler);
			}//end func
						
			//--------自定义事件
			function resetFunc(event){
				imgNow=0;	
				switchImg();
			}//end func
			function gotoFunc(event,value){
				imgNow=value;	
				switchImg();
			}//end func	
			
			//-----------------touch事件
			function touchstartHandler(e){
				e.preventDefault();	
				posXLast=posXSt=event.touches[0].clientX;
				posYLast=posYSt=event.touches[0].clientY;
			}//end func
			function touchmoveHandler(e){
				e.preventDefault();
				moveHandler(event.changedTouches[0].clientX,event.changedTouches[0].clientY);
				posXLast=event.changedTouches[0].clientX;
				posYLast=event.changedTouches[0].clientY;
			}//end func
			
			//移动事件
			function moveHandler(x,y){
				var disX=Math.floor(Math.abs(posXSt-x));
				var disY=Math.floor(Math.abs(posYSt-y));
				var moveX=Math.abs(posXLast-x);
				var moveY=Math.abs(posYLast-y);
				if(os.ios) var disRate=1;
				else var disRate=2;
				if( moveY<=moveX*2.5 && disX%disRate==0 ){
					if(imgRepeat) imgNow=posXLast>x?imgNow-1:imgNow+1;
					else imgNow=posXLast>x?imgNow-1:imgNow+1;
				}//end if
				switchImg();
			}//end func
			
			function switchImg(){
				if(imgRepeat){
					imgNow=imgNow>imgMax-1?0:imgNow;
					imgNow=imgNow<0?imgMax-1:imgNow;
				}//end if
				else{
					imgNow=imgNow>imgMax-1?imgMax-1:imgNow;
					imgNow=imgNow<0?0:imgNow;
				}//end else
				var src=imgPath+imgNow+'.'+imgType;
				console.log('img src:'+src);
				imgSelf.attr({src:src});
			};//end func
			
		},//end fn		
		frameReset: function() {
			$(this).trigger('reset');
		},//end fn
		frameGoto: function(value) {
			value=value||0;
			$(this).trigger('goto',[value]);
		},//end fn	
		frameOff: function(value) {
			$(this).trigger('off');
		}//end fn	
	});//end extend
})(jQuery);//闭包
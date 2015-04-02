//2015.3.30
(function($) {	
	jQuery.fn.extend({
		pageOn: function(option) {	
			var _this=$(this);
			var boxBtn,boxBtnThis,boxBtnL,boxBtnR,boxWd,boxHt,boxMax,boxNow,boxDir,boxJump,boxSpeed=1500;
			var _start,_complete;
			if(option){
				boxSpeed=option.speed!=null?option.speed:1500;
				_start=option.start;
				_complete=option.complete;
			}//end if	
			init();
			function init(){
				boxWd=_this.width();
				boxHt=_this.height();
				boxBtn=_this.children("a.boxBtn");
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnL.css({top:_this.outerHeight()/2-boxBtnL.height()/2});
				boxBtnR=_this.children("a.boxBtnR");
				boxBtnR.css({top:_this.outerHeight()/2-boxBtnR.height()/2});
				boxMax=_this.children().length;//一共有几张图
				boxNow=0;
				boxDir=-1;
				boxJump=false;
				_this.on("off",_this_off).on("goto",gotoFunc).on("prev",prevFunc).on("next",nextFunc);
				_this.one('swipeup',swipeup_handler).one('swipedown',swipedown_handler);
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
				if(boxBtn.length>0){
					for(var i=0; i<boxMax; i++) boxBtn.append('<span></span>');
					boxBtnThis=boxBtn.children();
					boxBtnThis.on('touchend',boxBtnThis_click);
				}//end if
				boxBtnChange();
			}//end func
						
			
			//---------自定义事件	
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off).off("goto",gotoFunc).off("prev",prevFunc).off("next",nextFunc);
				_this.off('swipeup',swipeup_handler).off('swipedown',swipedown_handler);
				if(boxBtnL.length>0) boxBtnL.off();
				if(boxBtnR.length>0) boxBtnR.off();
				if(boxBtn.length>0) boxBtnThis.off();
			}//end func
			function prevFunc(e){
				if(!_this.hasClass("moving") && boxNow > 0){	
					boxNow--;
					boxDir=-1;
					boxMotion();
				}//end if
			}//end func
			function nextFunc(e){
				if(!_this.hasClass("moving") && boxNow < boxMax-1){
					boxNow++;
					boxDir=1;
					boxMotion();
				}//end if
			}//end func
			function gotoFunc(e,value1,value2){
				if(boxNow!=value1){
					boxNow=value1;
					boxJump=value2;
					boxMotion();
					timerFunc();
				}//end if
			}//end func		
			
			//---------------touch swipe 事件
			function swipeup_handler(e){
				if(window.console) console.log('page swipe up');
				e.preventDefault();
				boxBtnR_click();
			}//end func
			function swipedown_handler(e){
				if(window.console) console.log('page swipe down');
				e.preventDefault();
				boxBtnL_click();
			}//end func
			
			//----------鼠标事件	
			function boxBtnThis_click(e){
				var _obj=$(e.target);
				var _id=_obj.index();
				if(!_this.hasClass("moving")){
					var last=boxNow;
					boxNow=_id;
					boxDir=boxNow>last?1:boxDir;
					boxDir=boxNow<last?-1:boxDir;
					boxMotion();
				}//end if
			}//end func
			function boxBtnL_click(e){
				if(!_this.hasClass("moving") && !_this.hasClass("lockup") && boxNow > 0){
					boxNow--;
					boxDir=-1;
					boxMotion();
				}//end if
			}//end func
			function boxBtnR_click(e){
				if(!_this.hasClass("moving") && !_this.hasClass("lockdown") && boxNow < boxMax-1){	
					boxNow++;
					boxDir=1;
					boxMotion();
				}//end if
			}//end func		
			function boxMotion(){
				if(boxJump){
					boxJump=false;
					_this.css({y:-boxNow * boxHt});
				}//end if
				else{	
					_this.addClass('moving');
					_this.off('swipeup swipedown');
					_this.transition({ y:-boxNow * boxHt}, boxSpeed, boxMotionComplete);
				}//end else
				boxBtnChange();
				if(_start) _start(boxNow);
			}//end func
			function boxMotionComplete(){
				_this.removeClass('moving');
				_this.one('swipeup',swipeup_handler).one('swipedown',swipedown_handler);
				if(_complete) _complete(boxNow);
			}//end if		
			function boxBtnChange(){
				if(boxBtnL.length>0 && boxBtnR.length>0){
					if(boxNow==0){
						boxBtnL.removeClass("active");
						boxBtnR.addClass("active");
					}else if(boxNow==boxMax-1){
						boxBtnL.addClass("active");
						boxBtnR.removeClass("active");
					}else{
						boxBtnL.addClass("active");
						boxBtnR.addClass("active");
					}//end if
				}//end if
				if(boxBtn.length>0) boxBtnThis.removeClass().eq(boxNow).addClass("active");				
			}//end func
		},//end fn	
		pageReset: function() {
			$(this).trigger('reset');
		},//end fn	
		pageGoto: function(value1,value2) {
			value1=value1!=null?value1:1;
			value2=value2!=null?value2:false;
			$(this).trigger('goto', [value1,value2]);
		},//end fn
		pagePrev: function() {
			$(this).trigger('prev');
		},//end fn
		pageNext: function() {
			$(this).trigger('next');
		},//end fn
		pageOff: function() {
			$(this).trigger('off');
		}//end fn			
	});//end extend
})(jQuery);//闭包

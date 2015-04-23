//2015.4.8
(function($) {
	$.fn.extend({
		focusC: function(option) {
			var _this=$(this);	
			var boxMask,boxCont,boxThis,boxBtn,boxBtnL,boxBtnR,boxWd,boxMax,boxesWd,boxDis,boxUnit,boxTar,boxTimer,boxNow,boxBtnThis,boxDir,boxShowNum,boxJump;
			var _auto=false,_sp=1000,_delay=5000;
			var _start,_complete;
			if(option){
				_delay=option.delay!=null?option.delay:5000;
				_sp=option.speed!=null?option.speed:1000;
				_auto=option.auto!=null?option.auto:false;
				_start=option.start;
				_complete=option.complete;
			}//end if
			init();	
			function init(){
				boxMask=_this.children('.boxMask');
				boxCont=boxMask.children();
				boxThis=boxCont.children().css({width:_this.width(),height:_this.height()}).each(function(i) {$(this).data({id:i});});
				boxBtn=_this.children("a.boxBtn");
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnL.css({top:_this.outerHeight()/2-boxBtnL.height()/2});
				boxBtnR=_this.children("a.boxBtnR");
				boxBtnR.css({top:_this.outerHeight()/2-boxBtnR.height()/2});
				boxWd=_this.width();
				boxTar=0;
				boxNow=0;
				boxDir=-1;
				boxShowNum=1;
				boxJump=false;
				boxMax=boxThis.length;
				boxesWd=boxMax*boxWd;//总长度
				boxCont.width(boxesWd);
				boxDis=boxesWd-boxWd;
				boxUnit=boxWd;
				_this.on("off",_this_off).on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
				if(boxBtn.length>0){
					for(var i=0; i<boxMax; i++) boxBtn.append('<span></span>');
					boxBtnThis=boxBtn.children();
				}//end if
				boxBtnChange();
				timerFunc();
			}//end func

			//---------自定义事件
			
			function _this_off(e){
				_this.off("off",_this_off).off("prev",prevFunc).off("next",nextFunc).off("stop",stopFunc).off("play",playFunc);
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				if(boxBtnL.length>0) boxBtnL.off();
				if(boxBtnR.length>0) boxBtnR.off();
				if(_auto) clearTimeout(boxTimer);
			}//end func
			
			function stopFunc(e){
				clearTimeout(boxTimer);
			}//end func
			function playFunc(e){
				timerFunc();
			}//end func
			function prevFunc(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function nextFunc(e){
				boxDir=-1;
				boxRollFunc();
			}//end func
			
			//---------------touch swipe 事件
			function swipeleft_handler(e){
				if(window.console) console.log('focus swipe left');
				e.preventDefault();
				boxBtnR_click();
			}//end func
			function swiperight_handler(e){
				if(window.console) console.log('focus swipe right');
				e.preventDefault();
				boxBtnL_click();
			}//end func
			
			//----------鼠标事件
			function boxBtnL_click(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function boxBtnR_click(e){
				boxDir=-1;
				boxRollFunc();
			}//end func			
			function timerFunc(){
				if(_auto){
					clearTimeout(boxTimer);
					boxTimer=setTimeout(boxRollFunc,_delay);
				}//end if
			}//end func			
			function boxRollFunc(){
				if(!boxCont.hasClass("moving") && boxDis>0){
					boxMotion();
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func	
			function boxMotion(){
				boxCont.addClass('moving');
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				boxThis=boxCont.children();				
				if(boxDir==-1){
					boxNow=parseInt(boxThis.eq(1).data('id'));
					boxCont.transition({x:-boxWd }, boxJump?0:_sp, function(){
						boxThis.last().after(boxThis.first());
						boxCont.css({x:0});
						boxMotionComplete();
					});
				}//end if
				else {
					boxNow=parseInt(boxThis.last().data('id'));
					boxThis.first().before(boxThis.last());
					boxCont.css({x:-boxWd});
					boxCont.transition({x:0}, boxJump?0:_sp,boxMotionComplete);
				}//end else if
				boxBtnChange();
				if(_start) _start(boxNow);
			}//end func		
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				timerFunc();
				if(_complete) _complete(boxNow);
			}//end if
			function boxBtnChange(){
				if(boxBtn.length>0) boxBtnThis.removeClass().eq(boxNow).addClass("active");				
			}//end func
		},//end fn
		focusPrev: function() {
			$(this).trigger('prev');
		},//end fn
		focusNext: function() {
			$(this).trigger('next');
		},//end fn
		focusStop: function() {
			$(this).trigger('stop');
		},//end fn
		focusPlay: function() {
			$(this).trigger('play');
		},//end fn
		focusOff: function() {
			$(this).trigger('off');
		}//end fn	
	});//end extend	
})(jQuery);//闭包
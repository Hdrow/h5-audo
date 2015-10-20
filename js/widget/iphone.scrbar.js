//2015.10.20
(function($) {
	$.fn.extend({
		scrbar: function(option) {	
			var _this=$(this);
			var _cont,_panel,_bar,_tar,_can,_size,_sizeLast,_timer,_posLast=[],_static=false,_speed=1,_barSize,_dir=0;
			var panelFade=false;
			var onScroll,onOff;
			if(option){
				_static = option.static!=null?option.static:false;
				_speed = option.speed!=null?option.speed:1;
				panelFade= option.panelFade!=null?option.panelFade:false;
				onScroll = option.onScroll;
				onOff=option.onOff;
			}//end if
			
			init();	
			
			function init(){
				_tar=0;
				_cont=_this.children(".cont");
				_panel=_this.children(".panel");
				_bar=_panel.children();
				_this.on("off",_this_off).on('goto',gotoFunc).on('offset',offsetFunc).on("reset",resetFunc);
				_this.on("touchstart",_this_touchstart).on("touchmove",_this_touchmove).on("touchend",_this_touchend);
				_sizeLast=_size=0;
				sizeFunc();
				_timer=setInterval(sizeFunc,100);	
			}//end func		
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off).off('offset',offsetFunc).off("reset",resetFunc);
				_this.off("touchstart",_this_touchstart).off("touchmove",_this_touchmove).off("touchend",_this_touchend);
				clearInterval(_timer);
				if(onOff) onOff(_this);
			}//end func
			
			//翻滚到绝对位置
			function gotoFunc(e,pos){
				if(pos>0){
					sizeFunc();
					_dir=_tar<pos?1:-1;
					_tar=pos;
					scrollFunc();
				}//end if
			}//end func
			
			//翻滚到相对位置
			function offsetFunc(e,offset){
				if(offset!=0){
					sizeFunc();
					_dir=offset>0?1:-1;
					_tar+=offset;
					scrollFunc();
				}//end if
			}//end func
			
			//重置滚动高度
			function resetFunc(e){
				_tar=0;
				_dir=0;
				scrollFunc();
			}//end func
			
			//-------------------------------高宽度侦测及初始化
			function sizeFunc(){
				_size=_cont.outerHeight();
				if(_sizeLast!=_size){
					_sizeLast=_size;//滚动内容上一次高
					if(_static) _bar.css({y:-_cont.position().top/(_cont.outerHeight()-_this.height())*(_this.height()-_bar.outerHeight())});	
					else _bar.css({height:_this.height()/_cont.outerHeight()*_panel.height(),y:-_cont.position().top/(_cont.outerHeight()-_this.height())*(_this.height()-_bar.outerHeight())});
					_barSize=_this.height()-_bar.outerHeight();
					if(_size<=_this.height()){
						_can=false;
						_panel.hide();
					}//end if
					else{
						_can=true;
						_panel.show();
						if(panelFade) _panel.css({opacity:0});
					}//end else
				}//_sizeLast!=_size					
			}//end func	
			//-----------------TOUCH事件
			function _this_touchstart(e){
				if(_can){
					_posLast=[e.originalEvent.touches[0].clientX,e.originalEvent.touches[0].clientY];
					if(panelFade) _panel.transition({opacity:1},250);
				}//end if
			}//end func
			function _this_touchmove(e){
				e.preventDefault();
				e.stopPropagation();
				if(_can){
					var dis=e.originalEvent.touches[0].clientY-_posLast[1];
					_dir=dis>0?-1:1;
					_tar-=(e.originalEvent.touches[0].clientY-_posLast[1])*_speed;
					_posLast=[e.originalEvent.touches[0].clientX,e.originalEvent.touches[0].clientY];
					scrollFunc();
				}//end if
			}//end func
			function _this_touchend(e){
				if(_can && panelFade) _panel.transition({opacity:0},250);
			}//end func
			//-------------------------------运动计算部分	 
			function scrollFunc(){
				_tar=_tar>_barSize?_barSize:_tar;
				_tar=_tar<0?0:_tar;
				_bar.css({y:_tar});
				var percent=_tar/(_barSize);
				_cont.css({y:-percent*(_size-_this.height())});	
				if(onScroll) onScroll(percent,_dir,_this);
			}//end func			
		},//end fn
		scrbarReset: function() {
			$(this).triggerHandler('reset');
		},//end fn
		scrbarGoto: function(pos) {
			if(pos) $(this).triggerHandler('goto',[pos]);
		},//end fn
		scrbarOffset: function(offset) {
			if(offset) $(this).triggerHandler('offset',[offset]);
		},//end fn
		scrbarOff: function() {
			$(this).triggerHandler('off');
		}//end fn	
	});//end extend
})(jQuery);//闭包
//2015.5.13
(function($) {	
	$.fn.extend({
		popOn: function(option) {	
			var _this=$(this);
			var _y,_text,_url,_callback,_parent,_fade=0,_wrap=true,_fullclose=false;
			var _close=_this.find("a.close"),_closeEvent='touchend';
			if(option){
				_text=option.text;
				_url=option.url!=null?option.url:false;
				_callback=option.callback;
				_y=option.y;
				_fade=option.fade!=null?option.fade:250;
				_wrap=option.wrap!=null?option.wrap:true;
				_fullclose=option.fullclose!=null?option.fullclose:false;
				_closeEvent=option.closeEvent!=null?option.closeEvent:'touchend';
			}//end if
			init();
			
			function init(){
				if(_wrap){
					if(!_this.parent().hasClass('popBox')) _this.wrap("<div class='popBox'></div>");
					_parent=_this.parent();
				}//end if
				_this.show();
				if(_fade>0){
					if(_wrap) _parent.css({opacity:0}).transition({opacity:1},_fade);
					_this.css({opacity:0}).transition({opacity:1},_fade);
				}//end if
				if(_text) _this.find('.text').html(_text);
				if(_wrap){
					resizeFunc();
					$(window).on('resize',resizeFunc);
					$(document).on('touchmove',noScroll);
				}//end if
				_this.one('off',_this_off);
				if(_fullclose) _this.one(_closeEvent,_this_off);
				else if(_close.length>0) _close.one(_closeEvent,_this_off);
			}//end func
			function _this_off(e){
				_this.off('close',_this_off);
				if(_fullclose) _this.off(_closeEvent,_this_off);
				else if(_close.length>0) _close.off(_closeEvent,_this_off);
				if(_fade>0){
					if(_wrap) _parent.transition({opacity:0},Math.round(_fade/2));
					_this.transition({opacity:0},Math.round(_fade/2),closeFunc);
				}//end if
				else closeFunc();
			}//end func
			
			function closeFunc(){
				_this.hide();
				if(_wrap){
					_this.unwrap();
					$(window).off('resize',resizeFunc);
					$(document).off('touchmove',noScroll);
				}//end if
				if(_callback) _callback();
				if(_url) window.location.href = _url;
			}//edn func
			
			function resizeFunc(e){
				if(_y) _this.css({x:$(window).width()/2-_this.outerWidth()/2,y:_y});
				else _this.css({x:$(window).width()/2-_this.outerWidth()/2,y:$(window).height()/2-_this.outerHeight()/2});
			}//end func
			
			function noScroll(e){
				e.preventDefault();
			}//end func
			
		},//end fn
		popOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包
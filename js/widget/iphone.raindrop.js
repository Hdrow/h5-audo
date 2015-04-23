//2015.4.23
(function($) {
	$.fn.extend({
		raindropOn: function(option) {
			var _this=$(this);
			var _num=50,_delay=2500,_box,_wd=_this.width(),_ht=_this.height(),_data=[],_end=false;
			var isIphone4=os.ios && screen.width==320 && screen.height==480;
			var _ratio=$(window).width()/320;
			if(option){
				_num=option.number!=null?option.number:50;
				_delay=option.delay!=null?option.delay:250;
			}//end if
			//if(isIphone4) _num=Math.floor(_num/2);
			init();
			
			function init(){
				addBox();
				_this.on('off',_this_off);
			}//end func
			
			function _this_off(e){
				_this.off('off',_this_off);
				_end=true;
			}//end func
			
			function addBox(){				
				for(var i=0; i<_num; i++) $('<i></i>').appendTo(_this);
				_box=_this.children();
				_box.each(function(i) {
					setBox($(this),i,true);
				});
			}//end func
			
			function setBox(box,i,start){
				start=start||false;
				var x=randomRange(0,_wd);
				if(start) var y=randomRange(0,_ht);
				else var y=randomRange(0,_ht*0.5);
				var wd=0.5+randomRange(1,6)*0.1;
				var ht=0.5+randomRange(4,8)*0.1;
				var scale=randomRange(5,10)*0.1;
				var alpha=0.2+randomRange(1,3)*0.1;
				_data[i]={x:x,y:y};
				box.css({x:x,y:y,width:wd+'em',height:ht+'em',scale:0,opacity:alpha});
				box.transition({scale:scale}, 1000+randomRange(1000,2000), "ease",function(){
					moveBox(box,i);
				});
			}//end func
			
			function moveBox(box,i){
				_data[i].y+=Math.floor(Math.random()*40)+10;
				box.transition({x:_data[i].x,y:_data[i].y}, Math.floor((Math.random()*1000)+1000), "ease",function(){
					if(!_end){
						if(_data[i].y>_ht) setBox(box,i);
						else setTimeout(moveBox,_delay+randomRange(0,40)*0.1,box,i);
					}//end if
					else box.transition({opacity:0,scale:0.1},1000,function(){
						$(this).remove();
					});
				});
			}//end func
				
		},//end fn
		raindropOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend
})(jQuery);//闭包
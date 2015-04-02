//2015.3.26
(function($) {	
	$.fn.extend({
		blastInit: function(option) {	
			var _this=$(this);
			var _x=0,_y=0,_num=50,_speed=250,_ratio=5,_roll=false,_skew=false,_type=1,_style='style';
			var _offsetY=0,_offsetX=0,_rangeX=$(window).width()*0.5,_rangeY=$(window).height()*0.5;
			var _boxes=[],speedMax=-1;
			var _maxId;
			var _loaded,_complete;
			if(option){
				_num = option.number!=null?option.number:50;
				_speed = option.speed!=null?option.speed:250;
				_ratio = option.ratio!=null?option.ratio:5;
				_roll = option.roll!=null?option.roll:false;
				_skew = option.skew!=null?option.skew:false;
				_type = option.type!=null?option.type:1;
				_style = option.style!=null?option.style:'style';
				_x=option.x!=null?option.x:0;
				_y=option.y!=null?option.y:0;
				_offsetX=option.offsetX!=null?option.offsetX:0;
				_offsetY=option.offsetY!=null?option.offsetY:0;
				_rangeX=option.rangeX!=null?option.rangeX:$(window).width()*0.5;
				_rangeY=option.rangeY!=null?option.rangeY:$(window).height()*0.5;
				_loaded=option.loaded;
				_complete=option.complete;
			}//end if
			init();
			
			function init(){
				_this.on('off',_this_off).on('on',_this_on);
				box_creat();
			}//end func	
			
			function _this_off(e){
				_this.off('off',_this_off).off('on',_this_on);
				_this.remove();
			}//end func
			
			function box_creat() {
				for(var i=0; i<_num; i++){
					var box=$('<i></i>').appendTo(_this);
					box_set(box,i);
				}//end for
				console.log('_boxes:'+_boxes.length);
				console.log('_maxId:'+_maxId);
				if(_loaded) _loaded(_this);
			}//end func
			
			function _this_on(){
				for(var i=0; i<_boxes.length; i++){
					var data=_boxes[i];
					box_move(data.box,data.speed,data.trans,data.id);
				}//end for
			}//end func
			
			function box_set(box,id){
				if(_type>1) box.removeClass().addClass(_style+randomRange(1,_type));
				var ratio=randomRange(1,_ratio);//远近比例参数,5 LEVEL
				if(_ratio>1) var scale=0.1+ratio*0.18;
				else var scale=1;
				var x=_x;
				if(_offsetX!=0) x+=randomRange(-_offsetX,_offsetX);
				var y=_y;
				if(_offsetY!=0) y+=randomRange(-_offsetY,_offsetY);
				var x_tar=x+randomRange(-_rangeX,_rangeX);
				var y_tar=y+randomRange(-_rangeY,_rangeY);
				var speed=_speed+(_ratio-ratio)*randomRange(_speed,_speed*2);
				if(speedMax==-1 || speedMax<speed){
					speedMax=speed;
					_maxId=id;
				}//end if
				var rotate=getDeg([x,y],[x_tar,y_tar])-90;
				var css={x:x,y:y,scale:scale,rotate:rotate,opacity:1};
				var trans={x:x_tar,y:y_tar,rotate:rotate,opacity:0};
				if(_roll){
					css.perspective=400;
					css.rotateX=randomRange(-45,45);
					css.rotateY=randomRange(-45,45);
					trans.rotateX=360+randomRange(0,360);
					trans.rotateY=360+randomRange(0,360);
				}//end else
				if(_skew){
					css.skewX=randomRange(-45,45);
					css.skewY=randomRange(-45,45);
				}//end else
				box.css(css).hide();
				_boxes.push({box:box,speed:speed,trans:trans,id:id});
			}//end func
			
			function box_move(box,speed,trans,id){
				 box.show().transition(trans,speed,'in-out',function(){
					$(this).remove();
					if(id==_maxId && _complete) _complete(_this);
				});
			}//end func
			
		},//end fn
		blastOn: function() {
			$(this).trigger('on');
		},
		blastOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包
//2015.4.9
(function($) {	
	jQuery.fn.extend({
		swingOn: function(option) {
			var _this=$(this);
			var _degree=30,_speed=50,_off=false,_rotateOrg;
			var idBox;
			if(option){
				_degree=option.degree!=null?option.degree:30;
				_speed=option.speed!=null?option.speed:50;
			}//end if
			else{
				imgMax=30;//u向图片多少张
				imgPath='images/frame/';//360图片路径
				imgTest=false;
				imgRepeat=true;
			}//end else
			init();
			
			function init(){
				_off=false;
				_rotateOrg=_this.css('rotate');
				_this.on("off",_this_off);
				swingFunc();
			}//end func
			
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off);
				_off=true;
			}//end func
						
			function swingFunc(){
				_this.each(function(i,n) {
                    $(n).data({dir:randomPlus()})
					swingSet($(n));
                });
			}//end func
			
			function swingSet($this){
				var dir=$this.data('dir');
				var range=randomRange(Math.floor(_degree*0.5),_degree);
				var speed=range*_speed;
				$this.transition({ rotate: dir*range },speed,'in-out',function(){
					$this.transition({ rotate: -dir*range },speed,'in-out',function(){
						if(!_off) swingSet($this);
						else $this.transition({ rotate: _rotateOrg },speed);
					});
				});
			}//end func
			
		},//end fn
		swingOff: function(value) {
			$(this).trigger('off');
		}//end fn	
	});//end extend
})(jQuery);//闭包
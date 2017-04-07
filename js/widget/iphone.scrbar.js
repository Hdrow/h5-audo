//2017.4.7
(function($) {
	$.fn.extend({
		scrbar: function(options) {	
			var $this=$(this);
			var $cont=$this.children(".cont");
			var $panel=$this.children(".panel");
			var $bar=$panel.children(),$barSize=$this.height()-$bar.outerHeight();
			var $tar=0,$can,$size=0,$sizeLastCont=0,$sizeLastThis=$this.height(),$posLast=0,$dir=0;
			var defaults = {static:false,speed:1,panelFade:false,overback:true};
			var opts = $.extend(defaults, options);
			var $sizeTimer,$scrollTimer;
			var $speed=0,$timeLast=0;
			var $scale=$this.height()/$cont.height()*(os.ios?1:1.5);
			var $ease=os.ios?26:12;
			var $touch=false;
			var $overbackTimer;
			
			init();	
			
			function init(){
				$this.on("off",this_off).on('goto',this_goto).on('offset',this_offset).on("top",this_top).on("bottom",this_bottom).on("pause",this_pause).on("resume",this_resume);
				$this.on("touchstart",this_touchstart).on("touchmove",this_touchmove).on("touchend",this_touchend);
				size_handler();
				$sizeTimer=icom.setInterval(100,size_handler);
				$scrollTimer=requestAnimationFrame(scroll_handler);
			}//end func
			
			function this_off(e){
				$this.off("off goto offset top bottom pasue resume");
				$this.off("touchstart",this_touchstart).off("touchmove",this_touchmove).off("touchend",this_touchend);
				icom.clearInterval($sizeTimer);
				cancelAnimationFrame($scrollTimer);
				if(opts.onOff) opts.onOff($this);
			}//end func
			
			function this_pause(e){
				$this.off("touchstart touchmove touchend");
				$bar.css({opacity:0.2});
			}//end func
			
			function this_resume(e){
				$this.on("touchstart",this_touchstart).on("touchmove",this_touchmove).on("touchend",this_touchend);
				$bar.css({opacity:1});
			}//end func
			
			function this_goto(e,pos){
				if(pos>0){
					size_handler();
					$dir=$tar<pos?1:-1;
					$tar=pos;
					scroll_handler();
				}//end if
			}//end func
			
			function this_offset(e,offset){
				if(offset!=0){
					size_handler();
					$dir=offset>0?1:-1;
					$tar+=offset;
					scroll_handler();
				}//end if
			}//end func
			
			function this_top(e){
				size_handler();
				$tar=0;
				$dir=0;
				scroll_handler();
			}//end func
			
			function this_bottom(e){
				size_handler();
				$tar=$barSize;
				$dir=-1;
				scroll_handler();
			}//end func
			
			function size_handler(){
//				console.log('size_handler');
				$size=$cont.outerHeight();
				if($sizeLastCont!=$size || $sizeLastThis!=$this.height()){
					if(opts.static){
						$tar=-$cont.position().top/($cont.outerHeight()-$this.height())*($this.height()-$bar.outerHeight())
						$bar.css({y:$tar});
					}//end if
					else{
						$bar.css({height:$this.height()/$cont.outerHeight()*$panel.height()});
						$barSize=$this.height()-$bar.outerHeight();
					}//edn esle
					if($size<=$this.height()){
						$can=false;
						$panel.hide();
					}//end if
					else{
						$can=true;
						$panel.show();
						if(opts.panelFade) $panel.css({opacity:0});
					}//end else
					$scale=$this.height()/$size*(os.ios?1:1.4);
					$sizeLastCont=$size;//滚动内容上一次高
					$sizeLastThis=$this.height();
				}//end if			
			}//end func	
			
			function this_touchstart(e){
				if($can){
					if(opts.panelFade) $panel.transition({opacity:1},250);
					$touch=true;
					$speed=0;
					$timeLast=new Date().getTime();
					$posLast=e.originalEvent.touches[0].screenY;
				}//edn if
			}//end func
			
			function this_touchmove(e){
				e.preventDefault();
				if($can){
					var dis=e.originalEvent.touches[0].screenY-$posLast;
					$dir=dis>0?-1:1;
					var time=new Date().getTime()-$timeLast;
					$speed=-dis/time*$scale*45;
					$posLast=e.originalEvent.touches[0].screenY;
					$timeLast=new Date().getTime();
				}//edn if
			}//end func
			
			function this_touchend(e){
				if($can){
					$touch=false;
					if(opts.panelFade) $panel.transition({opacity:0},250);
					if(opts.overback){
						if($tar<0 || $tar>$barSize){
							$speed=0;
							cancelAnimationFrame($scrollTimer);
							$overbackTimer=requestAnimationFrame(scroll_overback);
						}//edn if
					}//edn if
				}//edn if
			}//end func
			
			function scroll_handler(){
				if($speed!=0){
					if(!$touch) $speed=imath.ease($speed,0,$ease,0.1);
					else $speed=imath.ease($speed,0,1.5,0.1);
					if(opts.overback){
						var tar=$tar;
						tar+=$speed;
						if((tar<0 && $dir==-1) || (tar>$barSize && $dir==1) ) $speed*=0.18;
						$tar+=$speed;
					}//edn if
					else{
						$tar+=$speed;
						$tar=$tar>$barSize?$barSize:$tar;
						$tar=$tar<0?0:$tar;
					}//end else
					scroll_set();
				}//edn if
				$scrollTimer=requestAnimationFrame(scroll_handler);
			}//end func
			
			function scroll_set(){
				$bar[0].style.transform='translate3d(0,'+$tar+'px,0)';
				var percent=$tar/$barSize;
				var position=percent*($size-$this.height());
				$cont[0].style.transform='translate3d(0,'+ (-position) +'px,0)';
				if(opts.onScroll) opts.onScroll(position,percent,$dir);
			}//edn func
			
			function scroll_overback(){
				var back=$tar<0?0:$barSize;
				$tar=imath.ease($tar,back,5,0.1);
				scroll_set();
				if($tar!=back) $overbackTimer=requestAnimationFrame(scroll_overback);
				else $scrollTimer=requestAnimationFrame(scroll_handler);
			}//edn func
			
		},//end fn
		scrbarPause: function() {
			$(this).triggerHandler('pause');
		},//end fn
		scrbarResume: function() {
			$(this).triggerHandler('resume');
		},//end fn
		scrbarTop: function() {
			$(this).triggerHandler('top');
		},//end fn
		scrbarBottom: function() {
			$(this).triggerHandler('bottom');
		},//end fn
		scrbarGoto: function(pos) {
			if(pos && pos>=0) $(this).triggerHandler('goto',[pos]);
		},//end fn
		scrbarOffset: function(offset) {
			if(offset) $(this).triggerHandler('offset',[offset]);
		},//end fn
		scrbarOff: function() {
			$(this).triggerHandler('off');
		}//end fn
	});//end extend
})(jQuery);//闭包
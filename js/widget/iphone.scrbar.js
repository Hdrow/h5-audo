//2017.8.11
(function($) {
	$.fn.extend({
		scrbar: function(options) {	
			var $this=$(this);
			var $cont=$this.children(".cont");
			var $panel=$this.children(".panel");
			var $bar=$panel.children(),$barSize;
			var $tar=0,$tarBack=0,$can=true,$posLast=0,$dir=0,$enable=true;
			var $sizeCont=0,$sizeThis=0,$sizeTimer,$scrollTimer;
			var defaults = {static:false,speed:1,panelFade:false,overback:true};
			var opts = $.extend(defaults, options);
			var $speed=0,$rate=45,$timeLast=0;
			var $scale=0;
			var $ease=os.ios?0.95:0.92;
			var $touched=false,$moving=false;
			
			init();	
			
			function init(){
				$this.on("off",this_off).on('goto',this_goto).on('offset',this_offset).on("top",this_top).on("bottom",this_bottom).on("pause",this_pause).on("resume",this_resume);
				$this.one("touchstart",this_touchstart);
				size_handler();
				scroll_handler();
			}//end func
			
			function size_handler(){
//				console.log('size_handler');
				if($sizeCont!=$cont.height() || $sizeThis!=$this.height()){
					$sizeCont=$cont.height();
					$sizeThis=$this.height();
					$scale=$sizeThis/$sizeCont*(os.ios?1:1.5);
					if(opts.static){
						$tar=-$cont.position().top/($sizeCont-$sizeThis)*($sizeThis-$bar.height())
						$bar.css({y:$tar,z:0});
					}//end if
					else{
						$bar.css({height:$sizeThis/$sizeCont*$panel.height()});
						$barSize=$sizeThis-$bar.height();
					}//edn esle
					if($sizeCont<=$sizeThis){
						$can=false;
						$panel.hide();
					}//end if
					else{
						$can=true;
						$panel.show();
						if(opts.panelFade) $panel.css({opacity:0});
					}//end else
					$scale=$sizeThis/$sizeCont*(os.ios?1:1.4);
				}//end if
				$sizeTimer=icom.setTimeout(size_handler,15,true);
			}//end func	
			
			function this_off(e){
				$this.off("off goto offset top bottom pasue resume");
				$this.off("touchstart",this_touchstart).off("touchmove",this_touchmove).off("touchend",this_touchend);
				clearTimeout($sizeTimer);
				cancelAnimationFrame($scrollTimer);
				if(opts.onOff) opts.onOff($this);
			}//end func
			
			function this_pause(e){
				$enable=false;
			}//end func
			
			function this_resume(e){
				$enable=true;
			}//end func
			
			function this_goto(e,pos){
				if(pos>0 && $enable){
					icom.clearTimeout($sizeTimer);
					size_handler();
					$dir=$tar<pos?1:-1;
					pos=pos/($sizeCont-$sizeThis)*($sizeThis-$bar.height())
					$tar=pos;
					$tar=Math.max(0,Math.min($tar,$barSize));
					$speed=0;
					scroll_set();
				}//end if
			}//end func
			
			function this_offset(e,offset){
				if(offset!=0 && $enable){
					icom.clearTimeout($sizeTimer);
					size_handler();
					$dir=offset>0?1:-1;
					offset=offset/($sizeCont-$sizeThis)*($sizeThis-$bar.height())
					$tar+=offset;
					$tar=Math.max(0,Math.min($tar,$barSize));
					$speed=0;
					scroll_set();
				}//end if
			}//end func
			
			function this_top(e){
				icom.clearTimeout($sizeTimer);
				size_handler();
				$tar=0;
				$dir=1;
				$speed=0;
				scroll_set();
			}//end func
			
			function this_bottom(e){
				icom.clearTimeout($sizeTimer);
				size_handler();
				$tar=$barSize;
				$dir=-1;
				$speed=0;
				scroll_set();
			}//end func
			
			function this_touchstart(e){
				if($can && $enable){
					if(opts.panelFade) $panel.transition({opacity:1},250);
					$touched=true;
					$speed=0;
					$timeLast=new Date().getTime();
					$posLast=e.originalEvent.touches[0].clientY;
					$(this).on("touchmove",this_touchmove).one("touchend",this_touchend);
				}//edn if
				else $(this).one("touchstart",this_touchstart);
			}//end func
			
			function this_touchmove(e){
				e.preventDefault();
				if(!$moving){
					$moving=true;
					$cont.addClass('moving');
				}//edn if
				var dis=e.originalEvent.touches[0].clientY-$posLast;
				$dir=dis>0?-1:1;
				var time=new Date().getTime()-$timeLast;
				$speed=-dis/time*$scale*$rate;
				$posLast=e.originalEvent.touches[0].clientY;
				$timeLast=new Date().getTime();
			}//end func
			
			function this_touchend(e){
				$(this).off("touchmove",this_touchmove).one("touchstart",this_touchstart);
				$touched=false;
				if(opts.panelFade) $panel.transition({opacity:0},250);
				if(opts.overback){
					if($tar<0 || $tar>$barSize){
						$speed=0;
						$tarBack=$tar<0?0:$barSize;
						$(this).off("touchstart",this_touchstart);
						cancelAnimationFrame($scrollTimer);
						$scrollTimer=requestAnimationFrame(scroll_overback);
						if(opts.onOverscroll) opts.onOverscroll();
					}//edn if
				}//edn if
			}//end func
			
			function scroll_handler(){
				if($speed!=0 && $can && $enable){
					if(!$touched){
						$speed*=$ease;
						$speed=Math.abs($speed)<=0.1?0:$speed;
					}//edn if
					else{
						$speed*=0.4;
						$speed=Math.abs($speed)<=0.4?0:$speed;
					}//edn if
					if(opts.overback){
						var tar=$tar+$speed;
						if((tar<0 && $dir==-1) || (tar>$barSize && $dir==1) ) $speed*=0.1;
						$tar+=$speed;
					}//edn if
					else{
						$tar+=$speed;
						$tar=Math.max(0,Math.min($tar,$barSize));
					}//end else
					scroll_set();
				}//edn if
				else if($moving){
					$moving=false;
					$cont.removeClass('moving');
				}//edn if
				$scrollTimer=requestAnimationFrame(scroll_handler);
			}//end func
			
			function scroll_set(){
//				console.log('$tar:'+$tar);
				$bar.css({y:$tar,z:0});
				var percent=$tar/$barSize;
				var position=percent*($sizeCont-$sizeThis);
				$cont.css({y:-position,z:0});
				if(opts.onScroll) opts.onScroll(position,percent,$dir);
			}//edn func
			
			function scroll_overback(){
				$tar=imath.ease($tar,$tarBack,4,0.1);
				scroll_set();
				if($tar!=$tarBack) $scrollTimer=requestAnimationFrame(scroll_overback);
				else{
					$moving=false;
					$cont.removeClass('moving');
					$this.one("touchstart",this_touchstart);
					$scrollTimer=requestAnimationFrame(scroll_handler);
					if(opts.onOverback) opts.onOverback();
				}//end else
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
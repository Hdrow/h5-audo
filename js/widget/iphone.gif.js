//2017.3.29
(function($) {	
	jQuery.fn.extend({
		gifOn: function($path,$num,options){
			if($path && $path!='' && $num>1){
				var $this=$(this);
				var defaults = {type:'png',speed:100,repeat:-1,endStart:false,pause:false,first:0,mode:1};
				var opts = $.extend(defaults,options);
				var $now=opts.first,$last=-1,$timer,$repeat=0;
				load_handler();
			}//end if
			
			function load_handler(){
				var loader = new PxLoader();
				for(var i=1; i<=$num; i++) loader.addImage($path+i+'.'+opts.type);
				loader.addCompletionListener(function() {
					console.log('gif loaded');
					loader=null;
					if(opts.onLoaded) opts.onLoaded($this);
					init();
				});			
				loader.start();	
			}//end func
			
			function init(){
				if(opts.mode==1){
					for(var i=1; i<=$num; i++) $('<img>').attr({src:$path+i+'.'+opts.type}).appendTo($this);
					$chd=$this.children();
				}//edn if
				$this.on('off',this_off).on('pause',this_pause).on('resume',this_resume).on('goto',this_goto).on('speed',this_speed);
				if(!opts.pause) $timer=setInterval(this_play,opts.speed);
				this_switch();
			}//end init
			
			function this_off(e){
				$this.off('off pause resume goto speed');
				clearInterval($timer);
			}//end if
			
			function this_pause(e,id){
				clearInterval($timer);
				if(id!=null && $now!=id) this_goto(null,id);
			}//end func
			
			function this_resume(e){
				clearInterval($timer);
				$timer=setInterval(this_play,opts.speed);
			}//end func
			
			function this_goto(e,id){
				if(id!=null && $now!=id){
					$now=id;
					this_switch();
				}//end if
			}//end func
			
			function this_speed(e,speed){
				opts.speed=speed;
				this_resume();
			}//end func
			
			function this_play(){
				$now++;
				if($now>=$num){
					$repeat++;
					if(opts.onComplete) opts.onComplete($this,$repeat);
					if(opts.repeat>=0){
						if($repeat<=opts.repeat){
							$now=0;
							this_switch();
						}//end if
						else this_off();
					}//end if
					else{
						$now=0;
						this_switch();
					}//end else
				}//end if
				else this_switch();
			}//end func
			
			function this_switch(){
				if(opts.mode==1){
					$chd.eq($now).show();
					if($last!=-1 && $last!=$now) $chd.eq($last).hide();
				}//edn if
				else{
					$this.attr({src:$path+($now+1)+'.'+opts.type});
				}//edn else
				$last=$now;
				if(opts.onFrame) opts.onFrame($this,$now+1);
			}//end func

		},//end fn
		gifPause: function(id) {
			$(this).triggerHandler('pause',[id]);
		},//end fn
		gifResume: function() {
			$(this).triggerHandler('resume');
		},//end fn
		gifGoto: function(id) {
			id=Math.abs(id);
			$(this).triggerHandler('goto',[id]);
		},//end fn
		gifSpeed: function(speed) {
			if(speed && speed>0) $(this).triggerHandler('speed',[speed]);
		},//end fn
		gifOff: function() {
			$(this).triggerHandler('off');
		}//end fn			
	});//end extend
})(jQuery);//闭包
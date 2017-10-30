//2018.10.23
(function($) {	
	jQuery.fn.extend({
		gifLayaOn: function(json,options){
			if(json){
				var $this=$(this);
				var $path=imath.path(json);
				var $num,$json,$keys,$images,$name,$type,$shell,$ht,$wd,$chd;
				var defaults = {speed:33,repeat:-1,endStart:false,pause:false,delay:0,first:0,pause:0,scale:1};
				var opts = $.extend(defaults,options);
				var $now=opts.first,$last=-1,$timer,$repeat=0;
				var $sound=opts.sound,$btnSound;
				var loadBox=$('<div class="load"></div>').appendTo($this);
				$.getJSON(json+'?'+Math.random(),{},json_getted);
			}//end if
			
			function json_getted(res){
//				console.log(res);
				$json=res;
				$keys=Object.keys(res.frames);
				$num=$keys.length;
				$images=res.meta.image.split(',');
				$name=$images[0].split('.')[0];
				$type='.'+$images[0].split('.')[1];
				$wd=res.frames[$keys[0]].sourceSize.w;
				$ht=res.frames[$keys[0]].sourceSize.h;
				var list=[];
				for(var i=0; i<$images.length; i++) list.push($path+$images[i]);
				icom.imageLoad(list,image_loaded);
			}//edn func
			
			function image_loaded(list){
				$this.empty();
				$shell=$('<div class="shell"></div>').css({width:$wd,height:$ht,scale:opts.scale}).appendTo($this);
				for(var i=0; i<list.length; i++) $('<div></div>').css({backgroundImage:'url('+list[i]+')'}).appendTo($shell);
				$chd=$shell.children();
				$this.on('off',this_off).on('pause',this_pause).on('resume',this_resume).on('goto',this_goto).on('speed',this_speed);
				this_switch(opts.pause);
				if($sound){
					$btnSound=$('<a class="sound"></a>').appendTo($this);
					$btnSound.on('touchend',sound_click);
					if(!opts.pause) sound_play();
					else $btnSound.hide();
				}//end if
				if(opts.onLoaded) opts.onLoaded();
			}//end init
			
			//-------------------------------sound
			function sound_click(e){
				if(!$(this).hasClass('paused')) sound_pause();
				else sound_play($now*opts.spee);
			}//edn func
			
			function sound_play(currentTime){
				currentTime=currentTime||0;
				$sound.currentTime=currentTime;
				$sound.play();
				$btnSound.removeClass('paused');
			}//edn if
			
			function sound_pause(){
				$sound.pause();
				$btnSound.addClass('paused');
			}//edn if
			
			//-------------------------------------event
			function this_off(e){
				console.log('this_off')
				$this.off('off pause resume goto speed');
				icom.clearTimeout($timer);
				if($sound){
					sound_pause();
					$btnSound.hide();
				}//edn if
			}//end if
			
			function this_pause(e){
				console.log('video pause');
				icom.clearTimeout($timer);
				if($sound){
					if(!$btnSound.hasClass('paused')){
						$btnSound.addClass('pausedByOuter');
						sound_pause();
					}//edn if
				}//edn if
			}//end func
			
			function this_resume(e){
				console.log('video resume');
				icom.clearTimeout($timer);
				this_switch();
				if($sound){
					$btnSound.show();
					if($btnSound.hasClass('pausedByOuter')){
						$btnSound.removeClass('pausedByOuter');
						sound_play($now*opts.speed);
					}//edn if
				}//edn if
			}//end func
			
			function this_goto(e,id,stop){
				stop=stop||0;
				if(id!=null){
					$now=id;
					icom.clearTimeout($timer);
					this_switch(stop);
					if($sound){
						sound_play($now*opts.speed);
					}//edn if
				}//end if
			}//end func
			
			function this_speed(e,speed){
				opts.speed=speed;
			}//end func
			
			function this_play(){
				$now++;
				if($now>=$num){
					$repeat++;
					if(opts.onComplete) opts.onComplete($repeat);
					if(opts.repeat>=0){
						if($repeat<=opts.repeat) this_replay();
						else this_off();
					}//end if
					else this_replay();
				}//end if
				else this_switch();
			}//end func
			
			function this_replay(){
				setTimeout(function(){
					$now=0;
					this_switch();
					if($sound){
						if(!$btnSound.hasClass('paused') && !$btnSound.addClass('pausedByOuter')) sound_play();
					}//edn if
				},opts.delay);
			}//edn func
			
			function this_switch(stop){
				stop=stop||0;
				var key=(100+$now)+$type;
				var frame=$json.frames[key].frame;
				var id=parseInt(frame.idx);
				var chd=$chd.eq(id);
				chd.show().css({'background-position-x':-frame.x,'background-position-y':-frame.y}).siblings().hide();
				$last=$now;
				if(opts.onFrame) opts.onFrame($now+1,$now*opts.speed);
				if(!stop) $timer=icom.setTimeout(this_play,opts.speed);
			}//end func

		},//end fn
		gifLayaPause: function(id) {
			$(this).triggerHandler('pause',[id]);
		},//end fn
		gifLayaResume: function() {
			$(this).triggerHandler('resume');
		},//end fn
		gifLayaGoto: function(id) {
			id=Math.abs(id);
			$(this).triggerHandler('goto',[id,stop]);
		},//end fn
		gifLayaSpeed: function(speed) {
			if(speed && speed>0) $(this).triggerHandler('speed',[speed]);
		},//end fn
		gifLayaOff: function() {
			$(this).triggerHandler('off');
		}//end fn			
	});//end extend
})(jQuery);//闭包
//2017.4.9
var icom=importCom();

function importCom(){
	var com={};
	
	com.screenScrollEnable=function(){
		$(document).off('touchmove',noScroll);
	}//end func
	
	com.screenScrollUnable=function(){
		$(document).on('touchmove',noScroll);
	}//end func
	
	function noScroll(e){
		e.preventDefault();
	}//end func
	
	//取代jquery的fadeIn
	com.fadeIn=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.show().css({opacity:0}).transition({opacity:1},dur,function(){
				if(callback) callback($(this));
			});
		}//end if
	}//end func
	
	//取代jquery的fadeOut
	com.fadeOut=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.transition({opacity:0},dur,function(){
				$(this).hide().css({opacity:1});
				if(callback) callback($(this));
			});
		}//end if
	}//end func
	
	com.popOn=function(obj,options){
		if(obj && obj.length>0){
			var defaults = {closeEvent:'touchend',closeType:'button',closeBtn:obj.find('a.close'),remove:false};
			var opts = $.extend(defaults,options);
			if(opts.text) obj.find('.text').html(opts.text);
			if(opts.fade) com.fadeIn(obj,opts.fade);
			else obj.show();
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.one(opts.closeEvent,obj_close);
			else obj.one(opts.closeEvent,obj_close);
			obj.on('close',obj_close);
		}//end if
		function obj_close(e){
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.off(opts.closeEvent,obj_close);
			else obj.off(opts.closeEvent,obj_close);
			if(opts.fade) com.fadeOut(obj,opts.fade,function(){
				if(opts.remove) obj.remove();
			});
			else if(opts.remove) obj.remove();
			else obj.hide();
			obj.off('close',obj_close);
			if(opts.onClose) opts.onClose(obj);
		}//end func
	}//end func
	
	com.popOff=function(obj){
		if(obj && obj.length>0) obj.trigger('close');
	}//end func
	
	//取代系统alert
	com.alert=function(text,callback){
		if(text && text!=''){
			var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(ibase.landscapeMode?'article>.interface':'body');
			com.popOn(box,{text:text,onClose:callback,remove:true,closeEvent:'click'});
		}//end if
	}//end func
	
	//获得http url参数
	com.getQueryString=function(name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
	}//end func
	
	//获得http url文件名末尾的数字
	com.getQueryInt=function(len){
		len=len!=null?len:1;
		var path=window.location.pathname.split('/');
		var file=path[path.length-1];
		var str=file.split('.');
		return parseInt(str[0].substr(str[0].length-len));
	}//end func
	
	//载入图片函数
	com.imageLoad=function(src,callback){
		if(src && src!=''){
			var loader = new PxLoader();
			if($.type(src) === "string" && src!='') loader.addImage(src);
			else if($.type(src) === "array" && src.length>0){
				for(var i=0; i<src.length; i++){
					loader.addImage(src[i]);
				}//end for
			}//end else
			loader.addCompletionListener(function() {
				console.log('images load complete');
				loader=null;
				if(callback) callback(src);
			});			
			loader.start();	
		}//end if
	}//end func	
	
	//新增测试版提示信息
	com.addSignBar=function(text){
		if(text && text!=''){
			var sign=$('#signBar');
			if(sign.length>0) sign.find('.text').html(text);
			else{
				sign=$('<div id="signBar"></div>').appendTo('body');
				$('<span></span>').html(text).appendTo(sign);
			}//end if
		}//end if
	}//end func
	
	//打印object数据
	com.objectPrint=function(data){
		if(data){
			console.log("-----------------------------------------------------------------------------");
			var info="";
			for(var i in data) info+=i+":"+data[i]+"  "
			console.log(info);
			console.log("-----------------------------------------------------------------------------");
		}//end if
	}//end func
	
	//常用正则
	com.checkStr=function(str,type){
		if(str && str!=''){
			type=type||0;
			switch(type){
				case 0:
					var reg= new RegExp(/^1[3-9]\d{9}$/);//手机号码验证
					break;
				case 1:
					var reg= new RegExp(/^[1-9]\d{5}$/);//邮政编码验证
					break;
				case 2:
					var reg= new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/);//匹配EMAIL
					break;
				case 3:
					var reg= new RegExp(/^\d+$/);//是否为0-9的数字
					break;
				case 4:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);//不能以数字或符号开头
					break;
				case 5:
					var reg= new RegExp(/^\w+$/);//匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 6:
					var reg= new RegExp(/^[\u0391-\uFFE5]+$/);//匹配中文
					break;
				case 7:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/);//不能包含数字和符号
					break;
			}//end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		}//end if
		else return false;
	}//end func
	
	//使用post方法进行php中间件通讯
	com.post=function(url,data,callback){
		if(url && url!='') post_handler(url,data,callback,'post');
	}//end func
	
	//使用get方法进行php中间件通讯
	com.get=function(url,data,callback){
		if(url && url!='') post_handler(url,data,callback,'get');
	}//end func
	
	function post_handler(url,data,callback,action){
		if(data && $.isPlainObject(data)) data=JSON.stringify(data);
		$.post("./http/httpPost.php",{api_url:url,post_data:data,action:action},function(resp){
			if(callback) callback(resp);
		}, "json");
	}//edn func
	
	//修改微信浏览器的标题文字
	com.title=function(value){
		$('title').html(value);
		var iframe = $('<iframe src="images/share.jpg"></iframe>').appendTo('body').one('load', function() {
			setTimeout(function(){
				iframe.remove();
			},0);
		});
	}//end func
	
	//安卓键盘压缩页面高度处理
	com.keyboard=function(input,shell,callback){
		input=input||$('input,textarea,[contenteditable="true"]');
		shell=shell||input.parents('section');
		if(input.length>0){
			if(os.ios){
				input.on('focus',function(e){
					$(document).one('touchend',ios_keyboard);
				});
			}//end if
			else if(shell.length>0){
				var windowHt=$(window).height();
				var ht=shell.height();
				$(window).on('resize',android_keyboard);
			}//edn if
		}//end if
		
		function ios_keyboard(e){
			if(e.target!=input[0]) input.blur();
		}//edn func
		
		function android_keyboard(e){
			if(ibase.dir=='portrait' && (window.orientation == 0 || window.orientation == 180) ){
				if($(window).height()<windowHt) slide_in();
				else slide_out();
			}//end portrait
			else if( ibase.dir=='landscape' && (window.orientation == 90 || window.orientation == -90) ){
				if($(window).height()<windowHt) slide_in();
				else slide_out();
			}//edn landscape
		}//edn func
		
		function slide_in(){
			shell.css({height:ht});
			if(callback) callback(true);
		}//edn func
		
		function slide_out(){
			if(callback) callback(false);
		}//edn func
		
	}//end func
	
	//物体抖动
	com.shake=function(box,options){
		if(box && box.length>0){
			var defaults = {rx:5,ry:5,delay:33,now:0,max:5,restore:true};
			var opts = $.extend(defaults,options);
			var x=imath.randomRange(-opts.rx,opts.rx);
			var y=imath.randomRange(-opts.ry,opts.ry);
			box.css({x:x,y:y});
			opts.now++;
			if(opts.now>opts.max){
				if(opts.restore) box.css({x:0,y:0});
				if(opts.onComplete) opts.onComplete();
			}//end if
			else setTimeout(com.shake,opts.delay,box,opts);
		}//end if
	}//end func
	
	//获取textarea里的回车和空格
	com.textareaGet=function(textarea,row){
		row=row||0;
		var str1=textarea.val();
		if(str1=='') return '';
		else{
			var str2=str1.replaceAll("\n","<br/>");
			return row_cut(str2,row);
		}//end else
	}//edn func
	
	//输入textarea里的回车和空格
	com.textareaSet=function(textarea,str){
		if(str=='') textarea.val('');
		else textarea.val(str.replaceAll("<br/>","\n"));
	}//edn func
	
	//限制textarea输入文字的行数
	com.textareaLock=function(textarea){
		if(textarea && textarea.length>0){
			var timer;
			var row=parseInt(textarea.attr('rows'))||0;
			var col=parseInt(textarea.attr('cols'))||0;
			var max=parseInt(textarea.attr('maxlength'))||0;
			max=max==0?row*col:max;
			if(row>0 && col>0 && max>0) textarea.one('focus',textarea_focus);
		}//end if
		
		function textarea_focus(e){
			clearInterval(timer);
			timer=setInterval(textarea_lock,200);
			$(this).one('blur',textarea_blur);
		}//edn func
		
		function textarea_blur(e){
			clearInterval(timer);
			$(this).one('focus',textarea_focus);
			var first=com.textareaGet(textarea,row);
			if(first.indexOf('<br/>')!=-1){
				var str2=first.split('<br/>');
				var str3='';
				for(var i=0; i<str2.length; i++){
					str3+=col_break(str2[i],col);
					if(i<str2.length-1) str3+='<br/>';
				}//end for
				str3=row_cut(str3,row);
				var final=str3.replaceAll("<br/>","\n");
				textarea.val(final);
			}//end if
		}//edn func
		
		function textarea_lock(){
			var first=com.textareaGet(textarea,row);
			if(first.indexOf('<br/>')==-1) textarea.attr({maxlength:max});
			else textarea.attr({maxlength:max+(first.split('<br/>').length-1)*2});
		}//edn func
	}//edn func
	
	function row_cut(str,row){
		row=row||0;
		var str2=str.split('<br/>');
		if(row<=0 || str2.length<=row ) return str;
		else{
			var str3='';
			for(var i=0; i<row; i++){
				str3+=str2[i];
				if(i<row-1) str3+='<br/>';
			}//edn for
			return str3;
		}//end else
	}//end func
	
	function col_break(str,col){
		var line=Math.ceil(str.length/col);
		if(line==1) return str;
		else{
			var str1='';
			for(var i=0; i<line; i++){
				if(i==0) str1+=str.substr(0,col)+'<br/>';
				else if(i<line-1) str1+=str.substr(i*col,col)+'<br/>';
				else str1+=str.substr(i*col);
			}//edn for
			return str1;
		}//end else
	}//end func
	
	function col_cut(str,col){
		if(str.length>col) return str.substr(0,col);
		else return str;
	}//end func
	
	//限制textarea输入文字的行数
	com.textareaUnlock=function(textarea){
		textarea.off();	
	}//edn func
	
	com.orient=function(callback){
		lock_dected();
		if(os.android){
			var input=$('input,textarea,[contenteditable="true"]');
			if(input.length>0) input.on('focus',input_focus).on('blur',input_blur);
		}//edn if
		function input_focus(e){
			ibase.keyboard=true;
		}//edn if
		function input_blur(e){
			ibase.keyboard=false;
		}//edn if
		function lock_dected(){
			if(ibase.lock) requestAnimationFrame(lock_dected);
			else if(callback) callback();
		}//edn func
	}//edn fuc
	
	com.url = function(url,para) {
		var now=-1;
        for(var key in para){
        	now++;
        	if(now==0) url+='?';
        	else url+='&';
        	url+=key+'='+para[key]
        }//end for
        return url;
    };//end func
    
    com.landscape=function(callback) {
    	var article=$('article');
    	var container=article.children('.container');
    	var interface=article.children('.interface');
		if(os.android){
			var input=$('input,textarea,[contenteditable="true"]');
			if(input.length>0) input.on('focus',input_focus).on('blur',input_blur);
		}//edn if
		window_resize();
		$(window).on('resize',window_resize);
		if(callback) callback();
		
		function input_focus(e){
			ibase.keyboard=true;
		}//edn if
		function input_blur(e){
			ibase.keyboard=false;
		}//edn if
		
		function window_resize(e){
			if(!ibase.keyboard){
				if(window.innerWidth<window.innerHeight){
					console.log('screen portait');
					if(ibase.landscapeScale=='cover'){
						var size=imath.autoSize([ibase.landscapeHeight,ibase.landscapeWidth],[window.innerWidth,window.innerHeight],1);
						var scale=size[0]/ibase.landscapeHeight;
						console.log('auto scale:'+scale);
						article.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:90,scale:scale});
						container.css({x:(window.innerHeight/scale-ibase.landscapeWidth)*0.5,y:-ibase.landscapeHeight+(window.innerWidth/scale-ibase.landscapeHeight)*0.5+(os.iphone6Plus?4:0)});
						interface.css({width:window.innerHeight/scale,height:window.innerWidth/scale,y:-ibase.landscapeHeight});
					}//edn if
					else{
						var scale=[window.innerWidth/ibase.landscapeHeight,window.innerHeight/ibase.landscapeWidth];
						console.log('auto scale:'+scale);
						article.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,scaleX:scale[0],scaleY:scale[1],rotate:90,x:0,y:-ibase.landscapeHeight});
					}//end else
				}//end if
				else{
					console.log('screen landscape');
					if(ibase.landscapeScale=='cover'){
						var size=imath.autoSize([ibase.landscapeWidth,ibase.landscapeHeight],[window.innerWidth,window.innerHeight],1);
						console.log('window size:'+window.innerWidth+'/'+window.innerHeight);
						console.log('auto size:'+size[0]+'/'+size[1]);
						var scale=size[0]/ibase.landscapeWidth;
						article.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:0,scale:scale});
						container.css({x:(window.innerWidth/scale-ibase.landscapeWidth)*0.5,y:(window.innerHeight/scale-ibase.landscapeHeight)*0.5});
						interface.css({width:window.innerWidth/scale,height:window.innerHeight/scale,x:0,y:0});
					}//edn if
					else{
						var scale=[window.innerWidth/ibase.landscapeWidth,window.innerHeight/ibase.landscapeHeight];
						console.log('auto scale:'+scale);
						article.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,scaleX:scale[0],scaleY:scale[1],rotate:0});
					}//end else
				}//end else
			}//edn if
		}//edn func
    };//end func
    
    com.setTimeout=function(callback,frame){
    	if(frame>0 && callback) return setTimer(callback,frame);
    }//edn func
    
    com.clearTimeout=function(timer){
    	if(timer && timer.timer) cancelAnimationFrame(timer.timer);
    }//edn func
    
    com.setInterval=function(callback,frame){
    	if(frame>0 && callback) return setTimer(callback,frame,true);
    }//edn func
    
    com.clearInterval=function(timer){
    	if(timer && timer.timer) cancelAnimationFrame(timer.timer);
    }//edn func
    
    function setTimer(callback,frame,interval){
    	interval=interval||0;
    	var timer={now:0,timer:null};
		timer_handler();
		return timer;
    	function timer_handler(){
    		timer.now++;
    		var timeup=timer.now==frame;
    		if(timeup){
    			timer.now=0;
    			callback();
    		}//end if
    		if(interval || (!interval && !timeup)) timer.timer=requestAnimationFrame(timer_handler);
    	}//end func
    }//edn func
    
    com.canvas_send=function(canvas,callback,secretkey,type,compress){
    	if(canvas){
    		secretkey=secretkey||'test';
			type=type||'jpg';
			compress=compress||0.8;
			if(type=='png') var base64=canvas.toDataURL('image/png').split(",")[1];
			else var base64=canvas.toDataURL('image/jpeg', compress).split(",")[1];
			this.base64_send(base64,callback,secretkey);
    	}//edn if
	}//end func
	
	com.base64_send=function(base64,callback,secretkey){
		if(base64){
    		secretkey=secretkey||'test';
			$.post('http://upload.be-xx.com/upload', { data: base64, key: secretkey }, function (resp) {
				if(callback) callback(resp);
	        })
    	}//edn if
	}//end func
	
	return com;
	
}//end import

String.prototype.replaceAll = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}
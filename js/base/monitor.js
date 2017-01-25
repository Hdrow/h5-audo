//2017.1.25
var _hmt = _hmt || [];
var imonitor=importMonitor();
var hmsr=icom.getQueryString('hmsr');


//pm给的监测代码贴在这里


function importMonitor(){
	var monitor={};
	
	monitor.add=function(option){
		if(option){
			var obj=option.obj;
			var category=option.category||'';
			var action=option.action||'touchend';
			var label=option.label||'';
			if(obj && obj.length>0){
				obj.each(function(i) {
					$(this).on(action,{category:category,action:action,label:obj.length==1?label:label+(i+1)},event_bind);}
				);
			}//end if
			else event_bind(null,{category:category,action:'程序触发',label:label});
		}//end if
	}//end func
	
	function event_bind(e,data){
		if(e) event_handler(e.data);
		else event_handler(data);
	}//end func
	
	function event_handler(data){
		_hmt.push(['_trackEvent', hmsr?'来源：'+hmsr:'来源：默认', data.action, (data.category!=''?data.category+'-':'') + data.label]);
//		ga('send', 'event', data.category, data.action, data.label);
		console.log('监测来源：'+(hmsr?hmsr:'默认')+' | '+'监测说明：'+(data.category!=''?data.category+'-':'') + data.label);
	}//end func
	
	return monitor;
}//end import
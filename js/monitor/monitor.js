<!--PM提供的百度统计代码贴在这里-->

//百度统计
var _hmt = _hmt || [];

//--------------------------------百度统计
function monitorAdd(option){
	if(option){
		var obj=option.obj;
		var category=option.category||'页面监测';
		var action=option.action||'click';
		var label=option.label||'';
		if(obj && obj.length>0){
			obj.each(function(i) {
				$(this).on(action,{category:category,action:action,label:obj.length==1?label:label+(i+1)},monitor_event);}
			);
		}//end if
		else if(label && label!='') monitor_handler({category:category,action:'JS程序触发',label:label});
	}//end if
}//end func

function monitor_event(e){
	var data=e.data;
	monitor_handler(data);
}//end func

function monitor_handler(data){
	_hmt.push(['_trackEvent', data.category, data.action, data.category+'——'+data.label]);
	console.log('项目类别：'+data.category+' | '+'交互行为：'+data.action+' | '+'项目说明：'+data.category+'——'+data.label);
}//end func


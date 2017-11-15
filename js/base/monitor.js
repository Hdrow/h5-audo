//2017.11.15

var _hmt = _hmt || [];
//百度监测贴这里

//ga监测贴这里

var imonitor = importMonitor();

function importMonitor() {
	var monitor = {};
	var hmsr = icom.getQueryString('hmsr');
	hmsr = hmsr || 'default';

	monitor.add = function(options) {
		if(options) {
			var defaults = {
				action: 'touchend',
				category: 'default',
				label: ''
			};
			var opts = $.extend(defaults, options);
			if(opts.obj && opts.obj.length > 0) {
				opts.hmsr = hmsr;
				opts.obj.each(function(i) {
					$(this).on(opts.action, opts, event_bind);
				});
			} //end if
			else {
				opts.action = 'script'
				event_bind(null, opts);
			} //end else
		} //end if
	} //end func

	function event_bind(e, data) {
		if(e) event_handler(e.data);
		else event_handler(data);
	} //end func

	function event_handler(data) {
		if(window._hmt) window._hmt.push(['_trackEvent', data.hmsr, data.category, data.label]);
		if(window.gtag) window.gtag('event', data.action, {
			'event_category': data.category,
			'event_label': data.label
		});
		if(window.console) window.console.log('事件：' + data.action + ' | ' + '来源：' + data.hmsr + ' | ' + '类别：' + data.category + ' | ' + '标签：' + data.label);
	} //end func

	return monitor;
} //end import
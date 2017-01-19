//----------------------------------------jquery.transit.js v1.0.1
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){function d(a){var c,d,e,f;if(a in b.style)return a;for(c=["Moz","Webkit","O","ms"],d=a.charAt(0).toUpperCase()+a.substr(1),e=0;e<c.length;++e)if(f=c[e]+d,f in b.style)return f}function e(){return b.style[c.transform]="",b.style[c.transform]="rotateY(90deg)",""!==b.style[c.transform]}function j(a){return"string"==typeof a&&this.parse(a),this}function k(a,b,c){b===!0?a.queue(c):b?a.queue(b,c):a.each(function(){c.call(this)})}function l(b){var d=[];return a.each(b,function(b){b=a.camelCase(b),b=a.transit.propertyMap[b]||a.cssProps[b]||b,b=o(b),c[b]&&(b=o(c[b])),-1===a.inArray(b,d)&&d.push(b)}),d}function m(b,c,d,e){var g,h,f=l(b);return a.cssEase[d]&&(d=a.cssEase[d]),g=""+q(c)+" "+d,parseInt(e,10)>0&&(g+=" "+q(e)),h=[],a.each(f,function(a,b){h.push(b+" "+g)}),h.join(", ")}function n(b,d){d||(a.cssNumber[b]=!0),a.transit.propertyMap[b]=c.transform,a.cssHooks[b]={get:function(c){var d=a(c).css("transit:transform");return d.get(b)},set:function(c,d){var e=a(c).css("transit:transform");e.setFromString(b,d),a(c).css({"transit:transform":e})}}}function o(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function p(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$/)?""+a+b:a}function q(b){var c=b;return"string"!=typeof c||c.match(/^[\-0-9\.]+/)||(c=a.fx.speeds[c]||a.fx.speeds._default),p(c,"ms")}var b,c,f,g,h,i;a.transit={version:"1.0.1",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1},b=document.createElement("div"),c={},f=navigator.userAgent.toLowerCase().indexOf("chrome")>-1,c.transition=d("transition"),c.transitionDelay=d("transitionDelay"),c.transform=d("transform"),c.transformOrigin=d("transformOrigin"),c.filter=d("Filter"),c.transform3d=e(),g={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},h=c.transitionEnd=g[c.transition]||null;for(i in c)c.hasOwnProperty(i)&&"undefined"==typeof a.support[i]&&(a.support[i]=c[i]);return b=null,a.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},a.cssHooks["transit:transform"]={get:function(b){return a(b).data("transform")||new j},set:function(b,d){var e=d;e instanceof j||(e=new j(e)),b.style[c.transform]="WebkitTransform"!==c.transform||f?e.toString():e.toString(!0),a(b).data("transform",e)}},a.cssHooks.transform={set:a.cssHooks["transit:transform"].set},a.cssHooks.filter={get:function(a){return a.style[c.filter]},set:function(a,b){a.style[c.filter]=b}},a.fn.jquery<"1.8"&&(a.cssHooks.transformOrigin={get:function(a){return a.style[c.transformOrigin]},set:function(a,b){a.style[c.transformOrigin]=b}},a.cssHooks.transition={get:function(a){return a.style[c.transition]},set:function(a,b){a.style[c.transition]=b}}),n("scale"),n("scaleX"),n("scaleY"),n("translateX"),n("translateY"),n("translateZ"),n("translate"),n("translate3d"),n("rotate"),n("rotateX"),n("rotateY"),n("rotate3d"),n("perspective"),n("skewX"),n("skewY"),n("x",!0),n("y",!0),n("z",!0),j.prototype={setFromString:function(a,b){var c="string"==typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a),j.prototype.set.apply(this,c)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=p(a,"deg")},rotateX:function(a){this.rotateX=p(a,"deg")},rotateY:function(a){this.rotateY=p(a,"deg")},scale:function(a,b){void 0===b&&(b=a),this.scale=a+","+b},skewX:function(a){this.skewX=p(a,"deg")},skewY:function(a){this.skewY=p(a,"deg")},perspective:function(a){this.perspective=p(a,"px")},translateX:function(a){this.translateX=p(a,"px")},translateY:function(a){this.translateY=p(a,"px")},translateZ:function(a){this.translateZ=p(a,"px")},x:function(a){this.set("translate",a,null,null)},y:function(a){this.set("translate",null,a,null)},z:function(a){this.set("translate",null,null,a)},translate:function(a,b,c){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==a&&void 0!==a&&(this._translateX=p(a,"px")),null!==b&&void 0!==b&&(this._translateY=p(b,"px")),null!==c&&void 0!==c&&(this._translateZ=p(c,"px")),null===this._translateZ||void 0===this._translateZ?this.translate=this._translateX+","+this._translateY:(this.translate="0,0",this.translate3d=this._translateX+","+this._translateY+","+this._translateZ)}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},z:function(){return this._translateZ||0},scale:function(){var a=(this.scale||"1,1").split(",");return a[0]&&(a[0]=parseFloat(a[0])),a[1]&&(a[1]=parseFloat(a[1])),a[0]===a[1]?a[0]:a},rotate3d:function(){var b,a=(this.rotate3d||"0,0,0,0deg").split(",");for(b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));return a[3]&&(a[3]=p(a[3],"deg")),a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,c,d){b.setFromString(c,d)})},toString:function(a){var d,b=[];for(d in this)if(this.hasOwnProperty(d)){if(!c.transform3d&&("rotateX"===d||"rotateY"===d||"perspective"===d||"transformOrigin"===d))continue;"_"!==d[0]&&(a&&"scale"===d?b.push(d+"3d("+this[d]+",1)"):a&&"translate"===d?b.push(d+"3d("+this[d]+",0)"):b.push(d+"("+this[d]+")"))}return b.join(" ")}},a.fn.transition=a.fn.transit=function(b,d,e,f){var n,o,p,r,s,t,u,g=this,i=0,j=!0,l=a.extend(!0,{},b);return"function"==typeof d&&(f=d,d=void 0),"object"==typeof d&&(e=d.easing,i=d.delay||0,j="undefined"==typeof d.queue?!0:d.queue,f=d.complete,d=d.duration),"function"==typeof e&&(f=e,e=void 0),"undefined"!=typeof l.easing&&(e=l.easing,delete l.easing),"undefined"!=typeof l.duration&&(d=l.duration,delete l.duration),"undefined"!=typeof l.complete&&(f=l.complete,delete l.complete),"undefined"!=typeof l.queue&&(j=l.queue,delete l.queue),"undefined"!=typeof l.delay&&(i=l.delay,delete l.delay),"undefined"==typeof d&&(d=a.fx.speeds._default),"undefined"==typeof e&&(e=a.cssEase._default),d=q(d),n=m(l,d,e,i),o=a.transit.enabled&&c.transition,p=o?parseInt(d,10)+parseInt(i,10):0,0===p?(r=function(a){g.css(l),f&&f.apply(g),a&&a()},k(g,j,r),g):(s={},t=function(b){var d=!1,e=function(){d&&g.unbind(h,e),p>0&&g.each(function(){this.style[c.transition]=s[this]||null}),"function"==typeof f&&f.apply(g),"function"==typeof b&&b()};p>0&&h&&a.transit.useTransitionEnd?(d=!0,g.bind(h,e)):window.setTimeout(e,p),g.each(function(){p>0&&(this.style[c.transition]=n),a(this).css(l)})},u=function(a){this.offsetWidth=this.offsetWidth,t(a)},k(g,j,u),this)},a.transit.getTransitionValue=m,a});

//----------------------------------------PxLoader.js v1.1.2
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.PxLoader=b()}):"object"==typeof module&&module.exports?module.exports=b():a.PxLoader=b()}(this,function(){function a(a){a=a||{},this.settings=a,null==a.statusInterval&&(a.statusInterval=5e3),null==a.loggingDelay&&(a.loggingDelay=2e4),null==a.noProgressTimeout&&(a.noProgressTimeout=1/0);var c,d=[],e=[],f=[],g=Date.now(),h={QUEUED:0,WAITING:1,LOADED:2,ERROR:3,TIMEOUT:4},i=function(a){return null==a?[]:Array.isArray(a)?a:[a]};this.add=function(a){a.tags=new b(a.tags),null==a.priority&&(a.priority=1/0),d.push({resource:a,status:h.QUEUED})},this.addProgressListener=function(a,c){f.push({callback:a,tags:new b(c)})},this.addCompletionListener=function(a,c){e.push({tags:new b(c),callback:function(b){b.completedCount===b.totalCount&&a(b)}})};var j=function(a){a=i(a);var b=function(b){for(var c=b.resource,d=1/0,e=0;e<c.tags.length;e++)for(var f=0;f<Math.min(a.length,d)&&!(c.tags.all[e]===a[f]&&f<d&&(d=f,0===d))&&0!==d;f++);return d};return function(a,c){var d=b(a),e=b(c);return d<e?-1:d>e?1:a.priority<c.priority?-1:a.priority>c.priority?1:0}};this.start=function(a){c=Date.now();var b=j(a);d.sort(b);for(var e=0,f=d.length;e<f;e++){var g=d[e];g.status=h.WAITING,g.resource.start(this)}setTimeout(k,100)};var k=function(){for(var b=!1,c=Date.now()-g,e=c>=a.noProgressTimeout,f=c>=a.loggingDelay,i=0,j=d.length;i<j;i++){var l=d[i];l.status===h.WAITING&&(l.resource.checkStatus&&l.resource.checkStatus(),l.status===h.WAITING&&(e?l.resource.onTimeout():b=!0))}f&&b&&n(),b&&setTimeout(k,a.statusInterval)};this.isBusy=function(){for(var a=0,b=d.length;a<b;a++)if(d[a].status===h.QUEUED||d[a].status===h.WAITING)return!0;return!1};var l=function(a,b){var c,i,j,k,l,n=null;for(c=0,i=d.length;c<i;c++)if(d[c].resource===a){n=d[c];break}if(null!=n&&n.status===h.WAITING)for(n.status=b,g=Date.now(),j=f.concat(e),c=0,i=j.length;c<i;c++)k=j[c],l=0===k.tags.length||a.tags.intersects(k.tags),l&&m(n,k)};this.onLoad=function(a){l(a,h.LOADED)},this.onError=function(a){l(a,h.ERROR)},this.onTimeout=function(a){l(a,h.TIMEOUT)};var m=function(a,b){var c,e,f,g,i=0,j=0;for(c=0,e=d.length;c<e;c++)f=d[c],g=!1,g=0===b.tags.length||f.resource.tags.intersects(b.tags),g&&(j++,f.status!==h.LOADED&&f.status!==h.ERROR&&f.status!==h.TIMEOUT||i++);b.callback({resource:a.resource,loaded:a.status===h.LOADED,error:a.status===h.ERROR,timeout:a.status===h.TIMEOUT,completedCount:i,totalCount:j})},n=this.log=function(a){if(window.console){var b=Math.round((Date.now()-c)/1e3);window.console.log("PxLoader elapsed: "+b+" sec");for(var e=0,f=d.length;e<f;e++){var g=d[e];if(a||g.status===h.WAITING){var i="PxLoader: #"+e+" "+g.resource.getName();switch(g.status){case h.QUEUED:i+=" (Not Started)";break;case h.WAITING:i+=" (Waiting)";break;case h.LOADED:i+=" (Loaded)";break;case h.ERROR:i+=" (Error)";break;case h.TIMEOUT:i+=" (Timeout)"}g.resource.tags.length>0&&(i+=" Tags: ["+g.resource.tags.all.join(",")+"]"),window.console.log(i)}}}}}function b(a){if(this.all=[],this.first=null,this.length=0,this.lookup={},a){if(Array.isArray(a))this.all=a.slice(0);else if("object"==typeof a)for(var b in a)a.hasOwnProperty(b)&&this.all.push(b);else this.all.push(a);this.length=this.all.length,this.length>0&&(this.first=this.all[0]);for(var c=0;c<this.length;c++)this.lookup[this.all[c]]=!0}}return b.prototype.intersects=function(a){if(0===this.length||0===a.length)return!1;if(1===this.length&&1===a.length)return this.first===a.first;if(a.length<this.length)return a.intersects(this);for(var b in this.lookup)if(a.lookup[b])return!0;return!1},a}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderImage=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderImage=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;e=this.img=new Image,d.origin&&(e.crossOrigin=d.origin),this.tags=b,this.priority=c;var h=function(){"complete"===f.img.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind("readystatechange",h),f.unbind("error",j)};this.start=function(b){g=b,f.bind("load",i),f.bind("readystatechange",h),f.bind("error",j),f.img.src=a},this.checkStatus=function(){h()},this.onTimeout=function(){f.img.complete?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.img.addEventListener(a,b,!1)},this.unbind=function(a,b){f.img.removeEventListener(a,b,!1)}}return a.prototype.addImage=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.img},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderSound=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderSound=b(a.PxLoader)}(this,function(a){function b(a,b,c,d,e){var f=this,g=null,h=navigator.userAgent.match(/(ipad|iphone|ipod)/i),i=navigator.userAgent.match(/android/i);this.useGlobalHTML5Audio=h||i,this.tags=c,this.priority=d,this.sound=soundManager.createSound({id:a,url:b,autoLoad:!1,onload:function(){g.onLoad(f)},onsuspend:function(){g.onTimeout(f)},whileloading:function(){var a=this.bytesLoaded,b=this.bytesTotal;a>0&&a===b&&g.onLoad(f)}}),this.start=function(a){g=a,this.useGlobalHTML5Audio?g.onTimeout(f):this.sound.load()},this.checkStatus=function(){switch(f.sound.readyState){case 0:break;case 1:break;case 2:g.onError(f);break;case 3:g.onLoad(f)}},this.onTimeout=function(){g.onTimeout(f)},this.getName=function(){return b}}return a.prototype.addSound=function(a,c,d,e,f){var g=new b(a,c,d,e,f);return this.add(g),g.sound},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderVideo=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderVideo=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.video=document.createElement("video"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.video.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.video.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.video.src=a,f.video.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.video.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.video.addEventListener(a,b,!1)},this.unbind=function(a,b){f.video.removeEventListener(a,b,!1)}}return a.prototype.addVideo=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.video},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderData=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderData=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e=this,f=null;this.tags=b,this.priority=c,this.xhr=new XMLHttpRequest;var g=function(){4===e.xhr.readyState&&(200===e.xhr.status?h():i())},h=function(){f.onLoad(e),k()},i=function(){f.onError(e),k()},j=function(){f.onTimeout(e),k()},k=function(){e.unbind("readystatechange",g),e.unbind("error",i)};this.start=function(b){f=b,e.bind("readystatechange",g),e.bind("error",i),e.xhr.open("GET",a,!0),e.xhr.send(null),e.xhr.responseType=d.responseType?d.responseType:""},this.checkStatus=function(){g()},this.onTimeout=function(){4===e.xhr.readyState?200===e.xhr.status?h():i():j()},this.getName=function(){return a},this.bind=function(a,b){e.xhr.addEventListener(a,b,!1)},this.unbind=function(a,b){e.xhr.removeEventListener(a,b,!1)}}return a.prototype.addData=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.xhr},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderAudio=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderAudio=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.audio=document.createElement("audio"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.audio.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.audio.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.audio.src=a,f.audio.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.audio.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.audio.addEventListener(a,b,!1)},this.unbind=function(a,b){f.audio.removeEventListener(a,b,!1)}}return a.prototype.addAudio=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.audio},b});

//-----------------------------------swipe.js
!function(){$.event.special.swipe={setup:function(){function d(c){var d=c.originalEvent.touches[0];b={time:(new Date).getTime(),coords:[d.pageX,d.pageY]},a.on("touchmove",e).one("touchend",f)}function e(a){a.preventDefault(),a.stopImmediatePropagation();var d=a.originalEvent.changedTouches[0];c={time:(new Date).getTime(),coords:[d.pageX,d.pageY]},(Math.abs(b.coords[1]-c.coords[1])>10||Math.abs(b.coords[0]-c.coords[0])>5)&&a.preventDefault()}function f(){a.off("touchmove",e),b&&c&&c.time-b.time<1e3&&(Math.abs(b.coords[1]-c.coords[1])>15&&Math.abs(b.coords[0]-c.coords[0])<70?a.trigger("swipe").trigger(b.coords[1]>c.coords[1]?"swipeup":"swipedown"):Math.abs(b.coords[0]-c.coords[0])>15&&Math.abs(b.coords[1]-c.coords[1])<70&&a.trigger("swipe").trigger(b.coords[0]>c.coords[0]?"swipeleft":"swiperight")),b=c=void 0}var b,c,a=$(this);a.on("touchstart",d)}},$.each({swipeleft:"swipe",swiperight:"swipe",swipedown:"swipe",swipeup:"swipe"},function(a,b){$.event.special[a]={setup:function(){$(this).on(b,$.noop)}}})}();

//-----------------------------------touched.js
!function(){$.event.special.touched={setup:function(){function b(){a.one("touchmove",c).one("touchend",d)}function c(){a.off("touchend",d).one("touchstart",b)}function d(){a.off("touchmove",c).one("touchstart",b),a.trigger("touched")}var a=$(this);a.one("touchstart",b)}}}();

//-----------------------------------pinch.js
(function(){$.event.special.pinch={setup:function(){function d(a){a.preventDefault();a.stopPropagation();if(!g&&1==a.originalEvent.touches.length){var c=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY];h.trigger("pinch").trigger("pinchmove",[c[0]-b[0],c[1]-b[1]]);b[0]=c[0];b[1]=c[1]}else if(2<=a.originalEvent.touches.length){c=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY];a=[a.originalEvent.touches[1].clientX,a.originalEvent.touches[1].clientY];var k=imath.getDis(c,a);.5<Math.abs(k-e)&&h.trigger("pinch").trigger("pinchscale",[.025*(k-e)/Math.abs(k-e)]);var d=imath.getDeg(c,a);d!=l&&h.trigger("pinch").trigger("pinchrotate",[d-l]);b[0]=c[0];b[1]=c[1];f[0]=a[0];f[1]=a[1];e=k;l=d}}function m(a){a.preventDefault();a.stopPropagation();$(this).off("touchmove");g=1<=a.originalEvent.touches.length?!0:!1}var h=$(this),g,b=[],f=[],e,l;h.on("touchstart",function(a){a.preventDefault();a.stopPropagation();$(this).on("touchmove",d).one("touchend",m);1==a.originalEvent.touches.length?(g=!1,b=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY]):2<=a.originalEvent.touches.length&&(g=!0,b=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY],f=[a.originalEvent.touches[1].clientX,a.originalEvent.touches[1].clientY],e=imath.getDis(b,f),l=imath.getDeg(b,f))})}};$.each({pinchmove:"pinch",pinchscale:"pinch",pinchrotate:"pinch"},function(d,m){$.event.special[d]={setup:function(){$(this).on(m,$.noop)}}})})();

//-----------------------------------com.js
//2017.1.18
var icom=importCom();

function importCom(){
	var com={};
	
	/*
	 * screenTo169(iphone4,android)：把article作为页面的根容器，如果屏幕高宽比不是16：9，则拉伸到16:9
		 * iphone4：让iphone4下的article标签高度拉伸到与iphone5一致，默认值true
		 * android：把article作为页面的根容器，使用虚拟系统按键安卓机的拉升至16:9，默认值true
	 	 * 如果页面是长页面，则注释掉这个方法
	*/ 
	com.screenTo169=function(iphone4,android){
		iphone4=iphone4!=null?iphone4:true;
		android=android!=null?android:true;
		var article=$('article');
		if(article.length>0){
			if(os.iphone4){
				if(iphone4){
					if(os.weixin) article.css({height:'121.2%'});
					else article.css({height:'123.6%'});
				}//end if
				else com.screenScrollUnable();
			}//end if
			else{
				if(os.android && !os.screen169 && android) article.css({height:'109%'});
				else com.screenScrollUnable();
			}//end if
		}//end if
	}//end func
	
	com.screenToPx=function(wd,ht,iphone4){
		if(wd && wd>0){
			iphone4=iphone4!=null?iphone4:true;
			var article=$('article');
			if(article.length>0){
				article.css({'-webkit-transform-origin':'0 0 0'});
				if(ht && ht>0){
					com.screenScrollUnable();
					var zoomX=$(window).width()/wd;
					var zoomY=$(window).height()/ht;
					if(os.iphone4 && iphone4) article.css({scale:zoomY,x:($(window).width()-wd*zoomY)*0.5/zoomY});
					else article.css({scaleX:zoomX,scaleY:zoomY});
				}//end if
				else article.css({scale:$(window).width()/wd});
			}//end if
		}//end if
	}//end func
	
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
			var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo('body');
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
		var iframe = $('<iframe src="images/share.jpg"></iframe>').appendTo($('body')).one('load', function() {
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
			timer=setInterval(textarea_lock,100);
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
			if(input.length>0){
				var turnBox=$(ibase.turnBox);
				input.on('focus',input_focus).on('blur',input_blur);
			}//edn if
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
		window_resize();
		$(window).on('resize',window_resize);
		
		function window_resize(e){
			if(window.innerWidth<window.innerHeight){
				console.log('screen portait');
				var size=imath.autoSize([ibase.landscapeHeight,ibase.landscapeWidth],[window.innerWidth,window.innerHeight],1);
				console.log('window size:'+window.innerWidth+'/'+window.innerHeight);
				console.log('auto size:'+size[0]+'/'+size[1]);
				var scale=size[0]/ibase.landscapeHeight;
				console.log('auto scale:'+scale);
				console.log(ibase.landscapeScale);
				if(ibase.landscapeScale=='cover'){
					article.css({x:window.innerWidth});
					container.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,scale:scale,rotate:90,x:(window.innerHeight/scale-ibase.landscapeWidth)*0.5,y:(window.innerWidth/scale-ibase.landscapeHeight)*0.5});
				}//edn if
			}//end if
			else{
				console.log('screen landscape');
				var size=imath.autoSize([ibase.landscapeWidth,ibase.landscapeHeight],[window.innerWidth,window.innerHeight],1);
				console.log('window size:'+window.innerWidth+'/'+window.innerHeight);
				console.log('auto size:'+size[0]+'/'+size[1]);
				var scale=size[0]/ibase.landscapeWidth;
				console.log('auto scale:'+scale);
				console.log(ibase.landscapeScale);
				if(ibase.landscapeScale=='cover'){
					article.css({x:0});
					container.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,scale:scale,rotate:0,x:(window.innerWidth/scale-ibase.landscapeWidth)*0.5,y:(window.innerHeight/scale-ibase.landscapeHeight)*0.5});
				}//edn if
			}//end else 
		}//edn func
		
    };//end func
	
	return com;
	
	String.prototype.replaceAll = function(s1,s2){
		return this.replace(new RegExp(s1,"gm"),s2);
	}
	
}//end import

//-----------------------------------math.js
function importMath(){var a={};return a.randomRange=function(a,b){var c;return c=Math.floor(Math.random()*(b-a+1))+a},a.randomSort=function(a){a&&a.length>1&&a.sort(function(){return.5-Math.random()})},a.randomPlus=function(){return Math.random()<.5?-1:1},a.autoSize=function(a,b,c){var d,e;return c=c||0,d=new Array,e=a[0]/a[1],d[0]=b[0],d[1]=Math.round(d[0]/e),c?d[1]<b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)):d[1]>b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)),d},a.ease=function(a,b,c,d){c=c||10,d=d||.1;var e=b-a;return Math.abs(e)>d?e/c+a:b},a.toRadian=function(a){return a*Math.PI/180},a.toDegree=function(a){return 180*(a/Math.PI)},a.getDis=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return Math.sqrt(Math.pow(Math.abs(c),2)+Math.pow(Math.abs(d),2))},a.getDeg=function(a,b){var c,d,e;return a[0]==b[0]&&a[1]==b[1]?c=0:(d=b[1]-a[1],e=b[0]-a[0],c=180*Math.atan(d/e)/Math.PI,0>e?c=180+c:e>=0&&0>d&&(c=360+c)),c},a.hitTest=function(a,b,c,d){var e,f,g,h,i,j;return c=null!=c?c:1,d=null!=d?d:1,a&&b?(e=[a.offset().left+a.outerWidth()*c/2,a.offset().top+a.outerHeight()*d/2],f=[b.offset().left+b.outerWidth()*c/2,b.offset().top+b.outerHeight()*d/2],g=Math.abs(f[0]-e[0]),h=Math.abs(f[1]-e[1]),i=(a.outerWidth()+b.outerWidth())*c/2,j=(a.outerHeight()+b.outerHeight())*d/2,i>=g&&j>=h?!0:void 0):!1},a.hitObject=function(a,b){var c,d,e,f,g,h;return a&&b?(c=[a.data().x+a.outerWidth()/2,a.data().y+a.outerHeight()/2],d=[b.data().x+b.outerWidth()/2,b.data().y+b.outerHeight()/2],e=Math.abs(d[0]-c[0]),f=Math.abs(d[1]-c[1]),g=(a.outerWidth()+b.outerWidth())/2,h=(a.outerHeight()+b.outerHeight())/2,g>=e&&h>=f?!0:void 0):!1},a.hitPoint=function(a,b,c,d){if(c=null!=c?c:1,d=null!=d?d:1,a&&b){var e=[b.offset().left,b.offset().left+b.outerWidth()*c,b.offset().top,b.offset().top+b.outerHeight()*d];return a[0]>=e[0]&&a[0]<=e[1]&&a[1]>=e[2]&&a[1]<=e[3]?!0:!1}return!1},a.arrayToInt=function(a){var c,b=0;for(c=0;c<a.length;c++)b+=a[c]*Math.pow(10,a.length-1-c);return b},a.deepClone=function(a){function b(a){var e,d="array"==c(a)?[]:{};for(e in a)d[e]="object"!=c(a[e])&&"array"!=c(a[e])?a[e]:b(a[e]);return d}function c(a){return"object"==typeof a?Array==a.constructor?"array":"object":null}return b(a)},a.objectLength=function(a){return Object.keys(a).length},a.formatNumber=function(a){return a=a.toString(),a.length<=3?a:this.formatNumber(a.substr(0,a.length-3))+","+a.substr(a.length-3)},a.float=function(a,b){var c,d;return b=b||2,a=a.toString(),-1==a.indexOf(".")?a:(c=a.split("."),d=c[0]+"."+c[1].substr(0,b),Number(d))},a}var imath=importMath();

//-----------------------------------loadBox
if(ibase.landscapeMode) $('<aside class="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><b></b></aside>').appendTo('article');
else document.write('<aside class="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><b></b></aside>');
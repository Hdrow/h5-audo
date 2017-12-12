//----------------------------------------jquery.transit.js v1.0.1
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){function d(a){var c,d,e,f;if(a in b.style)return a;for(c=["Moz","Webkit","O","ms"],d=a.charAt(0).toUpperCase()+a.substr(1),e=0;e<c.length;++e)if(f=c[e]+d,f in b.style)return f}function e(){return b.style[c.transform]="",b.style[c.transform]="rotateY(90deg)",""!==b.style[c.transform]}function j(a){return"string"==typeof a&&this.parse(a),this}function k(a,b,c){b===!0?a.queue(c):b?a.queue(b,c):a.each(function(){c.call(this)})}function l(b){var d=[];return a.each(b,function(b){b=a.camelCase(b),b=a.transit.propertyMap[b]||a.cssProps[b]||b,b=o(b),c[b]&&(b=o(c[b])),-1===a.inArray(b,d)&&d.push(b)}),d}function m(b,c,d,e){var g,h,f=l(b);return a.cssEase[d]&&(d=a.cssEase[d]),g=""+q(c)+" "+d,parseInt(e,10)>0&&(g+=" "+q(e)),h=[],a.each(f,function(a,b){h.push(b+" "+g)}),h.join(", ")}function n(b,d){d||(a.cssNumber[b]=!0),a.transit.propertyMap[b]=c.transform,a.cssHooks[b]={get:function(c){var d=a(c).css("transit:transform");return d.get(b)},set:function(c,d){var e=a(c).css("transit:transform");e.setFromString(b,d),a(c).css({"transit:transform":e})}}}function o(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function p(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$/)?""+a+b:a}function q(b){var c=b;return"string"!=typeof c||c.match(/^[\-0-9\.]+/)||(c=a.fx.speeds[c]||a.fx.speeds._default),p(c,"ms")}var b,c,f,g,h,i;a.transit={version:"1.0.1",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1},b=document.createElement("div"),c={},f=navigator.userAgent.toLowerCase().indexOf("chrome")>-1,c.transition=d("transition"),c.transitionDelay=d("transitionDelay"),c.transform=d("transform"),c.transformOrigin=d("transformOrigin"),c.filter=d("Filter"),c.transform3d=e(),g={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},h=c.transitionEnd=g[c.transition]||null;for(i in c)c.hasOwnProperty(i)&&"undefined"==typeof a.support[i]&&(a.support[i]=c[i]);return b=null,a.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},a.cssHooks["transit:transform"]={get:function(b){return a(b).data("transform")||new j},set:function(b,d){var e=d;e instanceof j||(e=new j(e)),b.style[c.transform]="WebkitTransform"!==c.transform||f?e.toString():e.toString(!0),a(b).data("transform",e)}},a.cssHooks.transform={set:a.cssHooks["transit:transform"].set},a.cssHooks.filter={get:function(a){return a.style[c.filter]},set:function(a,b){a.style[c.filter]=b}},a.fn.jquery<"1.8"&&(a.cssHooks.transformOrigin={get:function(a){return a.style[c.transformOrigin]},set:function(a,b){a.style[c.transformOrigin]=b}},a.cssHooks.transition={get:function(a){return a.style[c.transition]},set:function(a,b){a.style[c.transition]=b}}),n("scale"),n("scaleX"),n("scaleY"),n("translateX"),n("translateY"),n("translateZ"),n("translate"),n("translate3d"),n("rotate"),n("rotateX"),n("rotateY"),n("rotate3d"),n("perspective"),n("skewX"),n("skewY"),n("x",!0),n("y",!0),n("z",!0),j.prototype={setFromString:function(a,b){var c="string"==typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a),j.prototype.set.apply(this,c)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=p(a,"deg")},rotateX:function(a){this.rotateX=p(a,"deg")},rotateY:function(a){this.rotateY=p(a,"deg")},scale:function(a,b){void 0===b&&(b=a),this.scale=a+","+b},skewX:function(a){this.skewX=p(a,"deg")},skewY:function(a){this.skewY=p(a,"deg")},perspective:function(a){this.perspective=p(a,"px")},translateX:function(a){this.translateX=p(a,"px")},translateY:function(a){this.translateY=p(a,"px")},translateZ:function(a){this.translateZ=p(a,"px")},x:function(a){this.set("translate",a,null,null)},y:function(a){this.set("translate",null,a,null)},z:function(a){this.set("translate",null,null,a)},translate:function(a,b,c){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==a&&void 0!==a&&(this._translateX=p(a,"px")),null!==b&&void 0!==b&&(this._translateY=p(b,"px")),null!==c&&void 0!==c&&(this._translateZ=p(c,"px")),null===this._translateZ||void 0===this._translateZ?this.translate=this._translateX+","+this._translateY:(this.translate="0,0",this.translate3d=this._translateX+","+this._translateY+","+this._translateZ)}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},z:function(){return this._translateZ||0},scale:function(){var a=(this.scale||"1,1").split(",");return a[0]&&(a[0]=parseFloat(a[0])),a[1]&&(a[1]=parseFloat(a[1])),a[0]===a[1]?a[0]:a},rotate3d:function(){var b,a=(this.rotate3d||"0,0,0,0deg").split(",");for(b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));return a[3]&&(a[3]=p(a[3],"deg")),a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,c,d){b.setFromString(c,d)})},toString:function(a){var d,b=[];for(d in this)if(this.hasOwnProperty(d)){if(!c.transform3d&&("rotateX"===d||"rotateY"===d||"perspective"===d||"transformOrigin"===d))continue;"_"!==d[0]&&(a&&"scale"===d?b.push(d+"3d("+this[d]+",1)"):a&&"translate"===d?b.push(d+"3d("+this[d]+",0)"):b.push(d+"("+this[d]+")"))}return b.join(" ")}},a.fn.transition=a.fn.transit=function(b,d,e,f){var n,o,p,r,s,t,u,g=this,i=0,j=!0,l=a.extend(!0,{},b);return"function"==typeof d&&(f=d,d=void 0),"object"==typeof d&&(e=d.easing,i=d.delay||0,j="undefined"==typeof d.queue?!0:d.queue,f=d.complete,d=d.duration),"function"==typeof e&&(f=e,e=void 0),"undefined"!=typeof l.easing&&(e=l.easing,delete l.easing),"undefined"!=typeof l.duration&&(d=l.duration,delete l.duration),"undefined"!=typeof l.complete&&(f=l.complete,delete l.complete),"undefined"!=typeof l.queue&&(j=l.queue,delete l.queue),"undefined"!=typeof l.delay&&(i=l.delay,delete l.delay),"undefined"==typeof d&&(d=a.fx.speeds._default),"undefined"==typeof e&&(e=a.cssEase._default),d=q(d),n=m(l,d,e,i),o=a.transit.enabled&&c.transition,p=o?parseInt(d,10)+parseInt(i,10):0,0===p?(r=function(a){g.css(l),f&&f.apply(g),a&&a()},k(g,j,r),g):(s={},t=function(b){var d=!1,e=function(){d&&g.unbind(h,e),p>0&&g.each(function(){this.style[c.transition]=s[this]||null}),"function"==typeof f&&f.apply(g),"function"==typeof b&&b()};p>0&&h&&a.transit.useTransitionEnd?(d=!0,g.bind(h,e)):window.setTimeout(e,p),g.each(function(){p>0&&(this.style[c.transition]=n),a(this).css(l)})},u=function(a){this.offsetWidth=this.offsetWidth,t(a)},k(g,j,u),this)},a.transit.getTransitionValue=m,a});

//----------------------------------------PxLoader.js v1.1.2
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.PxLoader=b()}):"object"==typeof module&&module.exports?module.exports=b():a.PxLoader=b()}(this,function(){function a(a){a=a||{},this.settings=a,null==a.statusInterval&&(a.statusInterval=5e3),null==a.loggingDelay&&(a.loggingDelay=2e4),null==a.noProgressTimeout&&(a.noProgressTimeout=1/0);var c,d=[],e=[],f=[],g=Date.now(),h={QUEUED:0,WAITING:1,LOADED:2,ERROR:3,TIMEOUT:4},i=function(a){return null==a?[]:Array.isArray(a)?a:[a]};this.add=function(a){a.tags=new b(a.tags),null==a.priority&&(a.priority=1/0),d.push({resource:a,status:h.QUEUED})},this.addProgressListener=function(a,c){f.push({callback:a,tags:new b(c)})},this.addCompletionListener=function(a,c){e.push({tags:new b(c),callback:function(b){b.completedCount===b.totalCount&&a(b)}})};var j=function(a){a=i(a);var b=function(b){for(var c=b.resource,d=1/0,e=0;e<c.tags.length;e++)for(var f=0;f<Math.min(a.length,d)&&!(c.tags.all[e]===a[f]&&f<d&&(d=f,0===d))&&0!==d;f++);return d};return function(a,c){var d=b(a),e=b(c);return d<e?-1:d>e?1:a.priority<c.priority?-1:a.priority>c.priority?1:0}};this.start=function(a){c=Date.now();var b=j(a);d.sort(b);for(var e=0,f=d.length;e<f;e++){var g=d[e];g.status=h.WAITING,g.resource.start(this)}setTimeout(k,100)};var k=function(){for(var b=!1,c=Date.now()-g,e=c>=a.noProgressTimeout,f=c>=a.loggingDelay,i=0,j=d.length;i<j;i++){var l=d[i];l.status===h.WAITING&&(l.resource.checkStatus&&l.resource.checkStatus(),l.status===h.WAITING&&(e?l.resource.onTimeout():b=!0))}f&&b&&n(),b&&setTimeout(k,a.statusInterval)};this.isBusy=function(){for(var a=0,b=d.length;a<b;a++)if(d[a].status===h.QUEUED||d[a].status===h.WAITING)return!0;return!1};var l=function(a,b){var c,i,j,k,l,n=null;for(c=0,i=d.length;c<i;c++)if(d[c].resource===a){n=d[c];break}if(null!=n&&n.status===h.WAITING)for(n.status=b,g=Date.now(),j=f.concat(e),c=0,i=j.length;c<i;c++)k=j[c],l=0===k.tags.length||a.tags.intersects(k.tags),l&&m(n,k)};this.onLoad=function(a){l(a,h.LOADED)},this.onError=function(a){l(a,h.ERROR)},this.onTimeout=function(a){l(a,h.TIMEOUT)};var m=function(a,b){var c,e,f,g,i=0,j=0;for(c=0,e=d.length;c<e;c++)f=d[c],g=!1,g=0===b.tags.length||f.resource.tags.intersects(b.tags),g&&(j++,f.status!==h.LOADED&&f.status!==h.ERROR&&f.status!==h.TIMEOUT||i++);b.callback({resource:a.resource,loaded:a.status===h.LOADED,error:a.status===h.ERROR,timeout:a.status===h.TIMEOUT,completedCount:i,totalCount:j})},n=this.log=function(a){if(window.console){var b=Math.round((Date.now()-c)/1e3);window.console.log("PxLoader elapsed: "+b+" sec");for(var e=0,f=d.length;e<f;e++){var g=d[e];if(a||g.status===h.WAITING){var i="PxLoader: #"+e+" "+g.resource.getName();switch(g.status){case h.QUEUED:i+=" (Not Started)";break;case h.WAITING:i+=" (Waiting)";break;case h.LOADED:i+=" (Loaded)";break;case h.ERROR:i+=" (Error)";break;case h.TIMEOUT:i+=" (Timeout)"}g.resource.tags.length>0&&(i+=" Tags: ["+g.resource.tags.all.join(",")+"]"),window.console.log(i)}}}}}function b(a){if(this.all=[],this.first=null,this.length=0,this.lookup={},a){if(Array.isArray(a))this.all=a.slice(0);else if("object"==typeof a)for(var b in a)a.hasOwnProperty(b)&&this.all.push(b);else this.all.push(a);this.length=this.all.length,this.length>0&&(this.first=this.all[0]);for(var c=0;c<this.length;c++)this.lookup[this.all[c]]=!0}}return b.prototype.intersects=function(a){if(0===this.length||0===a.length)return!1;if(1===this.length&&1===a.length)return this.first===a.first;if(a.length<this.length)return a.intersects(this);for(var b in this.lookup)if(a.lookup[b])return!0;return!1},a}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderImage=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderImage=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;e=this.img=new Image,d.origin&&(e.crossOrigin=d.origin),this.tags=b,this.priority=c;var h=function(){"complete"===f.img.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind("readystatechange",h),f.unbind("error",j)};this.start=function(b){g=b,f.bind("load",i),f.bind("readystatechange",h),f.bind("error",j),f.img.src=a},this.checkStatus=function(){h()},this.onTimeout=function(){f.img.complete?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.img.addEventListener(a,b,!1)},this.unbind=function(a,b){f.img.removeEventListener(a,b,!1)}}return a.prototype.addImage=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.img},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderSound=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderSound=b(a.PxLoader)}(this,function(a){function b(a,b,c,d,e){var f=this,g=null,h=navigator.userAgent.match(/(ipad|iphone|ipod)/i),i=navigator.userAgent.match(/android/i);this.useGlobalHTML5Audio=h||i,this.tags=c,this.priority=d,this.sound=soundManager.createSound({id:a,url:b,autoLoad:!1,onload:function(){g.onLoad(f)},onsuspend:function(){g.onTimeout(f)},whileloading:function(){var a=this.bytesLoaded,b=this.bytesTotal;a>0&&a===b&&g.onLoad(f)}}),this.start=function(a){g=a,this.useGlobalHTML5Audio?g.onTimeout(f):this.sound.load()},this.checkStatus=function(){switch(f.sound.readyState){case 0:break;case 1:break;case 2:g.onError(f);break;case 3:g.onLoad(f)}},this.onTimeout=function(){g.onTimeout(f)},this.getName=function(){return b}}return a.prototype.addSound=function(a,c,d,e,f){var g=new b(a,c,d,e,f);return this.add(g),g.sound},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderVideo=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderVideo=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.video=document.createElement("video"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.video.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.video.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.video.src=a,f.video.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.video.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.video.addEventListener(a,b,!1)},this.unbind=function(a,b){f.video.removeEventListener(a,b,!1)}}return a.prototype.addVideo=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.video},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderData=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderData=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e=this,f=null;this.tags=b,this.priority=c,this.xhr=new XMLHttpRequest;var g=function(){4===e.xhr.readyState&&(200===e.xhr.status?h():i())},h=function(){f.onLoad(e),k()},i=function(){f.onError(e),k()},j=function(){f.onTimeout(e),k()},k=function(){e.unbind("readystatechange",g),e.unbind("error",i)};this.start=function(b){f=b,e.bind("readystatechange",g),e.bind("error",i),e.xhr.open("GET",a,!0),e.xhr.send(null),e.xhr.responseType=d.responseType?d.responseType:""},this.checkStatus=function(){g()},this.onTimeout=function(){4===e.xhr.readyState?200===e.xhr.status?h():i():j()},this.getName=function(){return a},this.bind=function(a,b){e.xhr.addEventListener(a,b,!1)},this.unbind=function(a,b){e.xhr.removeEventListener(a,b,!1)}}return a.prototype.addData=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.xhr},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderAudio=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderAudio=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.audio=document.createElement("audio"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.audio.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.audio.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.audio.src=a,f.audio.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.audio.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.audio.addEventListener(a,b,!1)},this.unbind=function(a,b){f.audio.removeEventListener(a,b,!1)}}return a.prototype.addAudio=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.audio},b});

//-----------------------------------swipe.js
!function(){$.event.special.swipe={setup:function(){function d(c){var d=c.originalEvent.touches[0];b={time:(new Date).getTime(),coords:[d.pageX,d.pageY]},a.on("touchmove",e).one("touchend",f)}function e(a){var d=a.originalEvent.changedTouches[0];c={time:(new Date).getTime(),coords:[d.pageX,d.pageY]},(Math.abs(b.coords[1]-c.coords[1])>10||Math.abs(b.coords[0]-c.coords[0])>5)&&a.preventDefault()}function f(){a.off("touchmove",e),b&&c&&c.time-b.time<1e3&&(Math.abs(b.coords[1]-c.coords[1])>15&&Math.abs(b.coords[0]-c.coords[0])<70?a.trigger("swipe").trigger(b.coords[1]>c.coords[1]?"swipeup":"swipedown"):Math.abs(b.coords[0]-c.coords[0])>15&&Math.abs(b.coords[1]-c.coords[1])<70&&a.trigger("swipe").trigger(b.coords[0]>c.coords[0]?"swipeleft":"swiperight")),b=c=void 0}var b,c,a=$(this);a.on("touchstart",d)}},$.each({swipeleft:"swipe",swiperight:"swipe",swipedown:"swipe",swipeup:"swipe"},function(a,b){$.event.special[a]={setup:function(){$(this).on(b,$.noop)}}})}();

//-----------------------------------touched.js
!function(){$.event.special.touched={setup:function(){function b(){a.one("touchmove",c).one("touchend",d)}function c(){a.off("touchend",d).one("touchstart",b)}function d(){a.off("touchmove",c).one("touchstart",b),a.trigger("touched")}var a=$(this);a.one("touchstart",b)}}}();

//-----------------------------------pinch.js
!function(){$.event.special.pinch={setup:function(){function i(a){$(this).on("touchmove",j).one("touchend",k),1==a.originalEvent.touches.length?(b=!1,c=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY]):a.originalEvent.touches.length>=2&&(b=!0,c=[a.originalEvent.touches[0].clientX,a.originalEvent.touches[0].clientY],d=[a.originalEvent.touches[1].clientX,a.originalEvent.touches[1].clientY],e=imath.getDis(c,d),g=h=imath.getDeg(c,d))}function j(b){var f,g,i,j;b.preventDefault(),1==b.originalEvent.touches.length?(f=[b.originalEvent.touches[0].clientX,b.originalEvent.touches[0].clientY],a.trigger("pinch").trigger("pinchmove",[f[0]-c[0],f[1]-c[1]]),c[0]=f[0],c[1]=f[1]):b.originalEvent.touches.length>=2&&(f=[b.originalEvent.touches[0].clientX,b.originalEvent.touches[0].clientY],g=[b.originalEvent.touches[1].clientX,b.originalEvent.touches[1].clientY],i=imath.getDis(f,g),Math.abs(i-e)>.5&&a.trigger("pinch").trigger("pinchscale",[.025*(i-e)/Math.abs(i-e)]),j=imath.getDeg(f,g),j!=h&&a.trigger("pinch").trigger("pinchrotate",[j-h]),c[0]=f[0],c[1]=f[1],d[0]=g[0],d[1]=g[1],e=i,h=j)}function k(){$(this).off("touchmove")}var b,e,g,h,a=$(this),c=[],d=[];a.on("touchstart",i)}},$.each({pinchmove:"pinch",pinchscale:"pinch",pinchrotate:"pinch"},function(a,b){$.event.special[a]={setup:function(){$(this).on(b,$.noop)}}})}();

//-----------------------------------com.js
"use strict";function importCom(){function e(e){e.preventDefault()}function n(e,n,t,a){n&&$.isPlainObject(n)&&(n=JSON.stringify(n)),$.post("./http/httpPost.php",{api_url:e,post_data:n,action:a},function(e){t&&t(e)},"json")}function t(e,n){n=n||0;var t=e.split("<br/>");if(n<=0||t.length<=n)return e;for(var a="",i=0;i<n;i++)a+=t[i],i<n-1&&(a+="<br/>");return a}function a(e,n){var t=Math.ceil(e.length/n);if(1==t)return e;for(var a="",i=0;i<t;i++)a+=0==i?e.substr(0,n)+"<br/>":i<t-1?e.substr(i*n,n)+"<br/>":e.substr(i*n);return a}function i(e){cancelAnimationFrame(e.timer),e=null}function o(e,n,t,a){function i(){t?o.now++:o.now=(new Date).getTime()-o.start;var r=t?o.now==n:o.now>=n;r&&(o.now=0,o.start=(new Date).getTime(),e()),(a||!a&&!r)&&(o.timer=requestAnimationFrame(i))}var o={now:0,start:t?0:(new Date).getTime(),timer:null};return i(),o}function r(e){var n=$(this).data("copy"),t=$('<textarea readonly="readonly"></textarea>').html(n).css({position:"absolute",left:0,top:0,width:1,height:1,visible:"hidden"}).appendTo("body");t[0].select(),t[0].setSelectionRange(0,t[0].value.length),console.log("copy content:"+t.val()),document.execCommand("Copy"),t.remove(),t=null,e.data.callback&&e.data.callback()}var s={};return s.init=function(e){function n(){ibase.lock?requestAnimationFrame(n):e&&e()}function t(e){if(ibase.landscapeFollow)for(var n=1;n<=3;n++)s.setTimeout(a,10*n,1);else if("portrait"!=ibase.landscapeFirstDir&&"portrait"==ibase.getOrient()){for(var n=1;n<=3;n++)s.setTimeout(a,10*n,1);$(this).off("orientationchange",t)}}function a(){if("portrait"==ibase.getOrient())if(console.log("screen portrait"),os.iphoneXWeixin&&i.removeClass("iphoneXLandscape").addClass("iphoneXPortrait"),"cover"==ibase.landscapeScaleMode||"contain"==ibase.landscapeScaleMode){var e=imath.autoSize([ibase.landscapeHeight,ibase.landscapeWidth],[window.innerWidth,os.iphoneXWeixin?window.innerHeight-ibase.iphoneXOffsetPortrait:window.innerHeight],ibase.landscapeScaleMode),n=e[0]/ibase.landscapeHeight;console.log("window size:"+window.innerHeight+"/"+window.innerWidth),console.log("auto scale:"+n),ibase.landScapeScaleX=ibase.landScapeScaleY=n,i.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:90,scale:n,x:os.iphoneX?0:.5*(window.innerHeight/n-ibase.landscapeWidth),y:-ibase.landscapeHeight+.5*(ibase.landscapeHeight-window.innerWidth/n)})}else{var n=[window.innerWidth/ibase.landscapeHeight,window.innerHeight/ibase.landscapeWidth];console.log("window size:"+window.innerHeight+"/"+window.innerWidth),console.log("auto scale:"+n),ibase.landScapeScaleX=n[0],ibase.landScapeScaleY=n[1],i.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:90,scaleX:n[1],scaleY:n[0],x:0,y:-ibase.landscapeHeight})}else if(console.log("screen landscape"),os.iphoneXWeixin&&i.addClass("iphoneXLandscape").removeClass("iphoneXPortrait"),"cover"==ibase.landscapeScaleMode||"contain"==ibase.landscapeScaleMode){var e=imath.autoSize([ibase.landscapeWidth,ibase.landscapeHeight],[os.iphoneXWeixin?window.innerWidth-2*ibase.iphoneXOffsetLandscape:window.innerWidth,window.innerHeight],ibase.landscapeScaleMode),n=e[0]/ibase.landscapeWidth;console.log("window size:"+window.innerWidth+"/"+window.innerHeight),console.log("auto scale:"+n),ibase.landScapeScaleX=ibase.landScapeScaleY=n,i.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:0,scale:n,x:.5*(window.innerWidth/n-ibase.landscapeWidth)+os.iphoneXWeixin?ibase.iphoneXOffsetLandscape/n:0,y:.5*(window.innerHeight/n-ibase.landscapeHeight)})}else{var n=[window.innerWidth/ibase.landscapeWidth,window.innerHeight/ibase.landscapeHeight];console.log("window size:"+window.innerHeight+"/"+window.innerWidth),console.log("auto scale:"+n),ibase.landScapeScaleX=n[0],ibase.landScapeScaleY=n[1],i.css({width:ibase.landscapeWidth,height:ibase.landscapeHeight,rotate:0,scaleX:n[0]+os.iphoneXWeixin?ibase.iphoneXOffsetLandscape/n[0]:0,scaleY:n[1],x:0,y:0})}}var i=$("article");"portrait"==ibase.dir?(os.iphoneXWeixin&&i.addClass("iphoneXPortrait"),n()):(a(),$(window).on("orientationchange",t),os.ios?n():e&&e())},s.screenScrollEnable=function(){$(document).off("touchmove",e)},s.screenScrollUnable=function(){$(document).on("touchmove",e)},s.fadeIn=function(e,n,t){e&&(n=n||500,e.show().css({opacity:0}).transition({opacity:1},n,function(){t&&t($(this))}))},s.fadeOut=function(e,n,t){e&&(n=n||500,e.transition({opacity:0},n,function(){$(this).hide().css({opacity:1}),t&&t($(this))}))},s.popOn=function(e,n){function t(n){i.closeBtn.length>0&&"button"==i.closeType?i.closeBtn.off(i.closeEvent,t):e.off(i.closeEvent,t),i.fade?s.fadeOut(e,i.fade,function(){i.remove&&e.remove()}):i.remove?e.remove():e.hide(),e.off("close",t),i.onClose&&i.onClose(e)}if(e&&e.length>0){var a={closeEvent:"touchend",closeType:"button",closeBtn:e.find("a.close"),remove:!1},i=$.extend(a,n);i.text&&e.find(".text").html(i.text),i.fade?s.fadeIn(e,i.fade):e.show(),i.closeBtn.length>0&&"button"==i.closeType?i.closeBtn.one(i.closeEvent,t):e.one(i.closeEvent,t),e.on("close",t)}},s.popOff=function(e){e&&e.length>0&&e.trigger("close")},s.alert=function(e,n){if(e&&""!=e){var t=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo("landscape"==ibase.dir?"article":"body");s.popOn(t,{text:e,onClose:n,remove:!0,closeEvent:"click"})}},s.confirm=function(e,n,t,a,i){if(e=e||"",a=a||"取消",i=i||"确认",""!=e){var o=$('<aside class="confirmBox"><div><p class="text">'+e+'</p><p class="btn"><a href="javascript:;" class="cancel">'+a+'</a><a href="javascript:;" class="confirm">'+i+"</a></p></div></aside>").appendTo("landscape"==ibase.dir?"article":"body"),r=o.find("a");r.one("click",function(e){0==$(this).index()&&t?t():1==$(this).index()&&n&&n(),r.off(),o.remove()})}},s.getQueryString=function(e){if(e&&""!=e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(n);return null!=t?decodeURIComponent(t[2]):null}return null},s.imageLoad=function(e,n){if(e&&""!=e){var t=new PxLoader;if("string"===$.type(e)&&""!=e)t.addImage(e);else if("array"===$.type(e)&&e.length>0)for(var a=0;a<e.length;a++)t.addImage(e[a]);t.addCompletionListener(function(){console.log("images load complete"),t=null,n&&n(e)}),t.start()}},s.checkStr=function(e,n){if(e&&""!=e){switch(n=n||0){case 0:var t=new RegExp(/^1[3-9]\d{9}$/);break;case 1:var t=new RegExp(/^[1-9]\d{5}$/);break;case 2:var t=new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/);break;case 3:var t=new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);break;case 4:var t=new RegExp(/^\d+$/);break;case 5:var t=new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);break;case 6:var t=new RegExp(/^\w+$/);break;case 7:var t=new RegExp(/^[\u0391-\uFFE5]+$/);break;case 8:var t=new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/);break;case 9:var t=new RegExp(/^\d{6}$/);break;case 10:var t=new RegExp(/^\d{4}$/)}return!!t.exec($.trim(e))}return!1},s.post=function(e,t,a){e&&""!=e&&n(e,t,a,"post")},s.get=function(e,t,a){e&&""!=e&&n(e,t,a,"get")},s.keyboard=function(e,n,t){function a(n){n.target!=e[0]&&e.blur()}function i(e){"portrait"!=ibase.dir||0!=window.orientation&&180!=window.orientation?"landscape"!=ibase.dir||90!=window.orientation&&-90!=window.orientation||($(window).height()<c?o():r()):$(window).height()<c?o():r()}function o(){n.css({height:l}),t&&t(!0)}function r(){t&&t(!1)}if(e=e||$('input,textarea,[contenteditable="true"]'),n=n||e.parents("section"),e.length>0)if(os.ios){var s=$("body");e.on("focus",function(e){s.one("touchend",a)})}else if(n.length>0){var c=$(window).height(),l=n.height();$(window).on("resize",i)}},s.select=function(e){function n(n){n.target!=e[0]&&e.blur()}e=e||$("select"),e.length>0&&os.ios&&e.on("focus",function(e){$(document).one("touchend",n)})},s.shake=function(e,n){if(e&&e.length>0){var t={rx:5,ry:5,delay:33,now:0,max:5,restore:!0},a=$.extend(t,n),i=imath.randomRange(-a.rx,a.rx),o=imath.randomRange(-a.ry,a.ry);e.css({x:i,y:o}),a.now++,a.now>a.max?(a.restore&&e.css({x:0,y:0}),a.onComplete&&a.onComplete()):setTimeout(s.shake,a.delay,e,a)}},s.textareaGet=function(e,n){n=n||0;var a=e.val();return""==a?"":t(a.replaceAll("\n","<br/>"),n)},s.textareaSet=function(e,n){""==n?e.val(""):e.val(n.replaceAll("<br/>","\n"))},s.textareaLock=function(e){function n(e){r=requestAnimationFrame(o)}function i(n){cancelAnimationFrame(r);var i=s.textareaGet(e,c);if(-1!=i.indexOf("<br/>")){for(var o=i.split("<br/>"),d="",p=0;p<o.length;p++)d+=a(o[p],l),p<o.length-1&&(d+="<br/>");d=t(d,c);var h=d.replaceAll("<br/>","\n");e.val(h)}}function o(){var n=s.textareaGet(e,c);-1==n.indexOf("<br/>")?e.attr({maxlength:d}):e.attr({maxlength:d+2*(n.split("<br/>").length-1)})}if(e&&e.length>0){var r,c=parseInt(e.attr("rows"))||0,l=parseInt(e.attr("cols"))||0,d=parseInt(e.attr("maxlength"))||0;d=0==d?c*l:d,c>0&&l>0&&d>0&&e.on("focus",n).on("blur",i)}},s.textareaUnlock=function(e){e.off()},s.textToMulti=function(e,n){if(""!=e&&n>1){if(-1==e.indexOf("\n")&&e.length>n){var t="",a=Math.ceil(e.length/n);console.log("line:"+a);for(var i=0;i<a;i++)t+=i<a-1?e.substr(i*n,n)+"\n":e.substr(i*n);return t}return e}return null},s.url=function(e,n){var t=-1;for(var a in n)t++,e+=0==t?"?":"&",e+=a+"="+n[a];return e},s.setTimeout=function(e,n,t){if(t=t||0,n>0&&e)return o(e,n,t,!1)},s.clearTimeout=function(e){e&&e.timer&&i(e)},s.setInterval=function(e,n,t){if(t=t||0,n>0&&e)return o(e,n,t,!0)},s.clearInterval=function(e){e&&e.timer&&i(e)},s.canvas_send=function(e,n,t,a,i){if(e){if(t=t||"test",a=a||"jpg",i=i||.8,"png"==a)var o=e.toDataURL("image/png");else var o=e.toDataURL("image/jpeg",i);this.base64_send(o,n,t)}},s.base64_send=function(e,n,t){e&&(t=t||"test",$.post("http://tool.be-xx.com/cdn/base64",{data:e,key:t},function(e){0==e.errcode?n&&n(e.result):console.log("errmsg:"+e.errmsg)},"json"))},s.base64_get=function(e,n,t){e&&(t=t||"test",$.post("http://tool.be-xx.com/image/base64",{link:e,key:t},function(e){n&&n(e)},"text"))},s.qrcode=function(e,n){var t={size:200,color:"#000000",bg:"#ffffff",border:0,error:0,logo:!1},a=$.extend(t,n);if(e&&""!=e){return"http://tool.be-xx.com/image/qrcode?txt="+e+"&size="+a.size+"&color="+a.color+"&bg="+a.bg+"&border="+a.border+"&error="+a.error+"&logo="+a.logo}return null},s.barcode=function(e,n){var t={width:400,height:200,color:"#000000",bg:"#ffffff",pure:!0},a=$.extend(t,n);if(e&&""!=e){return"http://tool.be-xx.com/image/barcode?txt="+e+"&width="+a.width+"&height="+a.height+"&color="+a.color+"&bg="+a.bg+"&pure="+a.pure}return null},s.clipboard=function(e,n,t,a){var i=!!document.queryCommandSupported;console.log("support:"+i),i?e.length>0&&""!=n&&e.attr({"data-copy":n}).on("click",{callback:t},r):(console.log("浏览器不支持复制文本到剪贴板"),a&&a())},s}var icom=importCom();String.prototype.replaceAll=function(e,n){return this.replace(new RegExp(e,"gm"),n)},Date.prototype.Format=function(e){var n={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var t in n)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[t]:("00"+n[t]).substr((""+n[t]).length)));return e};

//-----------------------------------math.js
function importMath(){var a={};return a.randomRange=function(a,b){var c;return c=Math.floor(Math.random()*(b-a+1))+a},a.randomColor=function(){var a="0123456789abcdef",b="#";for(j=0;6>j;j++)b+=a.charAt(Math.random()*a.length);return b},a.randomSort=function(a){a&&a.length>1&&a.sort(function(){return.5-Math.random()})},a.randomPlus=function(){return Math.random()<.5?-1:1},a.autoSize=function(a,b,c){var d,e;return c=1===c||0===c?1===c?"cover":"contain":c||"cover",d=[],e=a[0]/a[1],d[0]=b[0],d[1]=Math.round(d[0]/e),"height"==c?(d[1]=b[1],d[0]=Math.round(d[1]*e)):"contain"==c?d[1]>b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)):"cover"==c?d[1]<b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)):"full"==c&&(d=[b[0],b[1]]),d},a.ease=function(a,b,c,d){c=c||10,d=d||.1;var e=b-a;return Math.abs(e)>d?e/c+a:b},a.toRadian=function(a){return a*Math.PI/180},a.toDegree=function(a){return 180*(a/Math.PI)},a.getDis=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return Math.sqrt(Math.pow(Math.abs(c),2)+Math.pow(Math.abs(d),2))},a.getDeg=function(a,b){var c,d,e;return a[0]==b[0]&&a[1]==b[1]?c=0:(d=b[1]-a[1],e=b[0]-a[0],c=180*Math.atan(d/e)/Math.PI,0>e?c=180+c:e>=0&&0>d&&(c=360+c)),c},a.hitTest=function(a,b,c,d){var e,f,g,h,i,j;return c=null!=c?c:1,d=null!=d?d:1,a&&b?(e=[a.offset().left+.5*a.outerWidth()*c,a.offset().top+.5*a.outerHeight()*d],f=[b.offset().left+.5*b.outerWidth()*c,b.offset().top+.5*b.outerHeight()*d],g=Math.abs(f[0]-e[0]),h=Math.abs(f[1]-e[1]),i=.5*(a.outerWidth()+b.outerWidth())*c,j=.5*(a.outerHeight()+b.outerHeight())*d,i>=g&&j>=h?!0:void 0):!1},a.hitObject=function(a,b){var c,d,e,f,g,h;return a&&b?(c=[a.data().x+.5*a.outerWidth(),a.data().y+.5*a.outerHeight()],d=[b.data().x+.5*b.outerWidth(),b.data().y+.5*b.outerHeight()],e=Math.abs(d[0]-c[0]),f=Math.abs(d[1]-c[1]),g=.5*(a.outerWidth()+b.outerWidth()),h=.5*(a.outerHeight()+b.outerHeight()),g>=e&&h>=f?!0:void 0):!1},a.hitPoint=function(a,b,c,d){if(c=null!=c?c:1,d=null!=d?d:1,a&&b){var e=[b.offset().left,b.offset().left+b.outerWidth()*c,b.offset().top,b.offset().top+b.outerHeight()*d];return a[0]>=e[0]&&a[0]<=e[1]&&a[1]>=e[2]&&a[1]<=e[3]?!0:!1}return!1},a.arrayToInt=function(a){var c,b=0;for(c=0;c<a.length;c++)b+=a[c]*Math.pow(10,a.length-1-c);return b},a.deepClone=function(b){function c(b){var e,d="array"==a.dataType(b)?[]:{};for(e in b)d[e]="object"!=a.dataType(b[e])&&"array"!=a.dataType(b[e])?b[e]:c(b[e]);return d}return c(b)},a.dataType=function(a){return"object"==typeof a?Array==a.constructor?"array":"object":null},a.objectLength=function(a){return Object.keys(a).length},a.formatNumber=function(a){return a=a.toString(),a.length<=3?a:this.formatNumber(a.substr(0,a.length-3))+","+a.substr(a.length-3)},a.float=function(a,b){var c,d;return b=b||2,a=a.toString(),-1==a.indexOf(".")?a:(c=a.split("."),d=c[0]+"."+c[1].substr(0,b),Number(d))},a.colorToRgb=function(a){if(a.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)){var b=a.slice(a.indexOf("#")+1),c=3===b.length,d=c?b.charAt(0)+b.charAt(0):b.substring(0,2),e=c?b.charAt(1)+b.charAt(1):b.substring(2,4),f=c?b.charAt(2)+b.charAt(2):b.substring(4,6);return[parseInt(d,16),parseInt(e,16),parseInt(f,16)]}return"rgba(0,0,0,255)"},a.path=function(a){return a&&""!=a?a.substr(0,a.lastIndexOf("/")+1):!1},a}var imath=importMath();

//-----------------------------------loadBox
if(ibase.dir=='landscape') $('<aside class="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></aside>').appendTo('article');
else document.write('<aside class="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></aside>');

//-----------------------------------debug
if(ibase.debug){
	ibase.load('js/base/vConsole.min.js');
	window.console.table(ibase.screenList);
}//end if

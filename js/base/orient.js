//2016.6.16
var iorient = importOrient();

function importOrient() {
    var orient = {};
    var turnBox = $("#turnBox");
	
    orient.init = function(reload,callback) {
    	reload=reload||false;
        this.dir = ibase.dir || "portrait";
        if(reload && this.dir!= this.get()) $(window).one("orientationchange", function(e){location.reload();});
        if(os.ios) $(window).on("resize", window_orientation);
        else $(window).on("orientationchange", window_orientation);
    	$(window).on("orientationchange", {callback:callback}, callback_handler);
    };//end func
    
    orient.unlock = function() {
    	if(os.ios) $(window).off("resize", window_orientation);
        else $(window).off("orientationchange", window_orientation);
        $(window).off("orientationchange", callback_handler);
       	turnBox.hide();
    };//end func
    
    orient.get = function() {
        if (os.ios) return window.innerWidth > window.innerHeight ? "landscape" :"portrait"; 
        else return window.orientation == 90 || window.orientation == -90 ? "landscape" :"portrait";
    };//end func
    
    function window_orientation(e) {
        var orientation = orient.get();
        if (orient.dir == "portrait") {
            if (orientation == "landscape") turnBox.show();
            else turnBox.hide();
        } else {
            if (orientation == "portrait") turnBox.show(); 
            else turnBox.hide();
        }
    }//end func
    
    function callback_handler(e) {
        var callback = e.data.callback;
        if (orient.dir == orient.get() && callback) callback();
    }//end func
    
    return orient;
}// end fnc
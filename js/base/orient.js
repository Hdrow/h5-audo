//-----------------------------------orient.js
//2016.7.21
var iorient = importOrient();

function importOrient() {
    var orient = {};
	
    orient.init = function(reload,callback) {
    	reload=reload||false;
        this.dir = ibase.dir || "portrait";
        if(reload && this.dir!= this.get()) window.addEventListener("resize", function(event){location.reload();},false);
        window.addEventListener("resize", window_orientation,false);
    };//end func
    
    orient.unlock = function() {
    	window.removeEventListener("resize", window_orientation,false);
       	ibase.turnBox.style.display='none';
    };//end func
    
    orient.get = function() {
        return window.innerWidth > window.innerHeight ? "landscape" :"portrait"; 
    };//end func
    
    function window_orientation(e) {
        var orientation = orient.get();
        if (orient.dir == "portrait") {
            if (orientation == "landscape") ibase.turnBox.style.display='block';
            else ibase.turnBox.style.display='none';
        } else {
            if (orientation == "portrait") ibase.turnBox.style.display='block';
            else ibase.turnBox.style.display='none';
        }
        if (orient.dir == orient.get() && callback) callback();
    }//end func
    
    
    return orient;
}// end fnc
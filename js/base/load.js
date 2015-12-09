var iload=importLoad();
function importLoad(){
	var load={};
	
	load.css=function(f){
		var file=get_filetype(f);
		if (file.type == "css") document.write('<link rel="stylesheet" type="text/css" href="' + file.src + '" />');
	}//end func
	
	load.js=function(f){
		var file=get_filetype(f);
		if (file.type == "js") document.write('<script src="' + file.src + '"><\/script>');
	}//end func
	
	function get_filetype(f){
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src=f + '?v=' + Math.random();
		return {type:type,src:src};
	}//end func
	
	return load;
}//end func
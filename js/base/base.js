//2016.6.14
var ibase=importBase();

function importBase(){
	var base={}
	
	base.viewport=function(unit,wd,pxCss){
		unit=unit||'rem';
		wd=wd||640;
		pxCss=pxCss||'css/px.css';
		if(unit=='rem' || unit=='em'){
			document.write('<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');
			document.write('<link rel="stylesheet" type="text/css" href="css/common.css" />');
		}//end if
		else if(unit=='px'){
			document.write('<meta name="viewport" content="width='+wd+', minimum-scale = '+window.screen.width/wd+', maximum-scale = '+window.screen.width/wd+', target-densitydpi=device-dpi">');
			document.write('<link rel="stylesheet" type="text/css" href="'+pxCss+'" />');
		}//edn else
		else if(unit=='html2canvas'){
			document.write('<meta name="viewport" content="width='+wd+',target-densitydpi=device-dpi,user-scalable=no">');
			document.write('<link rel="stylesheet" type="text/css" href="css/common.css" />');
		}//end else
	}//edn func
	
	base.load=function(f,shell){
		shell=shell||'head';
		var file=get_filetype(f);
		if (file.type == "css"){
			var fileref = document.createElement('link');
	        fileref.setAttribute("rel","stylesheet");
	        fileref.setAttribute("type","text/css");
	        fileref.setAttribute("href",file.src);
	        document.getElementsByTagName(shell)[0].appendChild(fileref);
		}//end if
		else if(file.type == "js"){
			var fileref = document.createElement('script');
			fileref.setAttribute("type","text/javascript");
	        fileref.setAttribute("src",file.src);
			document.getElementsByTagName(shell)[0].appendChild(fileref);
		}//end else
	}//end func
	
	base.orient=function(dir){
		this.dir = dir || "portrait";
    	if(this.dir=="portrait") this.load("css/portrait.css");
    	else this.load("css/landscape.css")
	}//end func
	
	function get_filetype(f){
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src=f + '?v=' + Math.random();
		return {type:type,src:src};
	}//end func
	
	return base;
}//end func
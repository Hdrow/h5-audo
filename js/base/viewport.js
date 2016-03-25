var iviewport=importViewport();
function importViewport(){
	var viewport={};
	viewport.set=function(unit){
		unit=unit||'rem';
		if(unit=='rem' || unit=='em'){
			document.write('<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');
			document.write('<link rel="stylesheet" type="text/css" href="css/common.css" />');
		}//end if
		else{
			document.write('<meta name="viewport" content="width=640, minimum-scale = '+window.screen.width/640+', maximum-scale = '+window.screen.width/640+', target-densitydpi=device-dpi">');
			document.write('<link rel="stylesheet" type="text/css" href="css/common.px.css" />');
		}//edn else
	}//edn func
	return viewport;
}//end func
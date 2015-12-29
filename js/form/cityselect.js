/*
2015.12.29
settings 参数说明
	prov:选择省份提示文字
	city:选择城市提示文字
	dist:选择区县提示文字
 */
(function($){
	
	$.fn.citySelect=function(cityData,settings){
		cityData=cityData||window.chinaCityData;
		if(cityData){
			settings=$.extend({
				prov:'省份',
				city:'城市',
				dist:'区县'
			},settings);
			var $this=$(this);
			var provBox=$this.find("select.prov");
			var cityBox=$this.find("select.city");
			var distBox=$this.find("select.dist");
			init();
		}//end if
		
		
		function init(){
			provStart();
			provBox.on("change",cityStart);
			cityBox.bind("change",distStart);
		}//end func
		
		function provStart(){
			var temp="<option value=''>"+settings.prov+"</option>";
			$.each(cityData.citylist,function(i,prov){
				temp+="<option value='"+prov.p+"'>"+prov.p+"</option>";
			});
			provBox.html(temp);
			cityBox.html("<option value=''>"+settings.city+"</option>");
			distBox.html("<option value=''>"+settings.dist+"</option>");
		}//end func

		function cityStart(){
			var provId=provBox.get(0).selectedIndex-1;
			cityBox.empty().attr("disabled",true);
			distBox.empty().attr("disabled",true);
			if( !(provId<0 || typeof(cityData.citylist[provId].c)=="undefined") ){
				var temp="<option value=''>"+settings.city+"</option>";
				distBox.html("<option value=''>"+settings.dist+"</option>");
				$.each(cityData.citylist[provId].c,function(i,city){
					temp+="<option value='"+city.n+"'>"+city.n+"</option>";
				});
				cityBox.html(temp).attr("disabled",false);
				
			}//end if
			else provStart();
		}//end func

		function distStart(){
			var provId=provBox.get(0).selectedIndex-1;
			var cityId=cityBox.get(0).selectedIndex-1;
			distBox.empty().attr("disabled",true);
			if( !(provId<0 || cityId<0 || typeof(cityData.citylist[provId].c[cityId].a)=="undefined") ){
				var temp="<option value=''>"+settings.dist+"</option>";
				$.each(cityData.citylist[provId].c[cityId].a,function(i,dist){
					temp+="<option value='"+dist.s+"'>"+dist.s+"</option>";
				});
				distBox.html(temp).attr("disabled",false);
			}//end if
		}//end func
	};
})(jQuery);
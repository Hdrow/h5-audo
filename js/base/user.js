//2015.7.16
var loop = new Loop({ keyname: 'loop_test', appkey: '', link: '' });
var iuser=importUser();

function importUser(){
	
	var user={};
	user.info={};
	
	user.init=function(callback) {
	    if(os.weixin){
			loop.login(function () {
			    loop.getuser(function (data) {
			    	initCallback(data,callback);
			    });
			});
		}//end if
		else{
			var data={headimage:'images/user.jpg',nickname:'user'};
			initCallback(data,callback);
		}//end else
	}//end func	
	
	function initCallback(data,callback){
		console.log('user info getted');
		icom.objectPrint(data);
		user.info=data;
		if(callback) callback(data);
	}//end func
	
	return user;
	
}//end func



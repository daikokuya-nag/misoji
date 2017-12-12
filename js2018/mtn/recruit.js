/*************************
求人 Version 1.0
2016 Jan. 25 ver 1.0
*************************/

/***** 初期化 *****/
jQuery(document).ready(function(){
});

$(window).load(function(){

	/***** 求人内容データの読み込み *****/
	getRecruitVal();
});


/********************
求人内容の読み込み
********************/
function getRecruitVal() {

var result;
var branchNo = $('#branchNo').val();

	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/getRecruitVal.php" ,
		data : {
			branchNo : branchNo
		} ,

		cache : false
	});

	result.done(function(response) {
					//console.debug(response);

		CKEDITOR.instances.recruitStr.setData(response);
	});

	result.fail(function(result, textStatus, errorThrown) {
					console.debug('error at getRecruitVal:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}

/********************
求人内容の出力
********************/
function writeRecruitVal() {

var result;
var branchNo = $('#branchNo').val();
var str = CKEDITOR.instances.recruitStr.getData();

	result = $.ajax({
		type : "post" ,
		url  : "../cgi2018/ajax/mtn/writeRecruitVal.php" ,
		data : {
			branchNo : branchNo ,
			str      : str
		} ,

		cache : false
	});

	result.done(function(response) {
					//console.debug(response);

	});

	result.fail(function(result, textStatus, errorThrown) {
					console.debug('error at writeRecruitVal:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}

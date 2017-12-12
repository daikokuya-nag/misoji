/*************************
料金表 Version 1.0
2016 Jan. 25 ver 1.0
*************************/

/***** 初期化 *****/
jQuery(document).ready(function(){
});

$(window).load(function(){

	/***** 料金表データの読み込み *****/
	getPriceVal();
});


/********************
料金表情報の読み込み
********************/
function getPriceVal() {

var result;
var branchNo = $('#branchNo').val();

	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/getPriceVal.php" ,
		data : {
			branchNo : branchNo
		} ,

		cache : false
	});

	result.done(function(response) {
					//console.debug(response);

		CKEDITOR.instances.systemStr.setData(response);
	});

	result.fail(function(result, textStatus, errorThrown) {
					console.debug('error at getPriceVal:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}

/********************
料金表情報の出力
********************/
function writePriceVal() {

var result;
var branchNo = $('#branchNo').val();
var str = CKEDITOR.instances.systemStr.getData();

	result = $.ajax({
		type : "post" ,
		url  : "../cgi2018/ajax/mtn/writePriceVal.php" ,
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
					console.debug('error at writePriceVal:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}

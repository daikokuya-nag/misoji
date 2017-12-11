/********************/
/* ログイン */
/********************/

/***** 初期化 *****/
jQuery(document).ready(function(){
});

$(window).load(function(){

	$("body").keypress(function(e){
		if(e.which == 13){
			$("#goLogin").click();
		}
	});
});


function login() {

var sess;
var goLogin = 0;

	$.ajax({
		type  : "get" ,
		url   : "../cgi2018/ajax/mtn/getSess.php" ,
		cache : false ,

		success : function(result) {
					console.debug(result);
			sess = result;
		} ,

		error : function(result) {
					console.debug('error at login:' + result);
		} ,

		complete : function(result) {
			loginA(sess);
		}
	});
}


function loginA(sess) {

	if(sess == SESS_NO_ID) {
		/* セッションデータナシ　ログイン画面へ */
					console.debug('セッションファイルナシ');
		goLogin = 1;
	}

	if(sess == SESS_OWN_TIMEOUT) {
		/* 自IDでタイムアウト　タイムアウトのダイアログ、ログイン画面へ */
						console.debug('自ID タイムアウト');
		goLogin = 1;
	}

	if(sess == SESS_OTHER_TIMEOUT) {
		/* 他IDでタイムアウト　ログイン画面へ */
						console.debug('他ID タイムアウト');
		goLogin = 1;
	}

	if(sess == SESS_OWN_INTIME) {
		/* 自IDでログイン中　メンテ画面へ */
						console.debug('自ID ログイン中');
		goLogin = 2;
	}

	if(sess == SESS_OTHER_INTIME) {
		/* 他IDでログイン中　「他でログイン中」のダイアログ、ログイン不可 */
						console.debug('他ID ログイン中');
		alert('他の端末からログインしているため、この端末からはログインできません。');
		goLogin = 1;
	}


	if(goLogin == 1) {
		//ログイン画面へ
		loginMain();
	}

	if(goLogin == 2) {
		location.href = 'index.php';
	}
}


function loginMain() {

			console.debug('loginMain');

var id2 = $('#id2').val();

var branchNo = $('#branchNo').val();

var retGroupNo = '';
var mtnMode    = '';

	$.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/login.php" ,
		data : {
			id2      : id2 ,
			branchNo : branchNo
		} ,

		cache : false ,

		success : function(result) {
					console.debug('ret' + result + '*');
			retGroupNo = result['GROUPNO'];
					console.debug(retGroupNo + '*');
		} ,

		error : function(result) {
					console.debug('error at login:' + result);
		} ,

		complete : function(result) {
			updSess(retGroupNo);
		}
	});

}

function updSess(groupNo) {

			console.debug('updSess');

var ret;

	$.ajax({
		type  : "get" ,
		url   : "../cgi2018/ajax/mtn/updSess.php" ,
		cache : false ,

		success : function(result) {
					console.debug(result);
			ret = result;
		} ,

		error : function(result) {
					console.debug('error at updSess:' + result);
		} ,

		complete : function(result) {
			if(groupNo.length >= 1) {
				location.href = 'index.php';
			}
		}
	});
}

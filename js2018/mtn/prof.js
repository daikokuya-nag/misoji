/*************************
プロファイル編集 Version 1.1
*************************/

var CURR_AREA_NO = 0;

/***** 初期化 *****/
jQuery(document).ready(function(){
});

$(window).load(function(){

	/***** 編集ダイアログの定義 *****/
	$("#editProfDlg").dialog({
		autoOpen: false ,
		modal : true ,
		width : 1220 ,		//1020
		buttons: [
			{
				text :"出力",
				click:function() {
					var chkEnter = checkProfEnter();
					if(chkEnter.length <= 0) {
						writeProfPreA();
					} else {
						alert(chkEnter);
					}
				}
			} ,
			{
				text :"キャンセル",
				click:function() {
					$(this).dialog("close");
				}
			}
		]
	});

	/***** プロファイルリストの読み込み *****/
	getProfileList();
});

/********************
プロファイルリストの読み込み
********************/
function getProfileList() {

var branchNo = $('#branchNo').val();
var result;


	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/getProfileList.php" ,
		data : {
			branchNo : branchNo
		} ,

		cache    : false ,
		dataType : 'json'
	});

	result.done(function(response) {
					//console.debug(response);

		$("#profSeqListH").html(response['SEQ']['title']);
		$("#profSeqListD").html(response['SEQ']['data']);
		$(".dispProfSW").toggleSwitch();

		/***** プロファイル表示順 *****/
		$("#profSeqList").tableDnD({

			onDragClass : "whileDrag" ,	//ドラッグ中の印

			onDrop: function(table, row) {
				profOrder = $.tableDnD.serialize();
						console.debug(profOrder);
							//writeProfOrder(profOrder);
				enableWriteProfSeq();
			}
		});

				/*
				$("#profListD").html(ret['FORNEWS']['data']);
				$("#profListFPD").html(ret['FORNEWS']['data']);
				*/
	});

	result.fail(function(result, textStatus, errorThrown) {
			console.debug('error at getProfileList:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}


/********************************************************************************/
/********************
新規プロファイル編集
********************/
function newProf() {

var branchNo = $('#branchNo').val();

var result;

	$('#newProf').val('new');

//	$('#enterProfN').css('display' ,'block');
//	$('#enterProfE').css('display' ,'none');
//	$('#delDir').css('display' ,'none');

	setShowProfDir('');

	$('#profDir').val('');

	$("input[name='newFace']").val(['N']);		/* 新人 ON */

	$('#profName'  ).val('');
	$('#profAge'   ).val('');
	$('#profHeight').val('');
	$('#profSize'  ).val('');

	$('#profZodiac').val('');
	$('#profBloodType').val('');

	$('input[name="seleWR"]').val(['']);

	$('#mastComment').val('');
	$('#appComment' ).val('');
	CKEDITOR.instances.mastComment.setData('');
	CKEDITOR.instances.appComment.setData('');

	$('#yoasobiDiaryURI'  ).val('');
	$('#heavennetDiaryURI').val('');

	$('input[name="photoUSE"]').val(['N']);

	$('#profPCode').val('');


	$('#qa1' ).val('');
	$('#qa2' ).val('');
	$('#qa3' ).val('');
	$('#qa4' ).val('');
	$('#qa5' ).val('');
	$('#qa6' ).val('');
	$('#qa7' ).val('');
	$('#qa8' ).val('');
	$('#qa9' ).val('');
	$('#qa10').val('');
	$('#qa11').val('');
	$('#qa12').val('');
	$('#qa13').val('');
	$('#qa14').val('');


var str = '無';
	$('#currF1').html(str);
	$('#currF2').html(str);
	$('#currF3').html(str);
	$('#currF4').html(str);
	$('#currF5').html(str);
	$('#currTN').html(str);
	$('#currML').html(str);

var chk = false;
	$("#useP1").prop("checked", chk);
	$("#useP2").prop("checked", chk);
	$("#useP3").prop("checked", chk);
	$("#useP4").prop("checked", chk);
	$("#useP5").prop("checked", chk);
	$("#useTN").prop("checked", chk);
	$("#useML").prop("checked", chk);

	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/getProfile.php" ,
		data : {
			branchNo : branchNo ,
			dir      : ''
		} ,

		cache    : false ,
		dataType : 'json'
	});

	result.done(function(response) {
					//console.debug(response);

		$('#profWorkDiff').html(response["workTag"]["workDiff"]);
		$('#profWorkList').html(response["workTag"]["workList"]);

		setProfArea('NEW');

		$("#editProfDlg").dialog( {
			title: '新規'
		});

		$("#editProfDlg").dialog("open");
	});

	result.fail(function(result, textStatus, errorThrown) {
			console.debug('error at newProf:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}


/********************
既存プロファイル編集
********************/
function editProf(dir) {

var branchNo = $('#branchNo').val();
var bVal;
var result;

	$('#newProf').val('edit');
	setShowProfDir(dir);

	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/getProfile.php" ,
		data : {
			branchNo : branchNo ,
			dir      : dir
		} ,

		cache    : false ,
		dataType : 'json'
	});

	result.done(function(response) {
					//console.debug(response);

		if(response['newFace'] == 'N') {
			$("#newFace").prop("checked", true);
		} else {
			$("#newFace").prop("checked", false);
		}

		$('#profName'  ).val(response['name']);
		$('#profAge'   ).val(response['age']);
		$('#profHeight').val(response['height']);
		$('#profSize'  ).val(response['sizes']);
		$('#profZodiac').val(response['zodiac']);
		$('#profBloodType').val(response['bloodType']);

		$('#mastComment').val(response['mastersComment']);
		$('#appComment' ).val(response['appealComment' ]);
		CKEDITOR.instances.mastComment.setData(response['mastersComment']);
		CKEDITOR.instances.appComment.setData(response['appealComment' ]);


		$('#qa1' ).val(response['QA1' ]);
		$('#qa2' ).val(response['QA2' ]);
		$('#qa3' ).val(response['QA3' ]);
		$('#qa4' ).val(response['QA4' ]);
		$('#qa5' ).val(response['QA5' ]);
		$('#qa6' ).val(response['QA6' ]);
		$('#qa7' ).val(response['QA7' ]);
		$('#qa8' ).val(response['QA8' ]);
		$('#qa9' ).val(response['QA9' ]);
		$('#qa10').val(response['QA10']);
		$('#qa11').val(response['QA11']);
		$('#qa12').val(response['QA12']);
		$('#qa13').val(response['QA13']);
		$('#qa14').val(response['QA14']);


		$('#profPCode').val(response['pcd']);

		$('#profWorkDiff').html(response["workTag"]["workDiff"]);
		$('#profWorkList').html(response["workTag"]["workList"]);


		bVal = response['B1'];
		if(bVal == null) {
			bVal = '';
		}
		$('input[name="profBA"]').val([bVal]);

		bVal = response['B2'];
		if(bVal == null) {
			bVal = '';
		}
		$('input[name="profBB"]').val([bVal]);

		bVal = response['B3'];
		if(bVal == null) {
			bVal = '';
		}
		$('input[name="profBC"]').val([bVal]);


			//$("#seleImgFile").prop('src' ,'fileSele.php?g=' + groupNo + '&b=' + branchNo + '&id=' + dir);

		setFileSeleVals(dir ,response['photo']);
		setProfArea('EDIT');

		$("#editProfDlg").dialog( {
			title: '編集 '	// + newsData['NO']
		});

		$("#editProfDlg").dialog("open");
	});

	result.fail(function(result, textStatus, errorThrown) {
			console.debug('error at editProf:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});
}

/*****
入力域の初期表示
*****/
function setProfArea(mode) {

var dispArea = ['none' ,'none' ,'none' ,'none'];
var btnDisp  = [false  ,false  ,false  ,false];

	if(mode == 'EDIT') {
		/* 既存女性の編集 */
		CURR_AREA_NO = 0;
	} else {
		/* 新規女性 */
		CURR_AREA_NO = 0;
	}

	dispArea[CURR_AREA_NO] = 'block';
	btnDisp[CURR_AREA_NO ] = true;


	/* 初期状態で表示するエリアのボタンをdisable */
	$('#showAreaBtn0').prop('disabled' ,btnDisp[0]);
	$('#showAreaBtn1').prop('disabled' ,btnDisp[1]);
//	$('#showAreaBtn2').prop('disabled' ,btnDisp[2]);
//	$('#showAreaBtn3').prop('disabled' ,btnDisp[3]);

	$('#profArea0').css('display' ,dispArea[0]);
	$('#profArea1').css('display' ,dispArea[1]);
//	$('#profArea2').css('display' ,dispArea[2]);
//	$('#profArea3').css('display' ,dispArea[3]);
}

/********************
入力域表示
********************/
function showArea(newAreaNo) {

var btnDisp = [false ,false ,false ,false];

	btnDisp[newAreaNo] = true;

var currID = '#profArea' + CURR_AREA_NO;
var newID  = '#profArea' + newAreaNo;

console.debug(currID + ' ' + newID);

	/* ボタン表示 */
	$('#showAreaBtn0').prop('disabled' ,btnDisp[0]);
	$('#showAreaBtn1').prop('disabled' ,btnDisp[1]);
//	$('#showAreaBtn2').prop('disabled' ,btnDisp[2]);
//	$('#showAreaBtn3').prop('disabled' ,btnDisp[3]);


	if(newAreaNo > CURR_AREA_NO) {
		/* 今より下を表示 */
		$(newID).slideToggle("slow");		/* 閉じる */
		$(currID).slideToggle("slow");		/* 開く */
			console.debug('↓' + currID + ' ' + newID);
	} else {
		/* 今より上を表示 */
		$(newID).slideToggle("slow");		/* 閉じる */
		$(currID).slideToggle("slow");		/* 開く */
			console.debug('↑' + currID + ' ' + newID);
	}
	CURR_AREA_NO = newAreaNo;
			console.debug('更新後:' + CURR_AREA_NO);
}


/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/




function writeProfOrder(profOrder) {

	$.ajax({
		type : "post" ,
		url  : "cgi/ajax/writeOrderDebug.php" ,
		data : {
			order : profOrder
		} ,

		cache    : false ,

		success : function(result) {
					console.debug(result);
		} ,

		error : function(result) {
					console.debug('error at writeProfOrder:' + result);
		} ,

		complete : function(result) {
					//console.debug(result);
		}
	});

}


/********************
iframe内の画像ファイルのアップロード
********************/
function imgFileUpload() {

var profDir = $('#profDir').val();
var newProf = $('#newProf').val();

			//console.debug('画像ファイルアップロード');

//	if(newProf == 'new') {
//		$('#seleImgFile').contents().find('#profDir').val(profDir);
//	}
//
//			//window.frames[0].document.forms[0].submit();
//	$('#seleImgFile').contents().find('#fileSelector').submit();
}




function setFileSeleVals(dir ,profData) {

var str;
var chk;
var show;

	show = profData['photoShow'];
	if(show == 'SHOW') {	//表示可
		str = 'O';
	}
	if(show == 'NG') {	//写真NG
		str = 'G';
	}
	if(show == 'NP') {	//準備中
		str = 'P';
	}
	if(show == 'NO') {	//写真なし
		str = 'N';
	}
	$('input[name="photoUSE"]').val([str]);


	str = setExistStr(profData['existF1']);
	$('#currF1').html(str);

	str = setExistStr(profData['existF2']);
	$('#currF2').html(str);

	str = setExistStr(profData['existF3']);
	$('#currF3').html(str);

	str = setExistStr(profData['existF4']);
	$('#currF4').html(str);

	str = setExistStr(profData['existF5']);
	$('#currF5').html(str);

	str = setExistStr(profData['existTN']);
	$('#currTN').html(str);

	str = setExistStr(profData['existML']);
	$('#currML').html(str);


	chk = setUseVal(profData['useF1']);
	$("#useP1").prop("checked", chk);

	chk = setUseVal(profData['useF2']);
	$("#useP2").prop("checked", chk);

	chk = setUseVal(profData['useF3']);
	$("#useP3").prop("checked", chk);

	chk = setUseVal(profData['useF4']);
	$("#useP4").prop("checked", chk);

	chk = setUseVal(profData['useF5']);
	$("#useP5").prop("checked", chk);

	chk = setUseVal(profData['useTN']);
	$("#useTN").prop("checked", chk);

	chk = setUseVal(profData['useML']);
	$("#useML").prop("checked", chk);
}


function setExistStr(extVal) {

var str;

	if(extVal == 'EXIST') {
		str = '有';
	} else {
		str = '無';
	}

	return str;
}

function setUseVal(useVal) {

var chk;

	if(useVal == 'U') {
		chk = true;
	} else {
		chk = false;
	}

	return chk;
}


function setShowProfDir(dir) {

	if(dir.length <= 0) {
		/***** 新規 *****/
		$('#enterProfN').css('display' ,'block');
		$('#enterProfE').css('display' ,'none');

		$('#delDirBtn').css('display' ,'none');
	} else {
		/***** 更新 *****/
		$('#enterProfN').css('display' ,'none');
		$('#enterProfE').css('display' ,'block');

		$('#delDirBtn').css('display' ,'inline');	//block
				//$('#delDir').css('display' ,'none');
	}
	$('#profDir').val(dir);
		//$('#profDirShow').val(dir);
	$('#profDirShow').html(dir);
}


/********************
プロファイルの内容チェック
********************/
function checkProfEnter() {

var newProf  = $('#newProf').val();

var groupNo  = $('#groupNo').val();
var branchNo = $('#branchNo').val();

var profDir  = $('#profDir' ).val();
var profName = $('#profName').val();

	/*** 出勤日/公休日 ***/
/*var profWRSele = WRSele;*/

		//var profWRDay = $('#profWRDay').val();

var ret = '';
var str = '';
var chkIDStr = '';

	if(newProf == 'edit') {
		/***** 編集 *****/
		if(profName.length <= 0) {
			str = str + '・名前\n';
		}

				/*
				if(profWRSele.length <= 0) {
					str = str + '・出勤/公休の選択\n';
				}
				*/

		if(str.length >= 1) {
			ret = '以下の項目が未入力です\n' + str;
		}
	} else {
		/***** 新規 *****/
		if(profDir.length <= 0) {
			/*** 識別子が未入力なら常にNG ***/
			str = str + '・識別子\n';

			if(profName.length <= 0) {
				str = str + '・名前\n';
			}

					/*
					if(profWRSele.length <= 0) {
						str = str + '・出勤/公休の選択\n';
					}
					*/

			if(str.length >= 1) {
				ret = '以下の項目が未入力です\n' + str;
			}
		} else {
			/*** 識別子に入力があるときは入力チェック ***/
			chkIDStr = checkID(profDir);
			if(chkIDStr.length <= 0) {
				//識別子の入力OK
				if(profName.length <= 0) {
					str = str + '・名前\n';
				}

						/*
						if(profWRSele.length <= 0) {
							str = str + '・出勤/公休の選択\n';
						}
						*/

				if(str.length >= 1) {
					ret = '以下の項目が未入力です\n' + str;
				}
			} else {
				//識別子の入力NG
				ret = chkIDStr;
			}
		}

	}


	return ret;
}


/********************
識別子の入力チェック
********************/
function checkID(profDir) {

var chk = profDir.match(/[^0-9a-zA-Z_]+/);

var chkResult;
var ret = "";

	if(chk) {
		/* 半角英数以外の文字があるとき */
		ret = "識別子は半角英数字のみを入力してください";
	} else {
		/* 半角英数のみのとき */
		chkResult = checkIDDir(profDir);
		if(chkResult == 'ALREADY') {
			ret = "指定された識別子は既に使われています";
		}
	}

	return ret;
}


function checkIDDir(profDir) {

var branchNo = $('#branchNo').val();
var result;
var chkResult = '';

	result = $.ajax({
		type : "get" ,
		url  : "../cgi2018/ajax/mtn/checkIDDir.php" ,
		data : {
			branchNo : branchNo ,
			profDir  : profDir
		} ,

		cache : false
	});

	result.done(function(response) {
					//console.debug(response);
		chkResult = response;
	});

	result.fail(function(result, textStatus, errorThrown) {
			console.debug('error at checkIDDir:' + result.status + ' ' + textStatus);
	});

	result.always(function() {
	});

	return chkResult;
}


/********************
HTMLファイル出力
********************/
function bldProfHTML(profDir) {

var groupNo  = $('#groupNo' ).val();
var branchNo = $('#branchNo').val();

	$.ajax({
		type :"post" ,
		url  :"cgi/ajax/bldProfHTML.php" ,
		data : {
			groupNo  :groupNo  ,
			branchNo :branchNo ,
			profDir  :profDir
		} ,

		cache    :false ,
//		dataType :'json' ,

		success :function(result) {
					console.debug(result);
			ret = result;
					//console.debug(ret['TITLE']);
		} ,

		error :function(result) {
					console.debug('error at bldProfHTML:' + result);
		}
	});
}


/*******************
識別子変更のpopupを表示
*******************/
function showEditDir() {

var currDir = $("#profDirShow").html();

//	$("#popup_overlay").css('display' ,'block');

	$("#newDir").val(currDir);
	$("#editDirDlg").css('display' ,'block');

					$("#editDirDlg").draggable({ handle: $("#popup_titleDir") });
					$("#popup_titleDir").css({ cursor: 'move' });



/*
$("BODY").append('\
\
\
							<div id="popup_container" class="ui-draggable" style="position: absolute; z-index: 999; padding: 0px; margin: 0px; min-width: 310px; max-width: 310px; top: 324px; left: 422.5px;">\
								<h1 id="popup_title" style="cursor: move;">Prompt Dialog</h1>\
								<div id="popup_content" class="prompt">\
									<div id="popup_message">\
										Type something:<br>\
										<input type="text" size="30" id="popup_promptA" name="popup_promptA" style="width: 220px;" value="aaabbbccc">\
<br>\
<textarea id="abc" name="abc" cols="60" rows="1" style="color:#ff0000;">dddeeefff</textarea>\
										<input type="checkbox" size="30" name="aaa" style="width: 220px;" onchange="alert(\'aa\')">\
<br>\
										<input type="radio" size="30" name="bbb" style="width: 220px;">\
										<input type="radio" size="30" name="bbb" style="width: 220px;">\
									</div>\
									<div id="popup_panel">\
										<input type="button" value="&nbsp;OK&nbsp;" id="popup_ok" onclick="alert(\'clicked ok\')">\
										<input type="button" value="&nbsp;Cancel&nbsp;" id="popup_cancel">\
									</div>\
								</div>\
							</div>\
						<div style="position: absolute; z-index: 998; top: 0px; left: 0px; width: 100%; height: 1214px; opacity: 0.01; background: rgb(255, 255, 255);"></div>\
\
');
*/


/*
$("BODY").append('\
						<div style="position: absolute; z-index: 998; top: 0px; left: 0px; width: 100%; height: 1214px; opacity: 0.01; background: rgb(255, 255, 255);"></div>\
\
');
*/


}

/*
$(document).ready( function() {

	$("#editDirBtn").click( function() {
		jPrompt('Type something:',
				'Prefilled valueあ',
				'Prompt Dialog',
				function(r) {
					if( r ) alert('You entered ' + r);
				});
		});
	});
*/


/*******************
識別子変更のpopupを非表示
*******************/
function hideEditDir() {

	$("#editDirDlg").css('display' ,'none');
}

/*******************
識別子変更の本体
*******************/
function updProfDir() {

var groupNo  = $('#groupNo').val();
var branchNo = $('#branchNo').val();

var newDir  = $("#newDir").val();			//更新後
var currDir = $("#profDirShow").html();		//更新前

var hideDlg = false;

	if(newDir != currDir) {
		chkIDStr = checkID(newDir)
		if(chkIDStr.length <= 0) {
			$.ajax({
				type :"post" ,
				url  :"cgiA/ajax/updProfDir.php" ,
				data : {
					groupNo  :groupNo  ,
					branchNo :branchNo ,
					old      :currDir  ,
					new      :newDir
				} ,

				cache    :false ,
//				dataType :'json' ,

				success :function(result) {
							console.debug(result);
					ret = result;
							//console.debug(ret['TITLE']);
				} ,

				error :function(result) {
							console.debug('error at updDir:' + result);
				} ,

				async :false
			});

			$("#seleImgFile").prop('src' ,'fileSele.php?g=' + groupNo + '&b=' + branchNo + '&id=' + newDir);

			showProfListAll();		//リスト再表示
			var bld = AL + ',' + RE;
			bldProfListHTML(bld);	//アルバムHTML、JSのファイル再出力

			$('#profDir').val(newDir);
			$('#profDirShow').html(newDir);

			bldProfHTML();			//プロファイルHTMLの再出力

			hideDlg = true;
		} else {
			alert(chkIDStr);
		}
	}

	if(hideDlg) {
		hideEditDir();
	}
}


/***********************************************************************************************************************/
/********************
削除
********************/
function cfmDelDir() {

/*
	jConfirm('消していいの？' ,'プロファイルの削除' ,function(r) {
		if(r==true){jAlert('OKをクリックしました。', '確認ダイアログ分岐後');}
		else{jAlert('Cancelをクリックしました。', '確認ダイアログ分岐後');}
	});
*/

	/*	$('.cfmDelPrompt').css('display' ,'block');	*/

	$('#DelDirDlg').css('display' ,'block');
}

/*******************
削除のpopupを非表示
*******************/
function hideDelDir() {

	$("#DelDirDlg").css('display' ,'none');
}

/*******************
削除の本体
*******************/
function delProfDir() {

var groupNo  = $('#groupNo').val();
var branchNo = $('#branchNo').val();

var currDir  = $("#profDirShow").html();

	$.ajax({
		type : "post" ,
		url  : "cgi/ajax/delProfDir.php" ,
		data : {
			groupNo  : groupNo  ,
			branchNo : branchNo ,
			dir      : currDir
		} ,

		cache    : false  ,
//		dataType : 'json' ,

		success : function(result) {
					console.debug(result);
			ret = result;
		} ,

		error : function(result) {
					console.debug('error at updDir:' + result);
		} ,

		complete : function(result) {
			showProfListAll();		//リスト再表示
			var bld = AL + ',' + RE;
			bldProfListHTML(bld);	//アルバムHTML、JSのファイル再出力

			$('#profDir').val('');
			$('#profDirShow').html('');

			hideDelDir();
			$("#editProfDlg").dialog("close");
		}
	});
}


/***********************************************************************************************************************/
/********************
全プロファイル一括更新
********************/
function updAllProf() {

var groupNo  = $('#groupNo').val();
var branchNo = $('#branchNo').val();

var profMax = 0;
var profDir = new Array();
var i;

	$.ajax({
		type :"get" ,
			/*url  :"cgi/ajax/getAllProf.php" ,*/
		url  : "cgi/ajax/getProfileList.php" ,
		data : {
			groupNo  :groupNo  ,
			branchNo :branchNo
		} ,

		cache    :false ,
		dataType :'json' ,

		success :function(result) {
					console.debug(result);
							/*
							profMax = result['profMax'];
							profDir = result['dirList'];
							*/
			profDir = result;
			profMax = profDir.length;
		} ,

		error :function(result) {
					console.debug('error at updAllProf:' + result);
		} ,

		complete : function(result) {

			if(profMax >= 1) {
				for(i=0 ;i<profMax ;i++) {
							/*updProf(groupNo ,branchNo ,profDir[i]);*/
					bldProfHTML(profDir[i]);
				}
				alert('全件出力完了');
			}

		}
	});

}

/*******************
HTMLファイル更新
*******************/
function updProf(groupNo ,branchNo ,profDir) {

	$.ajax({
		type :"post" ,
		url  :"cgiA/ajax/bldProfHTML.php" ,
		data : {
			groupNo  :groupNo  ,
			branchNo :branchNo ,
			profDir  :profDir
		} ,

		cache    :false ,
//		dataType :'json' ,

		success :function(result) {
					console.debug(result);
			ret = result;
					//console.debug(ret['TITLE']);
		} ,

		error :function(result) {
					console.debug('error at updProf:' + result);
		}
	});

}



/***********************************************************************************************************************/
/********************
表示順、表示/非表示更新時の出力
********************/
function updProfSeq() {

	updProfSeqPre();
}


/********************
表示順、表示/非表示更新時の出力
********************/
function updProfSeq2() {

	updProfSeqPre2();
}








/********************
「表示順反映」ボタンの有効化
********************/
function enableWriteProfSeq() {

	$("#bldProfList").prop('disabled' ,false);
}

/********************
「表示順反映」ボタンの有効化
********************/
function enableWriteProfSeq2() {

	$("#bldProfList2").prop('disabled' ,false);
}


/********************
サイトマップ出力
********************/
function bldProfSitemap() {

var groupNo  = $('#groupNo').val();
var branchNo = $('#branchNo').val();

	$.ajax({
		type :"post" ,
		url  :"cgiA/ajax/bldProfSitemap.php" ,
		data : {
			groupNo  :groupNo  ,
			branchNo :branchNo
		} ,

		cache    :false ,
//		dataType :'json' ,

		success :function(result) {
					console.debug(result);
			//ret = result;
					//console.debug(ret['TITLE']);
		} ,

		error :function(result) {
					console.debug('error at bldProfSiteMap:' + result);
		}
	});
}








/*****
出勤表入力域表示
*****/
function showWorkArea() {

//	/* ボタン切り替え */
//	$('#showBAreaBtn').css('display' ,'block');
//	$('#showWorkAreaBtn').css('display' ,'none');
//
//
//				//	$('#profileB').css('display' ,'none');
//				//	$('#profWorkListO').css('display' ,'block');
//
//	$('#profWorkListO').slideDown("slow");		/* 開く */
//	$('#profileB').slideUp("slow");				/* 閉じる */
}

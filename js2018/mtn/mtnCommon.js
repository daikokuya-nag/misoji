
	/***** 新着情報 *****/
var TAB_NEWS_HEIGHT;

	/***** プロファイル *****/
var TAB_PROF_HEIGHT;

	/***** 求人 *****/
var TAB_RECRUIT_HEIGHT;

	/***** システム *****/
var TAB_SYSTEM_HEIGHT;



$(document).ready(function(){

/*
	CKEDITOR.on('instanceReady', function(){
		$.each( CKEDITOR.instances, function(instance) {
			CKEDITOR.instances[instance].on("change", function(e) {
				for(instance in CKEDITOR.instances)
					CKEDITOR.instances[instance].updateElement();
			});

			CKEDITOR.instances[instance].on("blur", function(e) {
				for(instance in CKEDITOR.instances)
					CKEDITOR.instances[instance].updateElement();
			});
		});
	});
*/

	$("#tabA").tabs(
		{
			//heightStyle : "fill"
			activate : function(event, ui) {
				console.debug(ui.newPanel.selector);
				var selectedPanel = ui.newPanel.selector;
				if(selectedPanel == "#tabsNews") {
					if(TAB_NEWS_HEIGHT == 0) {
						setNewsTabHeight();
					}
				}
				if(selectedPanel == "#tabsProfile") {
					if(TAB_PROF_HEIGHT == 0) {
						setProfTabHeight();
					}
				}

				if(selectedPanel == "#tabsRecruit") {
					if(TAB_RECRUIT_HEIGHT == 0) {
						setRecruitTabHeight();
					}
				}
				if(selectedPanel == "#tabsSystem") {
					if(TAB_SYSTEM_HEIGHT == 0) {
						setSystemTabHeight();
					}
				}

			}

		}
	);

	/***** タブの中身調整 *****/

	/***** 高さの初期化 *****/
	/***** 新着情報 *****/
	TAB_NEWS_HEIGHT = 0;

	/***** プロファイル *****/
	TAB_PROF_HEIGHT = 0;

	/***** 求人 *****/
	TAB_RECRUIT_HEIGHT = 0;

	/***** システム *****/
	TAB_SYSTEM_HEIGHT = 0;

	setTabHeight();
	setTabBottom();

	setNewsTabHeight();
});


$(function() {
	/***** 新着情報一覧 *****/

	/***** プロファイル表示順 *****/
//	$("#profSeqList").tableDnD({
//		onDrop: function(table, row) {
//			profOrder = $.tableDnD.serialize();
//					console.debug(profOrder);
//			enableWriteProfSeq();
//		}
//	});
});




$(window).load(function(){

});


/***** 高さ調整 *****/
function setTabHeight() {
	$(".tabArea").height(700);
	$(".tabArea").css('overflow' ,'auto');
}

/***** 下ボタンの調整 *****/
function setTabBottom() {

var width = $(".tabArea").width();

	$(".tabBottomBtn").width(width + 'px');
}



/***** 新着情報パネルの高さ調整 *****/
function setNewsTabHeight() {

							//console.debug('set news tab height');
var areaH    = $("#tabsNews").height();			//領域の高さ
var areaTopH = $("#tabNewsTop").height();		//上ボタンの高さ
var areaBtmH = $("#tabNewsBottom").height();	//下ボタンの高さ

var height = areaH - (areaTopH + areaBtmH);

				//console.debug(areaH + ' ' + areaTopH + ' ' + areaBtmH + ' ' + height);
	$("#tabNewsMid").height(height + 'px');

	TAB_NEWS_HEIGHT = height;
}


/***** プロファイルパネルの高さ調整 *****/
function setProfTabHeight() {

							//console.debug('set prof tab height');
var areaH    = $("#tabsProfile").height();		//領域の高さ
var areaTopH = $("#tabProfTop").height();		//上ボタンの高さ
var areaBtmH = $("#tabProfBottom").height();	//下ボタンの高さ

var height = areaH - (areaTopH + areaBtmH);

				//console.debug(areaH + ' ' + areaTopH + ' ' + areaBtmH + ' ' + height);
	$("#tabProfMid").height(height + 'px');

	TAB_PROF_HEIGHT = height;
}


/***** 求人パネルの高さ調整 *****/
function setRecruitTabHeight() {

							//console.debug('set recruit tab height');
var areaH    = $("#tabsRecruit").height();		//領域の高さ
var areaTopH = $("#tabRecruitTop").height();	//上ボタンの高さ
var areaBtmH = $("#tabRecruitBottom").height();	//下ボタンの高さ

var height = areaH - (areaTopH + areaBtmH);

				//console.debug(areaH + ' ' + areaTopH + ' ' + areaBtmH + ' ' + height);
	$("#tabRecruitMid").height(height + 'px');

	TAB_RECRUIT_HEIGHT = height;

	//ckEditorの編集領域の高さの調整
var editTopH = $("#cke_recruitStr .cke_top").height();
var topPH    = $("#cke_recruitStr .cke_top").css("padding-top");
var topPB    = $("#cke_recruitStr .cke_top").css("padding-bottom");

var editBtmH = $("#cke_recruitStr .cke_bottom").height();
var btmPH    = $("#cke_recruitStr .cke_bottom").css("padding-top");
var btmPB    = $("#cke_recruitStr .cke_bottom").css("padding-bottom");

	topPH = parseFloat(topPH);
	topPB = parseFloat(topPB);

	btmPH = parseFloat(btmPH);
	btmPB = parseFloat(btmPB);

	height -= (editTopH + editBtmH + topPH + topPB + btmPH + btmPB + 7);

				//console.debug(editTopH + ' ' + editBtmH + ' ' + height);
	$("#cke_recruitStr .cke_contents").height(height + 'px');
}


/***** システムパネルの高さ調整 *****/
function setSystemTabHeight() {

							//console.debug('set system tab height');
var areaH    = $("#tabsSystem").height();		//領域の高さ
var areaTopH = $("#tabSystemTop").height();		//上ボタンの高さ
var areaBtmH = $("#tabSystemBottom").height();		//下ボタンの高さ

var height = areaH - (areaTopH + areaBtmH);

				//console.debug(areaH + ' ' + areaTopH + ' ' + areaBtmH + ' ' + height);
	$("#tabSystemMid").height(height + 'px');

	TAB_SYSTEM_HEIGHT = height;

	//ckEditorの編集領域の高さの調整
var editTopH = $("#cke_systemStr .cke_top").height();
var topPH    = $("#cke_systemStr .cke_top").css("padding-top");
var topPB    = $("#cke_systemStr .cke_top").css("padding-bottom");

var editBtmH = $("#cke_systemStr .cke_bottom").height();
var btmPH    = $("#cke_systemStr .cke_bottom").css("padding-top");
var btmPB    = $("#cke_systemStr .cke_bottom").css("padding-bottom");

	topPH = parseFloat(topPH);
	topPB = parseFloat(topPB);

	btmPH = parseFloat(btmPH);
	btmPB = parseFloat(btmPB);

	height -= (editTopH + editBtmH + topPH + topPB + btmPH + btmPB + 7);

				//console.debug(editTopH + ' ' + editBtmH + ' ' + height);
	$("#cke_systemStr .cke_contents").height(height + 'px');
}

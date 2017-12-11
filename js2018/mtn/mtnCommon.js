var newsOrder = '';	// = new Array();
var profOrder = '';

var newsOrder1 = new Array();


$(function() {
	/***** 新着情報一覧 *****/
/*
	$("#newsList").tableDnD({
		onDrop: function(table, row) {
			newsOrder = $.tableDnD.serialize();
			alert(newsOrder);
		}
	});
*/


	$("#tabA").tabs();

	/***** プロファイル表示順 *****/
	$("#profSeqList").tableDnD({
		onDrop: function(table, row) {
			profOrder = $.tableDnD.serialize();
					console.debug(profOrder);
			enableWriteProfSeq();
		}
	});



/*
	$("#button").button();
	$("#radioset").buttonset();

	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Ok",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
*/

	// Link to open the dialog
/*
	$( "#dialog-link" ).click(function( event ) {
		$( "#dialog" ).dialog( "open" );
		event.preventDefault();
	});
*/

	// Hover states on the static widgets
/*
	$( "#dialog-link, #icons li" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);
*/

});

/*
$(document).ready(function () {
	$(".dispProfSW").toggleSwitch();
	$(".dispNewsSW").toggleSwitch();
});
*/

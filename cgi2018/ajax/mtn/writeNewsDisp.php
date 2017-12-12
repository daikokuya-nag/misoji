<?php
/********************
ニュースの表示可否の出力 Version 1.0
PHP5
2016 Feb. 29 ver 1.0
********************/
	session_start();

	require_once dirname(__FILE__) . '/../../db/dbNews5C.php';

	$news = new dbNews5C();
	$dispCnt = $news->updDisp($_POST);

	print $dispCnt;
?>

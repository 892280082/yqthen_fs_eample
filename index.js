/**
 * @desc 给余群的下载程序
 * @auther yq
 * @date 2016/5/11
 * @API
 * @--------------------------------------------------------------
 * 1.								
 * @--------------------------------------------------------------
 */
var then = require('yqthen');
var xlsx = require('node-xlsx');
var node_path = require('path');
var _ =require('underscore');
var yqfs = require('yqfs');
var main = require('./lib/main');
var logUtil = require('./lib/logUtil');


var excelFile = node_path.join(__dirname,'./excel');
var RUNTIME_PATH = node_path.join(__dirname,'./runtime');

//程序启动改代码
main.downLoad(excelFile,RUNTIME_PATH,(err)=>{
	logUti.over();
	logUti.showErrorLog();
});


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

_readFileParallel = 2;//同时下载的文件个数
_eachFileParallel = 2;//每个excel文件  同时下载sheet的个数（同时下载几页）
_downUrlParamllel = 20;//每个sheet 同时下载的url个数

//总的下载并发数为 _readFileParallel*_eachFileParallel*_downUrlParamllel = 2*2*20;
//并发数可以根据自己的带宽调整，过大的并发也是没有意义的。

//程序启动改代码
main.downLoad(excelFile,RUNTIME_PATH,(err)=>{
	logUti.over();
	logUti.showErrorLog();
});

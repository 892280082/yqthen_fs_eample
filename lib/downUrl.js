var request = require('request');
var node_path =require('path');
var fs =require('fs');
var then = require('yqthen');


var url = 'http://120.55.115.29:80/monitor/20160420/20160420-13671717697-8000034-7153-1461144739.244819.wav';

var filePath = node_path.join(__dirname,'test.wav');


/**
 * 下载文件
 * @param  {String}   url      下载url路径
 * @param  {String}   dirname  下载目录
 * @param  {Function} callback call(err)
 */
var downFileByUrl = (url,dirname,callback)=>{
	var fileName = url.split('/').pop();
	var targetPath = node_path.join(dirname,fileName);

	request(url,(req,res,body)=>{
		callback(null);
	}).pipe(fs.createWriteStream(targetPath));
};






exports.downFileByUrl = downFileByUrl;
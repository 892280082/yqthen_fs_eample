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
var parseExcel = require('xls-to-json');
var xlsx = require('node-xlsx');
var node_path = require('path');
var _ =require('underscore');
var yqfs = require('yqfs');
var downUrl = require('./downUrl');
var logUtil =require('./logUtil');

/**
 * 根据每个file文件下载录音
 * @param  {Object}   解析后的excle对象 excel对象
 * @param  {String}   excelFilePath excel文件路径
 * @param  {String}   runtimeDir    项目生成目录
 * @param  {Function} callback      call(err)
 */
exports.getMavForFile = (list,excelFilePath,runtimeDir,callback)=>{
		//excel文件路径

	var fileName = node_path.basename(excelFilePath,'.xlsx');
	//当前文件目录
	var fileNameDir = node_path.join(runtimeDir,fileName);

	then
	((next)=>{
		yqfs.checkAndCreateDir(runtimeDir,(err)=>{
			next(err);
		});
	})
	.then((next)=>{
		yqfs.checkAndCreateDir(fileNameDir,(err)=>{
			next(err);
		});
	})
	.each(list,(defer,value)=>{
		var fileDir = node_path.join(fileNameDir,value.name) ;
		var urls = value.data;

		then((next)=>{
			yqfs.checkAndCreateDir(fileDir,(err)=>{
				next(err);
			});
		}).each(urls,(next,value)=>{

			downUrl.downFileByUrl(value[0],fileDir,(err)=>{
				logUtil.showProgress();
				if(err){
					logUtil.addError(err);
				}
				next();
			});

		},20)
		.done((err)=>{
			defer(err);
		});

	},2)
	.done((err)=>{
		callback(err);
	});
};



exports.downLoad = (excelPath,runtimePath,callback)=>{
	var excelFiles;
	then((next)=>{
		yqfs.getDirRecurFiles(excelPath,(err,files)=>{
			excelFiles = _.map(files, function(value ){
				if(node_path.extname(value) === '.xlsx'){
					return {
						excelPath:value,
						excel:xlsx.parse(value)
					}
				}
			});
			next(err);
		});
	})
	.then((next)=>{
		//统计
		logUtil.print(0,'共查询'+excelFiles.length+'文件');

		_.each(excelFiles, function(value){
			logUtil.print(0,'文件路径:'+value.excelPath);
		});

		var totalSize = _.reduce(excelFiles, function(memo,value){

			return memo += _.reduce(value.excel, function(memo, value){
				
					return memo+=value.data.length;
				
				}, 0);
		
		}, 0);

		logUtil.setTotalSize(totalSize);

		logUtil.print(0,'共有'+totalSize+'个音频');

		next(null,excelFiles);
	})
	.each((next,value)=>{
		exports.getMavForFile(value.excel,value.excelPath,runtimePath,(err)=>{
			if(err){
				logUtil.addError(err);
			}
			next();
		});
	},2)
	.then((next)=>{
		logUtil.print(0,'操作结束');
	}).fail((next,err)=>{
		logUtil.print(2,'操作错误'+err);
	});
};




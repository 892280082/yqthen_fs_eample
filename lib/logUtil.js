var totalSize = 0;
var count = 0;

var erros  = [];


exports.setTotalSize = (total)=>{
	totalSize = total;
};

exports.addTotalSize = (total)=>{
	totalSize += total;
};


exports.print = function(code,err){
	var args = Array.prototype.slice.call(arguments);
	var tempCode = args.shift();
	switch(tempCode)
	{
		case 0: args.unshift("SYSTEM_LOG---->");break;
		case 1: args.unshift("SYSTEM_WARN---->");break;
		case 2: args.unshift("SYSTEM_ERROR---->");break;
	}
	console.log.apply(console,args);
};

exports.addError = (err)=>{
	erros.push(err);
};

exports.showErrorLog = ()=>{
	exports.print(2,'共有'+erros.lenth+'个错误');
	erros.forEach((err,index)=>{
		console.log('-------------------'+(index+1)+'---------------------');
		console.log(err);
	});
};

exports.showProgress = ()=>{
	exports.print(0,"已完成"+ (Math.round(++count / totalSize * 10000) / 100.00 + "%"));
};

exports.over = ()=>{
	exports.print(0,'---------------------程序运行结束-----------------------------');
};


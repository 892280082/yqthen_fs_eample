# yqthen_fs_eample
###需求描述：读取excel目录下所有的excel文件，根据excel内容下载网上资料.
###这里将node的优势，展现的淋漓尽致，简单的代码能写出媲美多线程的能力。其实是帮我朋友写的一个程序，嘿嘿。

###安装依赖
```js
npm install
```

###运行
```js
node index
```
##可以非常方便的控制各处的并发数 ,用全局变量只是方便演示
1. _readFileParallel = 2;//同时读取的文件个数
2. _eachFileParallel = 2;//每个excel文件  同时下载sheet的个数（同时下载几页）
3. _downUrlParamllel = 20;//每个sheet 同时下载的url个数

###总的下载并发数为3个参数的乘积
###并发数可以根据自己的带宽调整，过大的并发也是没有意义的。

###希望js能发展的越来越好。
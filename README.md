# user-login-demo

技术栈：react+dva+antD

根据项目需要，初步学习了下react框架。上述demo是利用dva框架和antD的UI组件库

dva是一个基于 react 和 redux 的轻量应用框架，它最大的特性就是把一个路由下的state、reducer、sagas 写到一块了，每个路由下都有一个model，这个model掌管这个路由的所有状态（action、state、reducer、sagas），组件想改变状态dispatch type名字就行了。具体可以学习[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)和[dva值得一试](https://segmentfault.com/a/1190000011523348)，可参考[dva学习指南](https://www.jianshu.com/p/16b8c6abcc0f)

antD的学习可以具体参考[官网](https://ant.design/index-cn)

下面具体介绍下新建一个页面的具体操作

1. 在src/pages/中以模块名（小写）建立一个文件夹，中间包括了component、models、services文件夹和.js文件。

![image](https://user-images.githubusercontent.com/26807227/42788910-e7bc699e-8994-11e8-90ab-63e567cc7143.png)

##  用途
    主要用于添加版权注释

### 全局添加脚本注释如何使用?
    用于处理所有的文件
    1.fileScript.js  放置于需要处理的项目build目录下(fileScript能处理的文件类型详见注意事项)   
    2.在webpack.dev.conf.js(也就是开发环境的文件配置项处),引入require('./fileScript')
    2.以vue-cli默认运行为例: 执行命令 npm run dev
    3.稍等几秒查看文件便生效
    或者放置于build目录下直接node执行本文件

### 注意事项
    1.全局添加脚本
    排除的根目录文件夹有 mchtH5|node_modules|dist
    目前匹配类型文件有.css|.js$|.scss|.less|.html|.vue
    其他可自行添加fileScript



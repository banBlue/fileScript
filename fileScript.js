// 筛选出需要处理文件的后缀名
const reMatch = /.css$|.js$|.scss$|.less$|.html$|.vue$/ 

// 需要添加的注释
// 匹配 /* */注释类型的文件
const re1 = /.css|.js|.scss|.less/ 
// 匹配 <!--  -->注释类型的文件
const re2 = /.html|.vue/ 

// 排除不需要的目录
const noReMatch = /node_modules|mchtH5|dist/

// 注释模板
const noteTypes = {
  noteTemp1 : `778`,
  noteTemp2 : `99999`
}

// -------------------------- // 

const fs = require('fs');
const path = require('path')

/*找出符合条件的文件
*@method checkHandle
*@param{String}参数1 项目的根路径
*@return {Array} 返回文件路径的集合
*/
function checkHandle(dir) {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach(function(file) {      
      if (noReMatch.test(file)) return 
      file = dir + '/' + file
      let stat = fs.statSync(file)
      if (stat && stat.isDirectory()) {
        results = results.concat(checkHandle(file))
      } else {// 所有符合的后缀名        
        if (reMatch.test(path.extname(file))) {
            results.push(path.resolve(__dirname,'..' ,file))
        }
      }
  })
  return results
}

/*给文件添加注释
*@method crHandle
*@param{Array}参数1 文件路径
*/
function crHandle(arr) {
  let index = 0
  arr.forEach(filepath => {
      let str
      let fileStr = fs.readFileSync(filepath, 'utf-8')
      //用于判断是否有加过版权注释
      if(fileStr.includes('Copyright (C)')) return

      if(re1.test(filepath)) {
        str = noteTypes.noteTemp1
      } else if (re2.test(filepath)) {
        str = noteTypes.noteTemp2
      }
      // 打印出数量及文件名
      console.log(`${++index}---------------`,filepath)
      str += fileStr
      fs.writeFileSync(filepath, str)
  })
}
// 执行函数
crHandle(checkHandle(path.resolve(__dirname,'..')))
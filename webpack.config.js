const path = require('path')

module.exports = {
    mode: 'production',//打包环境
    entry: './src/App.js', //打包入口文件
    output: {
        filename: 'bundle.js',//打包输出的文件
        path: path.resolve(__dirname, 'dist') //打包文件放入的文件夹
    }
}

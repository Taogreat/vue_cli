const path=require("path")
const HtmlWebpackPlugin=require('html-webpack-plugin')





module.exports={
    // 模式
    //mode:"production", development

    // 入口
    entry:{
        app:path.resolve(__dirname,"src/index.js")
    },
    // 出口
    output:{
        filename:'static/js/[name].bundle.js',
        path:path.resolve(__dirname,"dist")
    },
    //模块加载器
    module: {
        rules: [
            // 编译ES6
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname,"src"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //编译css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
            },
            //编译图片
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
              }
        ]
      },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            template:'index.html',
            filename:'index.html'
        })
    ],

    //开发服务器
    devServer: {
        open: true, // 自动打开浏览器
        port: 8080, // 指定启动服务器的端口号
        quiet:false,//不输出太多日志
        stats: 'errors-only', // 只输出错误日志
    },

    //配置开启source-map调试，可以找到错误在哪一行 好像默认已经开启
    devtool: 'cheap-module-eval-source-map',
}
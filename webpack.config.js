const path=require("path")
const HtmlWebpackPlugin=require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


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
            {
                test: /\.vue$/,
                include: path.resolve(__dirname,"src"), // 只对src下的vue文件处理
                loader: 'vue-loader'
              },
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
                use: ['vue-style-loader', 'css-loader'],
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
        }),
        new VueLoaderPlugin()
    ],

    //开发服务器
    devServer: {
        open: true, // 自动打开浏览器
        port: 8080, // 指定启动服务器的端口号
        quiet:false,//不输出太多日志
        //stats: 'errors-only',  只输出错误日志
    },

    //配置开启source-map调试，可以找到错误在哪一行 好像默认已经开启
    devtool: 'cheap-module-eval-source-map',

    //引入模块解析
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
        alias: { // 路径别名(简写方式)
            'vue$': 'vue/dist/vue.esm.js',  // 如果是引入'vue', 加载带编译的版本
            '@':path.resolve(__dirname,"src")
        }
    }
}
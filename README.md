## 1. 初始化项目
    1). 生成package.json
        npm init -y
    
    2). 创建入口js: src/index.js
        console.log('Hello Webpack!')
        document.getElementById('root').innerHTML = '<h1>Hello222</h1>'
    
    3). 创建页面文件: public/index.html
        <div id="root"></div>

## 2. webpack基本使用
    1). 下载依赖包
        npm remove webpack webpack-cli -g
        npm install -D webpack webpack-cli
        npm install -D html-webpack-plugin
    
    2). 创建webpack配置: webpack.config.js
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')
    	
		function resolve(dir) {
		  return path.resolve(__dirname, dir)
		}
        module.exports = {
          // 模式: 生产环境
          // mode: 'production',

          // 入口
          entry: {
            app: resolve('src/index.js')
          },
          // 出口(打包生成js)
          output: {
			path: resolve('dist'),
            filename: 'js/[name].bundle.js',
          },
          // 模块加载器
          module: {
            rules: [
    
            ]
          },
          // 插件
          plugins: [
            new HtmlWebpackPlugin({
              template: 'public/index.html',
              filename: 'index.html'
            })
          ]
        }
    
    3). 生成环境打包并运行
        配置打包命令:  "build": "webpack --mode production"
        打包项目: npm run build
        运行打包项目: serve dist  (第一次全局下载serve: npm install -g serve)

## 3. 开发环境运行
    1). 现在的问题:
        每次修改项目代码后, 必须重新打包, 重新运行
    
    2). 下载依赖包
        npm install -D webpack-dev-server
    
    3). 配置开发服务器
        devServer: {
	      open: true, // 自动打开浏览器
	  	  port: 8080, // 指定启动服务器的端口号
	      stats: 'errors-only', // 只输出错误日志
	    },
    
    4). 配置开启source-map调试
        devtool: 'cheap-module-eval-source-map',
    
    5). 开发环境运行
        配置命令: "dev": "webpack-dev-server --mode development"
        执行命令: npm run dev

## 4. 打包处理 ES6/CSS/图片
    1). 处理ES6
        a. 下载依赖包
            npm install -D babel-loader @babel/core @babel/preset-env
    	b. 配置
            {
              test: /\.js$/,
              //exclude: /(node_modules|bower_components)/,
              include: resolve('src'),
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
    	c. 理解babel的plugin与preset
    		babel本身不编译ES6的语法
    		babel需要基于它的plugin来做ES语法的编译
    		每个语法都一个对应的babel plugin来编译对应的语法
    		一个babel preset包是包含多个常用的babel plugin的集合包
    		好处: 便于管理, 简化配置
    
    2). 处理CSS
        a. 下载依赖包
            npm install -D css-loader style-loader
        b. 配置
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
            }
    
    3). 处理图片
        a. 下载依赖包
            npm install -D url-loader@2.3.0 file-loader@4.3.0
        b. 配置
            {
              test: /\.(png|jpe?g|gif|svg)$/,
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: 'img/[name].[ext]' // 相对于output.path
              }
            }
    4). 测试
        a. 添加图片: src/assets/imgs/logo.png
        b. 添加css: src/assets/css/my.css
            img {
              width: 200px;
              height: 200px;
            }
        c. index.js
            import logo from './assets/imgs/logo.png'
            import  './assets/css/my.css'
    
            const image = new Image()
            image.src = logo
            document.body.appendChild(image)
            document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

## 5. 搭建vue的环境
    0). 文档:
        https://vue-loader.vuejs.org/zh/
    
    1). 下载依赖包:
        npm install -S vue
        npm install -D vue-loader vue-template-compiler
    
    2). 配置
        const VueLoaderPlugin = require('vue-loader/lib/plugin')
    
        {
          test: /\.vue$/,
          include: resolve('src'), // 只对src下的vue文件处理
          loader: 'vue-loader'
        }
    
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        }
    
        new VueLoaderPlugin()
    
        // 引入模块的解析
        resolve: {
          extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
          alias: { // 路径别名(简写方式)
            'vue$': 'vue/dist/vue.esm.js',  // 如果是引入'vue', 加载带编译的版本
			      '@': resolve('src'),
            '@components': resolve('src/components')
          }
        }
    
    3). 编码: 
        src/index.js
        src/App.vue
        src/components/App.vue

## 6. 解决开发环境ajax请求跨域问题
    1). 利用webpack-dev-server进行请求代理转发
        webpack-dev-server内部利用http-proxy-middle包对特定请求进行转发操作
    2). 配置:
        devServer: {
          proxy: {
            // 处理以/api开头路径的请求
            // '/api': 'http://localhost:4000'
            '/api': {
              target: 'http://localhost:4000', // 转发的目标地址
              pathRewrite: {
                '^/api' : ''  // 转发请求时去除路径前面的/api
              },
              changeOrigin: true, // 支持跨域
            }
          }
        }

## 7. 配置async/await的编译环境
    1). 下载包
        npm install @babel/polyfill
    2). 配置
        entry: {
          xxx: ['@babel/polyfill', resolve('src/index.js')]
        },

## 8. 解决引入Element-UI无法打包font文件的问题  
    1). 原因:
        没有配置url-loader处理font类型文件
    2). 在webpack.config.js中配置:
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          ]
        },

## 9. 解决history模式路由请求404的问题
    devServer: historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    output: publicPath: '/', // 引入打包的文件时路径以/开头




## 10.区分使用开发环境和生产环境
    使用生产环境：
      npm run build ==> webpack
      1).在内存中进行编译打包，生成内存中的打包文件
      2).保存到本地(在本地生成打包文件)   ===> 此时不能通过浏览器来访问，需要启动服务器运行
    使用开发环境：
      npm run dev ==> webpack-dev-server
      1).在内存中进行编译打包，生成内存中的打包文件
      2).使用服务器，运行内存中的打包文件   ===> 可以通过浏览器来访问虚拟路径



## 11.vue样式不显示问题
    网上找到的解释及解决方案
    环境
      vue-cli 4.4.6
      css-loader 4.2.1
      vue-style-loader 4.1.2
    原因
      vue-cli 4.4.6
        vue-cli 4.4.6默认对css-loader配置为空

      css-loader 4.2.1
        css-loader4.0后默认对esModule设置的是true

      vue-style-loader 4.1.2
        vue-style-loader 4.1.2默认接收的是commonjs的结果，也就是默认接收的是“css-loader中esModule设置的是false的结果”，
        所以一个配置的是true，一个接收的是false，最终就不会显示样式了。
    方案
      1).在项目的vue.config.js中对css的esModule改成false
          module.exports = {
            ...
            css: {
              ...
                esModule: false
            }
            ...
          }
      2).修改vue-style-loader的源码
          vue-style-loader/index.js:
          var shared = [
            '// style-loader: Adds some css to the DOM by adding a <style> tag',
            '',
            '// load the styles',
            'var content = require(' + request + ').default;', //这里加一个.default即可
            ...
      3).修改css-loader源码，让esModule默认为false
          css-loader/dist/utils.js
          function normalizeOptions(rawOptions, loaderContext) {
            if (rawOptions.icss) {
              loaderContext.emitWarning(new Error('The "icss" option is deprecated, use "modules.compileType: "icss"" instead'));
            }
            const modulesOptions = getModulesOptions(rawOptions, loaderContext);
            return {
              url: typeof rawOptions.url === 'undefined' ? true : rawOptions.url,
              import: typeof rawOptions.import === 'undefined' ? true : rawOptions.import,
              modules: modulesOptions,
              // TODO remove in the next major release
              icss: typeof rawOptions.icss === 'undefined' ? false : rawOptions.icss,
              sourceMap: typeof rawOptions.sourceMap === 'boolean' ? rawOptions.sourceMap : loaderContext.sourceMap,
              importLoaders: rawOptions.importLoaders,
              esModule: typeof rawOptions.esModule === 'undefined' ? false : rawOptions.esModule //默认改成false
            };
          }
      
    使用style-loader时不用改css-loader最新版本已经改为了false不会有问题了，但使用vue-style-loader还是需要改源码
    
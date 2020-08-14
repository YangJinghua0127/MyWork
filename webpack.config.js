const path = require("path");
//为了能够分离说html代码文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

//为了能够在下次打包之前清理build目录的文件，防止文件叠加。
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//将css代码从js代码中分离出来，就节约了代码打包压缩的时间
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//js压缩插件
const uglify = require('uglifyjs-webpack-plugin');

//OptimizeCSSAssetsPlugin是给css代码进行压缩的plugin
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


var CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require("webpack");

//这个插件会清晰的展示出打包后的各个bundle所依赖的模块：
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    //入口文件
    entry: {
        index: './src/js/index.js',
        login: "./src/js/login.js",
        register: "./src/js/register.js",
        car: "./src/js/car.js",
        detals: "./src/js/detals.js"
    },
    //输出文件和位置
    output: {
        filename: "./js/[name].js",
        path: path.resolve(__dirname, "./build")
    },
    //打包的依赖模块
    module: {
        rules: [
            //打包css
            {
                test: /\.css$/,
                use: [
                    // { loader: 'style-loader' },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3
                        }
                    },
                    { loader: 'postcss-loader' }

                ]
            },
            //打包scss
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    { loader: 'postcss-loader' }
                ]
            },
            //打包html
            {
                test: /\.(html|htm)$/i,
                loader: "html-withimg-loader"

            },
            //打包js
            {
                test: /.js$/i,
                loader: "url-loader",
                loader: "babel-loader?cacheDirectory", //loader的cacheDirectory选项，开启后用缓存，提升打包速度
                exclude: /node_modules/, //排除
                include: /src/ // 只转化src目录下的js
            },
            //字体图标
            {
                test: /\.(ttf|woff|svg|eot)$/i,
                loader: 'file-loader',
                options: {
                    limit: 20 * 1024,
                    name: '[name].[ext]?[hash:10]',
                    outputPath: "./iconfont/"
                }
            },
            //打包 处理css js中的图片
            {
                test: /\.(jpg|jpeg|png|gif|mp4|webp)$/i,
                loader: "url-loader",
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    esModule: false,
                    outputPath: "./images/"  //输出到指定目标
                }
            }
        ]
    },
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        contentBase: "./build/",
        //跨域代理
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',//打包后的文件名
            minify: {//对html文件进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            chunks: ['index'],//每个html只引入对应的js和css
            inject: "body",
            hash: true, //避免缓存js。
            template: './src/index.html' //打包html模版的路径和文件名称
        }),

        new HtmlWebpackPlugin({
            filename: 'login.html',//打包后的文件名
            minify: {//对html文件进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            chunks: ['login'],//每个html只引入对应的js和css
            inject: "body",
            hash: true, //避免缓存js。
            template: './src/login.html' //打包html模版的路径和文件名称
        }),
        new HtmlWebpackPlugin({
            filename: 'register.html',//打包后的文件名
            minify: {//对html文件进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            chunks: ['register'],//每个html只引入对应的js和css
            inject: "body",
            hash: true, //避免缓存js。
            template: './src/register.html' //打包html模版的路径和文件名称
        }),
        new HtmlWebpackPlugin({
            filename: 'car.html',//打包后的文件名
            minify: {//对html文件进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            chunks: ['car'],//每个html只引入对应的js和css
            inject: "body",
            hash: true, //避免缓存js。
            template: './src/car.html' //打包html模版的路径和文件名称
        }),
        new HtmlWebpackPlugin({
            filename: 'detals.html',//打包后的文件名
            minify: {//对html文件进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            chunks: ['detals'],//每个html只引入对应的js和css
            inject: "body",
            hash: true, //避免缓存js。
            template: './src/detals.html' //打包html模版的路径和文件名称
        }),

        new CopyWebpackPlugin({
            patterns: [
              { from: './src/images', to: 'images' },
            //   { from: 'other', to: 'public' },
            ],
          }),
        new CleanWebpackPlugin(),
        // 分离css
        new MiniCssExtractPlugin({
            filename: path.join('./css/[name].css'),
            chunkFilename: '[id].css'
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    // 不生成内联映射,这样配置就会生成一个source-map文件
                    inline: false,
                    // 向css文件添加source-map路径注释
                    // 如果没有此项压缩后的css会去除source-map路径注释
                    annotation: true
                }
            }
        }),
        //压缩js
        new uglify({
            cache: false,//启用文件缓存
            parallel: true,//使用多进程并行运行来提高构建速度
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }), //限制块的总数
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }), //限制一块的最小容量
        //查看打包的依赖关系 
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            // chunks: 'async',
            chunks: 'initial',
            minSize: 30000,
            //表示被引用次数，默认为1；上述配置commons中minChunks为2，表示将被多次引用的代码抽离成commons。
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为 5；
            maxAsyncRequests: 5,
            //最大的初始化加载次数，默认为 3；
            maxInitialRequests: 3,
            //抽取出来的文件的自动生成名字的分割符，默认为 ~；
            automaticNameDelimiter: '~',
            //抽取出来文件的名字，默认为 true，表示自动生成文件名；
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }

            }
        }
    }

    , mode: "development",
    devtool: 'cheap-module-eval-source-map'
    //sourceMap越详细打包越慢，所以我们用到最合适的sourceMap去影响打包速度。
    // devtool: inline-source-map 不会生成map文，会提示到列
    // devtool: cheap: 不会提示到列，只会提示业务代码，不提示第三方插件的代码
    // devtool: module: 会提示第三方插件，如loader，plugin
    // devtool: eval: 打包最快，但是提示比较少
    // 建议：
    //production环境下使用：devtool: 'cheap-module-source-map'
    //development环境下使用：devtool: 'cheap-module-eval-source-map'
}

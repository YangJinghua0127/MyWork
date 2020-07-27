const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const webpack =require("webpack");

module.exports = {
    entry: {
        index: './src/js/index.js',
        login: "./src/js/login.js",
        register: "./src/js/register.js",
        car: "./src/js/car.js"
    },
    output: {
        filename: "./js/[name].js",
        path: path.resolve(__dirname, "./build")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(html|htm)$/i,
                loader: "html-loader"
            },
            {
                //排除
                exclude: /\.(css|sass|scss|js|html|htm|jpg|jpeg|png|gif)$/i,
                loader: 'file-loader',
                options: {
                    limit: 10 * 1024,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                loader: "url-loader",
                options: {
                    limit: 10 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: "./images/"
                }
            }
        ]
    },
    devServer: {
        port: 8081,
        open: true,
        contentBase: "./build/"
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
            // inject: true,
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
            // inject: true,
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
            // inject: true,
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
            // inject: true,
            hash: true, //避免缓存js。
            template: './src/car.html' //打包html模版的路径和文件名称
        }),
        new CleanWebpackPlugin({}),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]

    , mode: "development"
}
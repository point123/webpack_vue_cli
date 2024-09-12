const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/assets/[hash:10][ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: "asset",
                generator: {
                    filename: "static/images/[hash:10][ext][query]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new EslintWebpackPlugin({
            configType: "flat",
            context: path.resolve(__dirname, "../src"),
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
            eslintPath: "eslint/use-at-your-own-risk"
        })
    ],
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".vue",".js",".json"]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}` 
        }
    },
    devServer: {
        host: "localhost",
        port: "8080",
        hot: true,
        open: true,
        historyApiFallback: true
    }
}
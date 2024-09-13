const path = require("node:path");
const process = require("node:process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: `static/js/[name]${isProduction ? ".[contentHash:10]" : ""}.js`,
        chunkFilename: `static/js/[name]${isProduction ? ".[contentHash:10]" : ""}.chunk.js`,
        assetModuleFilename: "static/assets/[hash:10][ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
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
                loader: "vue-loader",
                options: {
                    // 开启vue-loader缓存
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader")
                }
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
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contentHash:10].css",
            chunkFilename: "static/css/[name].[contentHash:10].chunk.css"
        }),
        isProduction && new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"]
                    }
                }
            ]
        })
    ].filter(Boolean),
    mode: isProduction ? "production": "development",
    devtool: isProduction ? false : "source-map", 
    resolve: {
        extensions: [".vue",".js",".json"]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-chunk",
                    priority: 20
                },
                elementUI: {
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    name: "element-ui-chunk",
                    priority: 10
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "libs-chunk",
                    priority: 0
                }
            }
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}` 
        },
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    {
                                        name: "preset-default",
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                addAttributesToSVGElement: {
                                                    params: {
                                                        attributes: [
                                                            { xmlns: "http://www.w3.org/2000/svg" },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            }
                        ]
                    ]
                }
            })
        ]
    },
    devServer: {
        host: "localhost",
        port: "8080",
        hot: true,
        open: true,
        // 解决路由history模式下刷新404问题
        historyApiFallback: true
    },
    performance: false
    // performance: {
    //     hint: false
    // }
    // performance: {
    //     maxEntrypointSize: 500 * 1000
    // }
}
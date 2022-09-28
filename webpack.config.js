const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtract = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isDev = mode === 'development';
const isProd = !isDev;

module.exports = {
    mode: mode,
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack config',
            template: './index.pug',
            filename: '[name].html',
            favicon: './assets/favicon/success.jpg',
        }),
        new MinCssExtract({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (isDev ? "style-loader" : MinCssExtract.loader),
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.(jpg|svg|png|jpeg|gif)$/i,
                type: 'asset/resource',
            }, 
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        static: './dist',
        port: '3000',
        hot: true
    }
  };
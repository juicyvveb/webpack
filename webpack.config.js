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
        filename: '[name].bundle.js',
        clean: true
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack config',
            template: './src/index.html',
            filename: './[name].[hash].html',
            favicon: './assets/favicon/success.jpg',
        }),
        new MinCssExtract(),
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
                    // "sass-loader",
                ]
            }
        ]
    }
  };
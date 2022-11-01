const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EslintPlugin = require('eslint-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './scripts/main.ts',
        donate: './scripts/donate.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        port: 8000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './pages/main/main.html',
            filename: './main.html',
            inject: true,
            chunks: ['main']
        }),
        new HTMLWebpackPlugin({
            template: './pages/donate/donate.html',
            filename: './donate.html',
            inject: true,
            chunks: ['donate']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new EslintPlugin({ extensions: 'ts' })
    ],
    module: {
        rules: [
            {
               test: /\.css$/,
               use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            },
            {
                test:/\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource', 
                generator: {
                    filename: 'assets/[name][ext]'
                } 
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource', 
                generator: {
                    filename: 'fonts/[name].[ext]'
                } 
                
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ]
                  }
                }
            }
        ]
    }
}
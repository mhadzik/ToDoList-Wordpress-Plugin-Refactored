const path = require('path');
webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        bundle: ['./src/index.js', './src/sass/style.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'includes/admin/public'),
        filename: 'bundle.js',
        publicPath: '/includes/admin/public'
    },
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [{
                enforce: 'pre',
                exclude: /node_modules/,
                test: /\.jsx$/,
                loader: 'eslint-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'svg-defs.svg'
                }
            },
            {
                test: /\.(jpe?g|png|gif)\$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new BrowserSyncPlugin({
            files: '**/*.php',
            proxy: 'http://localhost:8888/wordpress'
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin()]
    }
};
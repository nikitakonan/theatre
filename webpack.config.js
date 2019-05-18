const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, params) {
    const isDev = params.mode === 'development';
    const plugins = [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('1.0.0'),
            ENV: JSON.stringify(params.mode),
            IS_DEV: JSON.stringify(isDev)
        })
    ];
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        },
        plugins,
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json']
        },
        devtool: isDev ? 'sourcemap' : '',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {}
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            port: 5000,
            open: true,
            historyApiFallback: true
        }
    };
};

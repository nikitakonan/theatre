const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, params) {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ],
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json']
        },
        devtool: params.mode === 'development' ? 'sourcemap' : '',
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

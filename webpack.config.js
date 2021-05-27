const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactFastRefresh = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public', 'index.html'),
        port: 9000,
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactFastRefresh(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/, // Cada biblioteca se preocupa com o a conversão de seus arquivos, não sendo necessário fazer o bundle dos arquivos dos pacotes instalados.
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel'),
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
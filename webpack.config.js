const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: './game.js',
        output: {
            path: path.resolve(__dirname, ''),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.m?js$/,
                use: 'babel-loader',                
            }]
        }
    }
]
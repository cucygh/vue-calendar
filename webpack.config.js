module.exports = {
    entry: './index.js',
    output: {
        path: './online/js',
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        }]
    }
};

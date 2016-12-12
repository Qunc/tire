var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      },
            {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
//      ,query: {presets: ['es2015', 'stage-0']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: 'assets/img/[name].[ext]?[hash]'
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader"
      }) },
    ]
  },
  plugins: [
    new ExtractTextPlugin("index.css")
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      API_BASE_URL: '"http://api.anmiaoda.com"'
    }),
/*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
*/
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else if (process.env.NODE_ENV === 'test') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      },
      API_BASE_URL: '"http://api-test.anmiaoda.com"'
    }),
    /*
     new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false
     }
     }),
     */
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      API_BASE_URL: '"http://api-test.anmiaoda.com"'
    }),
  ])
}

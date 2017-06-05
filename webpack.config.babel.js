import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const title = "Amit Zur \u00B7 Happy Code";

const htmlWebpackPlugin = new HTMLWebpackPlugin({
  title,
  template: './src/index.hbs',
  favicon: './src/favicons/favicon.ico',
  cache: false,
  hash: true,
  amit: "chibo"
});

const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: false,
  }
});

const extractTextPlugin = new ExtractTextPlugin("[hash].css");
const cleanPlugin = new CleanWebpackPlugin(['dist']);
const copyPlugin = new CopyWebpackPlugin([{ from: "CNAME" }]);

const plugins = [htmlWebpackPlugin, cleanPlugin, extractTextPlugin, copyPlugin];

if (isProd) {
  plugins.push(uglifyJsPlugin);
}

module.exports = {
  devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  devServer: {
    port: process.env.PORT || 4444
  },
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: '[hash].js',
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg)$/i,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?outputPath=fonts/&name=[name].[ext]'
      },
      { test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          partialDirs: path.resolve(__dirname, 'src', 'templates', 'partials'),
          helperDirs : path.resolve(__dirname, 'src', 'templates', 'helpers'),
          inlineRequires: "\/(img|media)\/" // NOTE: go here if things don't work. the regex might be weak!
        }
      }
    ]
  },
  plugins
};
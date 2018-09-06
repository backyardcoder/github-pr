import fs from "fs";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

const BASE_PATH = path.resolve(__dirname, "../");
const SRC_PATH = path.resolve(BASE_PATH, "src");
const JS_PATH = path.resolve(SRC_PATH, "js");
const HTML_PATH = path.resolve(SRC_PATH, "html");
const BUILD_PATH = path.resolve(BASE_PATH, "dist");
const MANIFEST_PATH = path.resolve(SRC_PATH, "manifest.json");

function buildEntry() {
  return new Promise(resolve => {
    fs.readdir(JS_PATH, (err, files) => {
      if (err) {
        console.log("Failed to read entry files!");
        throw err;
      }

      const entries = files
        .filter(fileName => fileName.indexOf(".") !== -1) // Skip directories
        .reduce((entry, fileName) => {
          entry[fileName] = path.join(JS_PATH, fileName);
          return entry;
        }, {});
      return resolve(entries);
    });
  });
}

export default {
  target: "web",
  mode: "production",
  context: SRC_PATH,
  entry: buildEntry,
  output: {
    filename: "[name]",
    path: path.join(BUILD_PATH, "js")
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `../css/main.css`
    }),
    new CleanWebpackPlugin([BUILD_PATH], {
      root: BASE_PATH
    }),
    new CopyWebpackPlugin([
      {
        from: HTML_PATH,
        to: path.join(BUILD_PATH, "html")
      },
      {
        from: MANIFEST_PATH,
        to: BUILD_PATH
      }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

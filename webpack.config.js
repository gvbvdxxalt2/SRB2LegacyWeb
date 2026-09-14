const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
try {
  require("fs").rmSync("./launcher-dist", { recursive: true });
} catch (e) {}

module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE === "true";

  return {
  mode: "production",
  devServer: {
    allowedHosts: "all",
    port: (+require("process").env.PORT) || 3000,
    client: false,
    static: [
      { directory: path.resolve(__dirname, "static") },
      { directory: path.resolve(__dirname, "build-wasm/bin") },
      {
        directory: path.resolve(__dirname, "game-assets"),
        publicPath: "/assets/",
      },
    ],
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
  },
  devtool: false,
  entry: {
    launcher: "./launcher-src/index.js",
    filemanager: "./launcher-src/filemanager/index.js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "shared",
    },
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, "launcher-dist"),
    filename: "[name].bundle.js",
  },
  performance: {
    /*hints: "warning",*/
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
        type: "javascript/auto", // Fix for raw-loader
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      title: `SRB2Legacy Web`,
      template: "./launcher-src/base_html.html",
      chunks: ["launcher"],
    }),
    new HtmlWebpackPlugin({
      filename: `file.html`,
      title: `SRB2Legacy Web - File Manager`,
      template: "./launcher-src/base_html.html",
      chunks: ["filemanager"],
    }),
    !isDevServer && new CopyWebpackPlugin({
      patterns: [
        //Images and anything displayed on the site.
        {
          from: "./static",
          to: ".",
          noErrorOnMissing: true,
        },
        //The game without assets.
        {
          from: "./build-wasm/bin/",
          to: ".",
          noErrorOnMissing: true,
        },
        //Assets 
        {
          from: "./game-assets",
          to: "./assets/",
          noErrorOnMissing: true,
        },
      ],
    }),
  ].filter(Boolean),
  };
};
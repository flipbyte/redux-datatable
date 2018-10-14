const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const css = new ExtractTextPlugin("styles.css");

module.exports = {
    mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        // use: css.extract({
        //   use: ["css-loader"]
        // }),
        // loaders: ['style', 'css'],
        // include: __dirname + '/src'
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './build'
            }
          },
          "css-loader"
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    //   chunkFilename: "[id].css"
    })
  ],
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            // 'Observable': path.resolve(__dirname, './node_modules/rxjs/Observable'),
            'rxjs': path.resolve(__dirname, './node_modules/rxjs'),
            'prop-types': path.resolve(__dirname, './node_modules/prop-types'),
            // 'react-pure-time': path.resolve(__dirname, './node_modules/react-pure-time'),
            // 'query-string': path.resolve(__dirname, './node_modules/query-string'),
            // 'normalizr': path.resolve(__dirname, './node_modules/normalizr'),
            // 'lodash': path.resolve(__dirname, './node_modules/lodash'),
            'react-redux': path.resolve(__dirname, './node_modules/react-redux'),
            'react-observable': path.resolve(__dirname, './node_modules/react-observable'),
            // 'object-assign-deep': path.resolve(__dirname, './node_modules/object-assign-deep'),
            // 'mergeMap': path.resolve(__dirname, './node_modules/rxjs/operator/mergeMap'),
            // 'of': path.resolve(__dirname, './node_modules/rxjs/observable/of')
        }
    },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'prop-types': 'commonjs prop-types',
    // 'react-pure-time': 'commonjs react-pure-time',
    // 'query-string': 'commonjs query-string',
    // 'lodash': {
    //   commonjs: 'lodash',
    //   amd: 'lodash',
    //   root: '_' // indicates global variable
    // },
    // 'object-assign-deep': {
    //     commonjs: 'object-assign-deep',
    //     commonjs2: "object-assign-deep",
    //     amd: "ObjectAssignDeep",
    //     root: "ObjectAssignDeep"
    // },
    'react-redux': 'commonjs react-redux',
    'lodash/get': 'commonjs lodash/get',
    // 'normalizr': 'commonjs normalizr',
    'redux-observable': 'commonjs redux-observable',
    'rxjs': 'commonjs rxjs',
    // 'rxjs/Observable': 'commonjs rxjs/Observable',
    // 'rxjs/operator/mergeMap': 'commonjs rxjs/operator/mergeMap',
    // 'rxjs/operator/concatMap': 'commonjs rxjs/operator/concatMap',
    // 'rxjs/operator/switchMap': 'commonjs rxjs/operator/switchMap',
    // 'rxjs/operator/map': 'commonjs rxjs/operator/map',
    // 'rxjs/operator/takeUntil': 'commonjs rxjs/operator/takeUntil',
    // 'rxjs/operator/filter': 'commonjs rxjs/operator/filter',
    // 'rxjs/observable/of': 'commonjs rxjs/observable/of',
  }
};

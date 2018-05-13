var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
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
      }
    ]
  },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            // 'Observable': path.resolve(__dirname, './node_modules/rxjs/Observable'),
            'rxjs': path.resolve(__dirname, './node_modules/rxjs'),
            // 'mergeMap': path.resolve(__dirname, './node_modules/rxjs/operator/mergeMap'),
            // 'of': path.resolve(__dirname, './node_modules/rxjs/observable/of')
        }
    },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'rxjs': 'commonjs rxjs',
    'rxjs/Observable': 'commonjs rxjs/Observable',
    'rxjs/operator/mergeMap': 'commonjs rxjs/operator/mergeMap',
    'rxjs/operator/map': 'commonjs rxjs/operator/map',
    'rxjs/operator/takeUntil': 'commonjs rxjs/operator/takeUntil',
    'rxjs/observable/of': 'commonjs rxjs/observable/of',
  }
};

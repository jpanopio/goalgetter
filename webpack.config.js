import { resolve as resolvePath } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const DEBUG = process.env.NODE_ENV !== 'production';
const DIST = resolvePath(__dirname, './app');

export default () => ({
  entry: {
    main: [
      'babel-polyfill',
      'whatwg-fetch',
      ...(DEBUG ? ['react-hot-loader/patch'] : []),
      resolvePath(__dirname, './src/client.js'),
    ],
  },

  output: {
    path: DIST,
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolvePath(__dirname, './src'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: DEBUG,
              babelrc: false,
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 2 versions', '> 5%'],
                    },
                    modules: false,
                  },
                ],
                'stage-0',
                'react',
              ],
              plugins: [
                'react-hot-loader/babel',
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      inject: 'body',
      title: 'Goal Getter',
      template: resolvePath(__dirname, './src/index.ejs'),
    }),

    ...(
      DEBUG ?
        [new HotModuleReplacementPlugin()] : [
          new CompressionPlugin(),
          new UglifyJSPlugin({
            mangle: {
              except: ['exports', 'require'],
              screw_ie8: true,
            },
            compress: {
              screw_ie8: true,
              warnings: false,
              unused: true,
              dead_code: true,
            },
          }),
        ]
    ),
  ],

  devtool: DEBUG ? 'inline-source-map' : 'source-map',

  devServer: {
    contentBase: DIST,
    hot: DEBUG,
    hotOnly: DEBUG,
    port: 3000,
    disableHostCheck: true,
  },

  target: 'web',

  stats: {
    cached: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: DEBUG,
    timings: true,
    version: false,
  },
});

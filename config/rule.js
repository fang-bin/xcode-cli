const config = require('./config');
const {
  isDev,
  isPro,
  shouldUseRelativePath,
  publicPath,
  testRegex,
} = config;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getStyleLoaders = (cssOptions = 1, preProcessor) => {
  if (cssOptions >= 2 && !preProcessor) {
    console.log('请写入preProcessor');
    return;
  }
  const loaders = [
    isDev && require.resolve('style-loader'),
    isPro && {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativePath ? { publicPath } : undefined,
      ),
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: cssOptions,
      },
    },
    require.resolve('postcss-loader'),
  ].filter(Boolean);
  if (preProcessor){
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
}

const {
  cssRegex,
  sassRegex,
  jsRegex,
  tsRegex,
  imgRegex,
} = testRegex;
const rules = [
  {
    test: cssRegex,
    use: getStyleLoaders(),
  },
  {
    test: sassRegex,
    use: getStyleLoaders(2, 'sass-loader'),
  },
  {
    test: jsRegex,
    use: require.resolve('babel-loader'),
  },
  {
    test: tsRegex,
    use: require.resolve('ts-loader'),
  },
  {
    test: imgRegex,
    use: {
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'images/',
      },
    },
  },
].map(e => {
  return {
    include: path.resolve(__dirname, '../src'),
    ...e
  }
});

module.exports = rules;

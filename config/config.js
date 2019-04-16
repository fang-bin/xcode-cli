const testRegex = {
  jsRegex: /\.jsx?$/,
  tsRegex: /\.tsx?$/,
  cssRegex: /\.css$/,
  sassRegex: /\.s(c|a)ss$/,
  lessRegex: /\.less$/,
  imgRegex: /\.(svg|png|jpe?g|gif)$/,
};

const isPro = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const publicPath = isPro ? '/assets/' : isDev && './';
const shouldUseRelativePath = publicPath === './';

module.exports = {
  testRegex,
  isDev,
  isPro,
  publicPath,
  shouldUseRelativePath,
}

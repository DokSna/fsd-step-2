const path = require('path')	//используем path, что бы правильно сформировать абсолютный путь к корню проекта
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {	//сдесь будем экспортировать наши настройки
	entry: {	//задаём точку входа
		app: './src/index.js'	//описываем путь к входному файлу js-скрипта
	},
	output: {	//точка выхода
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),	//путь, сдесь будем использовать пакет "path": "^0.12.7" - объявим его в константу в начале файла
		//передаём два параметра - говорим что в корне проекта нужно создавать папку dist
		publicPath: '/dist' //publicPath задаём для Dev-сервера что бы он корректно работал
	},

	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
				}
			]
		},
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
				}, {
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		}
		]
	},

	devServer: {	//настройки для нашего Dev-сервера
		overlay: true	// что бы ошибки отображались не в консоли, а в окне браузера (на тёмном фоне) и указывать то место где возникла ошибка
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		})
	],
}
module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		mocha: true,
	},
	plugins: ['mocha', 'chai', 'node'],
	extends: ['eslint:recommended', 'plugin:mocha/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: '2021',
	},
	rules: {
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: 'next', // Ignore 'next' parameter
				args: 'after-used', // Consider other parameters before marking them as unused
			},
		],
	},
};

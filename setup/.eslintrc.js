 
module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      'react/prop-types': 'off', // Disable if not using PropTypes
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
'rules': {
  // Existing rules...
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  '@emotion/jsx-import': 'off', // Disable this since pragma is used
  '@emotion/no-vanilla': 'error',
  '@emotion/styled-import': 'error',
  'react/no-unknown-property': ['error', { ignore: ['css'] }],
  'react/prop-types': [
    'error',
    { ignore: ['theme'] },
  ],
  // ✅ Ignore unknown at-rules (e.g., @tailwind)
  'css/unknownAtRules': [
    'warn',
    {
      ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive'],
    },
  ],
},

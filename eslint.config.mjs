import nextPlugin from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextPlugin,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]

export default eslintConfig

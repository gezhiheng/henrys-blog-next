import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

const base = antfu(
  {
    react: true,
  },
  { ignores: ['**/*.md'] },
)

base.append([
  {
    name: 'project-ignores',
    ignores: ['**/*.md'],
  },
  {
    name: 'next',
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react/no-use-context': 'off',
    },
  },
  {
    name: 'project-overrides',
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'react-dom/no-dangerously-set-innerhtml': 'off',
    },
  },
  {
    name: 'shadcn-ui-overrides',
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    name: 'pages-style-overrides',
    rules: {
      'style/comma-dangle': 'off',
      'style/space-before-function-paren': 'off',
      'style/jsx-quotes': 'off',
    },
  },
])

base.overrideRules({
  'antfu/if-newline': 'off',
})

export default base

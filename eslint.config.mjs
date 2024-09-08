import { FlatCompat } from '@eslint/eslintrc';
import jsESLint from '@eslint/js';
import typeScriptESLint from '@typescript-eslint/eslint-plugin';
import typeScriptESLintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
const compat = new FlatCompat();

export default [
  {
    ignores: ['dist', 'eslint.config.mjs', 'node_modules', 'vite.config.ts', './env/*'],
  },
  jsESLint.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typeScriptESLint,
      typeScriptESLintParser,
      jsxA11y,
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        ...globals.browser,
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        ecmaVersion: '2023',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      // ===にしないとエラー
      eqeqeq: 'error',
      // サイクロマティック複雑度が10を超えるとエラー
      complexity: ['error', 10],
      // Any型は警告のとどめて許容する
      '@typescript-eslint/no-explicit-any': 'warn',
      // Childrenの一行タグを許可<Example />
      'react/no-children-prop': 'off',
      // useEffectの依存関係のWariningを無効
      'react-hooks/exhaustive-deps': 'off',
      // useCallbackの呼び出し名のルールを無効(大文字 or Prefix'use')
      'react-hooks/rules-of-hooks': 'off',
      // JSXでvarは使わない
      'react/jsx-uses-vars': 'error',
      // JSX に直接コールバック関数の記述を禁止
      // NOTE: render ごとに毎回新たな関数実体が生成されre-renderを引き起こすため
      'react/jsx-no-bind': 'error',
      // Componetの複数exportを警告する
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
  },
  settings: {
    react: {
      version: 'detect' // Указание 'detect' для обнаружения версии React автоматически
    }
  }
}

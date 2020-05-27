module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": 0,
    "func-names": 0,
    "comma-dangle": ["error", "always-multiline"],
    "import/newline-after-import": 0,
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    quotes: [2, "double", {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
  },
};

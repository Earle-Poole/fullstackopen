module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "react-hooks"
    ],
    "rules": {
      "semi": 0,
      "react/prop-types": 0,
      "max-len": 0,
      "arrow-parens": 0,
      "no-console": 0,
      "arrow-spacing": [
        "error", { "before": true, "after": true }
      ],
      "object-curly-spacing": [
        "error", "always"
      ],
      "no-trailing-spaces": "error",
      "eqeqeq": "error"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
};
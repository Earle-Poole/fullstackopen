module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
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
        "react"
    ],
    "rules": {
      "semi": [2, "never"],
      "max-len": ["error", { "code": 2000 }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"]}],
      "react/jsx-curly-newline": { "multiline": "consistent", "singleline": "consistent"},
      "react/state-in-constructor": [false],
      "react/jsx-props-no-spreading": [{
        "html": "ignore",
        "custom": "ignore",
        "explicitSpread": "ignore",
        "exceptions": []
      }],
      "react/static-property-placement": [false],
      "react/prop-types": [0]
    }
};
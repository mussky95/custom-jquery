module.exports = {
    "plugins": [
        "babel",
        "jest",
    ],
    "env": {
        "node": true,
        "jest": true,
        "browser": true,
    },
    "parser": "babel-eslint",
    "extends": [
        "airbnb-base",
        "plugin:jest/recommended",
    ],
    "rules": {
        "no-console": 0,
    },
};

module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "react/forbid-prop-types": "off",
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
    }
};
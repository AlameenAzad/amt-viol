module.exports = {
  presets: ["@quasar/babel-preset-app"],
  env: {
    production: {
      plugins: [["transform-remove-console", { exclude: ["error", "warn"] }]]
    }
  }
};

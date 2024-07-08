module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", // Adds CSS to the DOM by injecting a <style> tag
          "css-loader?modules", // Interprets @import and url() like import/require() and will resolve them
        ],
      },
    ],
  },
};

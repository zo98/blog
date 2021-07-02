const path = require("path");
module.exports = {
  pageExtensions: ["jsx", "js"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/src": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/gStyles": path.resolve(__dirname, "./styles"),
      "@/cStyles": path.resolve(__dirname, "./src/styles"),
    };
    return config;
  },
};

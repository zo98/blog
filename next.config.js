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
      "@/common": path.resolve(__dirname, "./src/common"),
      "@/pages": path.resolve(__dirname, "./pages"),
      "@/http": path.resolve(__dirname, "./http"),
    };
    return config;
  },
};

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // The path you want to proxy
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || "http://127.0.0.1:9000", // Your backend server URL
      changeOrigin: true,
    })
  );
};

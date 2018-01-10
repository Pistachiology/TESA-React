module.exports = {
  '/api': {
    target: process.env.API_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  },
  '/static': {
    target: 'http://localhost:' + process.env.PORT,
    changeOrigin: true,
    logLevel: 'debug'
  },
  '/static2': {
    target: process.env.STATIC_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  }
}

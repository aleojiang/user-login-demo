export default { 
  "publicPath": "/static/",
  "proxy": { //做 webpack 反向代理,意思是会配置所有以api开头的请求。,访问 http://localhost:8000/api/users 如果你看见一串json数据代表代理成功
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}

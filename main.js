const net = require("net")

// 创建server
const server = net.createServer()
server.on("listening", function () {
    console.log("服务启动监听...")
})
// 接受新的客户端链接
server.on("connection", function () {

})
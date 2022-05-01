const net = require("net")

// 创建server
const server = net.createServer()

// 记录日志
server.on("listening", function () {
    console.info("服务启动监听...")
})

// 处理错误
server.on("error", function (error) {
    console.error(error)
})

// 接受新的客户端链接
server.on("connection", function (socket) {
    console.info("客户端连接: ", socket.address())
    socket.on("data", function () {

    })
})

// 关闭
server.on("close", function () {
    console.info("关闭连接")
})

server.listen(8080, "0.0.0.0")
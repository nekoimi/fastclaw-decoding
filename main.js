const net = require("net")
const config = require("./config.json")
const callablelib = require("./callable_method.js")
// 空闲超时时间: 60秒
const SOCKET_TIME_OUT = 60000

/**
 * success
 * @param result
 * @returns {{code: number, data: *}}
 */
const success_result = result => {
    return {
        code: 0,
        data: result
    }
}

/**
 * fail
 * @param message
 * @returns {{code: number, message: *}}
 */
const fail_result = message => {
    return {
        code: 500,
        msg: message
    }
}

/**
 * 动态调用函数库
 * @param data 调用参数对象
 * @returns {{code: number, message: string}|{code: number, data: *}}
 */
const invoke = data => {
    let method = data.method
    let params = data.params
    if (Object.keys(callablelib).indexOf(method) >= 0) {
        try {
            return success_result(callablelib[method](params))
        } catch (e) {
            return fail_result(`callable function error! ${e}`)
        }
    }
    return fail_result(`callable function ${method} not found!`)
}

// 创建server
const server = net.createServer()

// 处理错误
server.on("error", error => console.error(`发生错误: ${error}`))
// 关闭
server.on("close", () => console.info("关闭连接"))
/**
 * 接受新的客户端链接
 * socket.on(event: 'close', listener: (hadError: boolean) => void): this;
 * socket.on(event: 'connect', listener: () => void): this;
 * socket.on(event: 'data', listener: (data: Buffer) => void): this;
 * socket.on(event: 'drain', listener: () => void): this;
 * socket.on(event: 'end', listener: () => void): this;
 * socket.on(event: 'error', listener: (err: Error) => void): this;
 * socket.on(event: 'lookup', listener: (err: Error, address: string, family: string | number, host: string) => void): this;
 * socket.on(event: 'ready', listener: () => void): this;
 * socket.on(event: 'timeout', listener: () => void): this;
 */
server.on("connection", socket => {
    socket.setTimeout(SOCKET_TIME_OUT)
    socket.on('timeout', () => socket.end())
    socket.on("error", had => socket.end())
    socket.on("data", data => {
        const datastr = data.toString('utf-8', 0)
        if (datastr === "1") {
            socket.write("1", 'utf-8')
            return
        }

        // console.info(`请求数据: ${datastr}`)
        let callable_object = {}
        try {
            callable_object = JSON.parse(datastr)
        } catch (e) {
            console.error(`解析客户端数据出错: ${e}`)
            let errresp = fail_result(`解析客户端数据出错: ${e}`)
            socket.write(JSON.stringify(errresp), 'utf-8')
            socket.end()
            return
        }

        let requestId = callable_object.requestId
        let result = invoke(callable_object)
        let resp = {
            requestId: requestId,
            resp: result
        }
        socket.write(JSON.stringify(resp), 'utf-8')
    })
})

// Listening
server.listen(config.port, config.host, () => console.info(`Start, Listening on ${config.host}:${config.port} ...`))
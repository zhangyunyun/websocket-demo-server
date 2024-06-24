const Websocket = require('ws') //引入
const PORT = 5000 //设置服务器端口号
    // 创建 WebSocket 服务器
const server = new Websocket.Server({ port: PORT })
server.on('connection', (ws) => {
    console.log('客户端连接');

    //监听客户端消息事件
    ws.on('message', (message) => {
        console.log(`我是接收到的消息: ${message}`);
        // 将消息广播给所有客户端
        server.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })

    //监听客户端断开事件
    ws.on('close', () => {
        console.log('客户端断开连接')
    })
})
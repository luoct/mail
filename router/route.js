var path = require('path')
var db = require('../db')
const tools = require('../tools')

let router = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname , '../views/timeline_vue.html'))
    })


    // 根据访问的路劲自动去判断文件
    app.get('/mails/:date', (req, res) => {
        res.sendFile(path.resolve(__dirname , '../views/' + req.params.date +  '.html'))
    })


    // reply的 get、post 请求
    app.get('/reply', (req, res) => {
        res.send('reply')

    })
    app.post('/api/reply', (req, res) => {
        res.set("Access-Control-Allow-Origin", "*")
        // 接收到title和content内容
        // 存入mongodb中

        // res返回状态。（并重定向至回信页面）
        res.send({ status: 'ok', data: req.body })
    })


    // 统计ip和时间
    app.get('/admin/count', (req, res) => {
        res.sendFile(path.resolve(__dirname , '../views/count.html'))
    })
    app.get('/api/count/:type', (req, res) => {
        db.find({}, req.params.type, (result) => {
            // console.log(result)
            res.json({ msg: 'ok', result: result })
        })
    })
    app.post('/api/count', (req, res) => {
        // req.body: { city, pathname, openTime, time }
        res.set("Access-Control-Allow-Origin", "*")
        res.send(req.body);
        console.log(req.body)
        let { pathname, openTime, time } = req.body;
        let ipArr = tools.getClientIP(req).split(':');
        let ip = ipArr[ipArr.length - 1]
        let pnArr = pathname.split('/');
        let collName = pnArr[pnArr.length - 1]
        db.insertOne({ ip, pathname, openTime, time }, collName, (res) => {
            console.log(ip)
        })
    })
}

module.exports = router;
const express = require('express');
const db = require('./db')
var favicon = require('serve-favicon')

let app = express();

// app.engine('.html', require('express-art-template'));
// app.set('view engine', '.html');

// let router = express.Router();
// app.use('/', router)
// error: 在router中sendFile中的html文件无法访问public中的静态资源

app.use('/public', express.static('./public'))
// express 4.x中需要自己去添加中间件
app.use(favicon('favicon.ico'))


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/timeline.html')
})


// 根据访问的路劲自动去判断文件
app.get('/mails/:date', (req, res) => {
    res.sendFile(__dirname + '/views/' + req.params.date + '.html')
})


// reply的 get、post 请求
app.get('/reply', (req, res) => {
    res.send(`<textarea>reply</textarea>`)
})
app.post('/api/reply', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    console.log(req.body)
    // 接收到title和content内容
    // 存入mongodb中

    // res返回状态。（并重定向至回信页面）
    res.send({ status: 'ok', data: req.body })
})


// 统计ip和时间
app.get('/admin/count', (req, res) => {
    res.sendFile(__dirname + '/views/count.html')
})
app.get('/api/count/:type', (req, res) => {
    db.find({}, req.params.type, (result) => {
        console.log(result)
        res.json({ msg: 'ok', result: result })
    })

})
app.post('/api/count', (req, res) => {
    // console.log(req.body)
    // body: { ip, city, pathname, openTime, time }
    let arr = req.body.pathname.split('/');
    let collName = arr[arr.length-1]
    db.insertOne(req.body, collName, ()=>{
        console.log(collName)
    })
})


app.all('*', (req, res) => {
    res.sendFile(__dirname + '/views/errrr.html')
})


app.listen(3333)


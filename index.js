const express = require('express');
const favicon = require('serve-favicon')

const router = require('./router/route')



let app = express();

// let router = express.Router();
// app.use('/', router)
// error: 在router中sendFile中的html文件无法访问public中的静态资源
// 猜想：在使用router前配置静态文件

app.use('/public', express.static('./public'))
// express 4.x中需要自己去添加中间件
app.use(favicon('favicon.ico'))


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 用router文件把请求模块化
router(app);

app.all('*', (req, res) => {
    res.sendFile(__dirname + '/views/errrr.html')
})


app.listen(3333)
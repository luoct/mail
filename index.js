const express = require('express');


let app = express();

// app.engine('.html', require('express-art-template'));
// app.set('view engine', '.html');

// let router = express.Router();
// app.use('/', router)

app.use('/public', express.static('./public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/timeline.html')
})
app.get('/411', (req, res) => {
    res.sendFile(__dirname + '/views/411.html')
})
app.get('/413', (req, res) => {
    res.sendFile(__dirname + '/views/413.html')
})
app.get('/417', (req, res) => {
    res.sendFile(__dirname + '/views/417.html')
})
app.get('/423', (req, res) => {
    res.sendFile(__dirname + '/views/423.html')
})

app.all('*', (req, res) => {
    res.sendFile(__dirname + '/views/errrr.html')
})


app.listen(3333)


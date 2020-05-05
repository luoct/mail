var start = new Date();
var openTime = start.toLocaleString()
var time;
var city;


var pathname = window.location.pathname
if (pathname === '/') pathname = 'timeline'

// 统计在网页逗留的时间
// ip在客户端统计
window.onbeforeunload = function () {
    var end = new Date();
    time = end.getTime() - start.getTime();
    time = time / 1000;
    $.post('/api/count', { city, pathname, openTime, time }, (data) => {
        console.log('ok')
    })
};
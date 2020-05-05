var start = new Date();
var openTime = start.toLocaleString()
var time;
var ip, city;


var pathname = window.location.pathname
if (pathname === '/') pathname = 'timeline'



$.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (geo) {
    console.log('geo:' + JSON.stringify(geo, null, 4));
    ip = geo['geoplugin_request'];
    city = geo['geoplugin_city'];

    // 统计在网页逗留的时间
    window.onbeforeunload = function () {
        var end = new Date();
        time = end.getTime() - start.getTime();
        time = time / 1000;
        $.post('/count', { ip, city, pathname, openTime, time }, (data) => {
            console.log('ok')
        })
    };
});





// var script = document.createElement('script');
// script.setAttribute('src', 'http://pv.sohu.com/cityjson?ie=utf-8');
// document.getElementsByTagName('body')[0].appendChild(script);

// console.log('sohu:' + returnCitySN["cip"] + ',' + returnCitySN["cname"]);
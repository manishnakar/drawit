var koa = require('koa');
var app = koa();
var serve = require('koa-static');

// app.use(function *(){
//   this.body = 'Hello World';
// });
// x-response-time

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

require("./server/router").init(app);
app.use(serve(__dirname + '/public'));

app.listen(3000);

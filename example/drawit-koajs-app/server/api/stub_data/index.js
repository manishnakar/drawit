/**
 * Created by deepak.vishwakarma on 4/12/16.
 */
"use strict";
var Router = require('koa-router');
var fs = require("fs");
// console.log(__dirname + "/services_status.json");
var router = new Router({
    prefix: '/api/json'
})
router.get("/:fileName", function *(next) {
    var stubDataFsName = __dirname + "/" + this.params.fileName;
    console.log(stubDataFsName);
    var readStream = fs.createReadStream(stubDataFsName);
    // readStream.on('open', function () {
    //     // This just pipes the read stream to the response object (which goes to the client)
    //     readStream.pipe();
    // });
    this.type = 'application/json'
    this.body = readStream;
    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        this.throw(500, err);
    });
});
module.exports = router;

"use strict";

exports.init = function(app){
    app.use(require("./api/stub_data").routes());
}

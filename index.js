var server = require( "./server" );
var router = require( "./router" );

var handle = {
    "sink" : "./datacontroller/AppController",
    "source" : "./datasource/AppController",
    "default" : "./RequestController"
};

server.start( router.route, handle );
exports.handle = handle;

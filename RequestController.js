var index = require( './index' );
var dataController = require( index.handle[ 'sink' ] );
var dataSource = require( index.handle[ 'source' ] );

function route( segments, response, postData ) {
    switch( segments[ 2 ] ) {
        default:
            mainView( segments, response, postData );
            break;
    }
}

function mainView( segments, response, postData ) {
    var dataSources = dataSource.getDataSourceList();
    var approachList = dataController.getApproachList();
    //code for frontend and template engine
}

exports.route = route;

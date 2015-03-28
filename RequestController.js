var index = require( './index' );
var dataController = require( index.handle[ 'sink' ] );
var dataSource = require( index.handle[ 'source' ] );
var querystring = require( 'querystring' );

function route( segments, response, postData ) {
    switch( segments[ 1 ] ) {
        case "approach":
            singleApproachView( segments, response, postData );
            break;
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

function singleApproachView( segments, response, postData ) {
    if ( postData ) {

	var parsedData  = querystring.parse( postData );

	dataSource.initDataSource( {
	    'sourceName' : parsedData[ 'sourceName' ],
	    'dataRate' : parsedData[ 'dataRate' ]
	} );

	dataController.setCron( {
	    'approachList' : JSON.parse( parsedData[ 'approachList' ] )[ 'list' ],
	    'scoreRate' : parsedData[ 'scoreRate' ]
	} );

	//code for frontend and template engine

    }
    else {
    }
}

exports.route = route;

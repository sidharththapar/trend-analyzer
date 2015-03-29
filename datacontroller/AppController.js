var index = require( './index' );
var approaches = {};
var cron = require( 'cron' );

function getApproachList() {
    return index.availableApproaches;
}

function setCron( options ) {

    var approachList = options[ 'approachList' ];
    var scoreRate = options[ 'scoreRate' ];
    var approach;

    GLOBAL.dataControllerCron = new cron.CronJob ( '1 */' + scoreRate +' * * * *', function() {

	for( index in approachList ) {
	    var approachName = approachList[ index ];

	    if( ! approaches[ approachName ] )
		approaches[ approachName ] = approach = require( './' + approachName + 'Approach/AppController' );

	    else
		approach = approaches[ approachName ];

	    approach.updateScores();

	}

    }, null, true );

    GLOBAL.dataControllerCron.start();

}


function route ( segments, response, postData ) {
    switch( segments[ 2 ] ) {
	case "constants" :
	    changeConstants( segments, response, postData );
	    break;
    }
}
function changeConstants( segments, response, postData ) {
    if( postData ) {

	var postData = querystring.parse( postData );
	var dataSource = dataSources[ sourceName ];
	dataSource.changeConstants( postData[ 'constants' ] );

    }
    else {
    }
}

function route ( segments, response, postData ) {
    switch( segments[ 2 ] ) {
	case "constants" :
	    changeConstants( segments, response, postData );
	    break;
    }
}

function changeConstants( segments, response, postData ) {
    if( postData ) {

	var parsedData = querystring.parse( postData );
	var approach = approaches[ approachName ];
	approach.changeConstants( parsedData[ 'constants' ] );

    }
    else {
    }
    response.end();

}

exports.getApproachList = getApproachList;
exports.setCron = setCron;
exports.route = route;
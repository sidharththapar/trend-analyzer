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

exports.getApproachList = getApproachList;
exports.setCron = setCron;
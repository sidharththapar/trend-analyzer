var conn = require( '../connection' );
var mongodb = require( 'mongodb' );

var fetch = function( options ){
    conn.getConnection( 'frouzan', function( client ) {

        var collection = mongodb.Collection( client, 'chapter1' );
        var messages = collection.find().limit( parseInt( options[ 'dataRate' ] ) ).skip( options[ 'offset' ] );

        messages.toArray( function( err, data ) {
            if ( err ) {
            }
            else
                options[ 'callback' ]( {
		    'data' : data
		} );
        } );

    } );
}

var fetchTrend = function( options ) {
    var trends = options[ 'trends' ];
    trends.groundTruth = {
	'tags' : [ 'data', 's', 'sa', 'dsd' ],
	'time' : new Date().getTime() - options[ 'requestTime' ]
    };
    options[ 'callback' ]( { 'trends' : trends } );
}

exports.fetch = fetch;
exports.fetchGroundTruth = fetchTrend;

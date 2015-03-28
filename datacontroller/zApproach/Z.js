var conn = require( '../../connection' );
var mongodb = require( 'mongodb' );

var upsert = function( options ) {

    conn.getConnection( 'z_approach_db', function( client ) {

	var score = options[ 'score' ];
	var collection = mongodb.Collection( client, 'z_collection' );

	collection.update( { 'text' : score.text }, { '$set' : score }, { "upsert" : true }, function( err, numOfRows ) {

	    if ( err ) {
	    }

	} );

    } );

}

var fetchAll = function( options ) {

    conn.getConnection( 'z_approach_db', function( client ) {

        var collection = mongodb.Collection( client, 'z_collection' );
        var iter = collection.find();
	var callback = options[ 'callback' ];

        iter.toArray( function( err, data ) {

            if ( err ) {
            }

            else
		callback( {
		    'store' : data
		} );

        });

    });
}

exports.upsert = upsert;
exports.fetchAll = fetchAll;

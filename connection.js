var mongodb = require( 'mongodb' );
var access = new mongodb.Server( 'localhost', 27017, {} );
var client = '';

var getConnection = function( dbName, callback ) {
    if ( client ) {
        client.databaseName = dbName;
        callback( client );
    }
    else {
        new mongodb.Db( dbName, access, {
	    safe : true,
	    auto_reconnect : true
	} ).open( function( err, c ) {
            if( err ) {
            }
            else {
                client = c;
                callback( client );
            }
        } );
    }
}

exports.getConnection = getConnection;

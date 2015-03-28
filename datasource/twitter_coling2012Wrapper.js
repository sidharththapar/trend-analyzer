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

exports.fetch = fetch;

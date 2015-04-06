var conn = require( '../../../connection' );
var mongodb = require( 'mongodb' );

var upsert = function( options ) {
    conn.getConnection( options['iir_approach_db'], function( client ) {
        var score = options['score'];
        var collection = mongodb.Collection( client, 'iir_tag_collection' );
        collection.update( { 'text' : score.text }, { '$set' : score }, { 'upsert' : true }, function( err, numOfRows ) {
            if ( err ) {
			}
        } );
    } );
}

var fetchAll = function( callback, options ) {
    conn.getConnection( options['iir_approach_db'], function( client ) {
        var collection = mongodb.Collection( client, 'iir_message_collection' );
        var iter = collection.find();
        var callback = options[ 'callback' ];
		iter.toArray( function( err, data ) {
            if ( err ) {
            }
			
            else {
                callback( {
					'store' : data
            }
        } );
    } );
}

var trendingTopics = function( options ) {
    var tags;
    var trends = options[ 'trends' ];
    conn.getConnection( options['db_name'], function( client ) {
        collection = mongodb.Collection( client, 'iir_tag_collection' );
        var iter  = collection.find().sort( { 'iir-score' : -1, 'count' : -1 } ).limit( 10 );
        iter.toArray( function ( err, data ) {
            if ( err ) {
		tags = [];
            }
            else {
		tags = data;
            }
	    trends.approaches.push( {
		'approach' : 'iir',
		'tags' : tags,
		'time' : new Date().getTime() - options[ 'requestTime' ]
	    } );
	    options[ 'callbackOptions' ].trends = trends;
	    options[ 'callback' ]( options[ 'callbackOptions' ] );
        } );
    } );
}

var storeData = function( callback, options ) {
    conn.getConnection( options['iir_approach_db'], function( client ) {
        var collection = mongodb.Collection( client, 'iir_tag_collection' );
        var tags = options['tags'];
        var messageCollection = mongodb.Collection( client, 'iir_message_collection' );

		tags.forEach( function( tag ) {
            collection.update( tag, { '$inc' : { 'count' : 1 } }, { 'upsert' : true }, function( err, numOfRows ) {
                if ( err ) {
				}
            } );
        } );
        messageCollection.insert( options[ 'messages' ], function(){} );

    } );
}

exports.upsert = upsert;
exports.fetchAll = fetchAll;
exports.trendingTopics = trendingTopics;
exports.store = storeData;

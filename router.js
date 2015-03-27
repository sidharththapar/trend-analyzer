function route( handle, pathname, response, postData ) {
    try {
        var segments = pathname.split( '/' );
        var firstSegment = segments[ 1 ] ? segments[ 1 ] : 'default';
        var application = require( handle[ firstSegment ] );
        application.route( segments, response, postData );
    } catch( err ) {
        response.writeHead( 404, { "Content-Type" : "text/plain" } );
        response.write( "Error while routing in router.js" );
        response.write( "\nError Details: " + err );
        response.end();
    }
}

exports.route = route;

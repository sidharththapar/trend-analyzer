var stddevModel = require( './Stddev.js' );

function updateScores() {

    stddevModel.fetchAll( {
	'callback' : updatestddevValues
    } );

}

function updatestddevValues( options ) {

    var scores = options[ 'scores' ];

    scores.forEach( function( score ) {

        if ( score['mean'] ) {
            var oldmean=score.mean;
            
            score[ 'mean' ] = ( score.total * score.mean + score.count )/( score.total + 1 );
            score[ 'total' ]++;
            score['std-dev'] = Math.sqrt(((score.count-score.mean) + (score.total - 1) * (oldmean - score.mean)/(score.total - 1));
            score['count'] = 0;
            stddevModel.upsert( {
                "score" : score
            } );

        }

        else {

            score['mean'] = score.count;
            score['total'] = 1;
            score['count']=0;

            stddevModel.upsert( {
                'score' : score
            } );

        }

    });
}

function changeConstants( options ) {
}

function handleData( options ) {
    stddevModel.storeData( options );
}

exports.updateScores = updateScores;
exports.changeConstants = changeConstants;
exports.handleData = handleData;
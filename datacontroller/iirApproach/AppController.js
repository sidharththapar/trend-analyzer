var iirModel = require( '../models/IIR');

function updateScores() {

    iirModel.fetchAll( {
	'callback' : updateiirValues
    } );

}

var updateIIRValues = function( options ) {
	
    var scores = options[ 'scores' ];
    
	scores.forEach( function( score ) {
    
		if ( score['iir-score'] ) {
            
			score['iir-score'] = score.count * 0.7 + score['iir-score']*0.3;
            score['count'] = 0;
         
			iirModel.upsert( {
                "score" : score
            } );
        }
        else {
            score['iir-score'] = score.count;
            score['count']=0;
            
			iirModel.upsert( {
                'score' : score
            } );
        }
    });
}

function changeConstants( options ) {
}

function handleData( options ) {
    iirModel.storeData( options );
}

function fetchTrends( options ) {
    return iirModel.trendingTopics( options );
}

exports.updateScores = updateScores;
exports.changeConstants = changeConstants;
exports.handleData = handleData;
exports.fetchTrends = fetchTrends;

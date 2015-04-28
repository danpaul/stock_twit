var twitterConfig = require('./twitter_config');
var config = require('./config');

var _ = require('underscore');
var csv = require('csv');
var fs = require('fs');
var knex = require('knex')(config.db);
var TwitterStreamBase = require('twitter_stream_base');

var twitterStreamBase = new TwitterStreamBase(twitterConfig, knex);

var KEY_SYMBOL = 0,
    KEY_NAME = 1;

var tweetProccessorCheckRunning = false;
var TWEET_PROCESSOR_CHECK_TIME = 1000 * 10;

function getCompanyList(callback){
    fs.readFile('./data/companylist.csv', 'utf8', function(err, csvData){
        if( err ){
            callback(err);
            return;
        }
        csv.parse(csvData, function(err, data){
            if( err ){
                callback(err);
                return
            }
            // remove header row
            data.splice(0, 1);
            var symbolList = [];
            var companyList = _.each(data, function(d){
                symbolList.push(d[KEY_SYMBOL]);
            })
            callback(null, symbolList);
        })
    });
}

function startTracking(){
    getCompanyList(function(err, companyList){
        if( err ){
            console.log(err);
            return;
        }
        twitterStreamBase.track(companyList);
        console.log('Monitoring initialized.');
    })
}

function processTweets(){
    if( !tweetProccessorCheckRunning ){
        tweetProccessorCheckRunning = true;
        twitterStreamBase.processTweets(function(err){
            if( err ){ console.log(err); }
            tweetProccessorCheckRunning = false;
        })
    }
}

if( process.env.NODE_TASK === 'watch' ){
    startTracking();    
} else if( process.env.NODE_TASK === 'process' ) {
    console.log('Process watching start.');
    setInterval(processTweets, TWEET_PROCESSOR_CHECK_TIME);
} else {
    throw('NODE_TASK flag must be set.');
}
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
            var companyList = _.map(data, function(d){
                return({
                    symbol: d[KEY_SYMBOL],
                    name: d[KEY_NAME]
                })
            })
            callback(null, companyList);
        })
    });
}

// function stringContainsComma(stringIn){
//     return !( stringIn.indexOf(',') === -1 )
// }

function escapeCommas(stringIn){
    return stringIn.split(',').join('\\,');
}

getCompanyList(function(err, companyList){
    if( err ){
        console.log(err);
        return;
    }

    var trackingString = '';
    _.each(companyList, function(company){
        trackingString += escapeCommas(company.symbol) + ', ';
        // trackingString += escapeCommas(company.name) + ', ';
    })
// console.log(trackingString);
    twitterStreamBase.track(trackingString);
// console.log(trackingString);

    console.log('Monitoring initialized.');

})
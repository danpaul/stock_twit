var config = {};

config.environment = process.env.NODE_ENV

if( config.environment === 'development' ){
    config.db = {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'twitter_stream_base',
            port:  8889
        }
    }
} else if( config.environment === 'production' ) {
    config.db = {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'twitter_stream_base',
            port:  8889
        }
    }
} else {
    throw('App must be started with env flag set.')
}

module.exports = config;
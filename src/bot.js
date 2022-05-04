"use strict";
require('dotenv').config();

const Twitter = require('twit');

const twitterOptions = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    //  bearer_token: process.env.TWITTER_BEARER_TOKEN,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
};
/*
const twitterOptions = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN

};*/


const T = new Twitter(twitterOptions);

const params = {
    q: '#indiedev',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

const retweet = (id) => {
    T.post("statuses/retweet/:id", {
        id: id.toString()
    }, (e, d, r) => {
        console.log(e);
        //console.log("here!!");

    });
}

const run = () => {
    T.get('search/tweets', params, function (err, data, response) {
        if (!err) {
            //data.statuses[0]
            //retweet_count
            //favorite_count


            const tweet = data.statuses[0];
            if (!tweet.favorited) {

                const id = tweet.id_str;
                retweet(id);
                // T.tweet();
            }
            console.log(data);
            // This is where the magic will happen
        } else {
            console.log(err);
        }
    })
}

const minutes = 2, the_interval = minutes * 60 * 1000;
setInterval(function () {
    console.log("running");
    run();
}, the_interval);
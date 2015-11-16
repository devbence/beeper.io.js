/*jslint vars: true,plusplus:true,devel:true,nomen:true,indent:4,maxerr:50*/
/*global define,require */ /*jshint globalstrict: true*/

// usage: nodejs beeper.io.js -t 'Here comes my message!'

"use strict";

var https = require('https');
var args = require('cli.args')('t:');
if (args.t === undefined) { args.t = "Undefined message"; }
var post_req = null,
    post_data = '{"sender_id":"564978613134610001810300","group_id":"5649790c3134610001820300","text":"' + args.t + '"}';

var post_options = {
    hostname: 'api.beeper.io',
    port: '443',
    path: '/api/messages',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Beeper-Application-Id': '2a47f5f3d7cc70c43434',
        'X-Beeper-REST-API-Key': '3553e9a28f54afe361946776bf83b1c8',
        'Content-Length': post_data.length
    }
};
post_req = https.request(post_options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
    });
});
post_req.on('error', function (e) {
    console.log('error: ' + e.message);
});
post_req.write(post_data);
post_req.end();
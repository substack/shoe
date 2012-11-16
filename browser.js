var DataChannel = require('data-channel');
var sockjs = require('sockjs-client');

module.exports = function (uri, cb) {
    if (typeof uri === "function") {
        cb = uri
        uri = null
    }

    if (/^\/\/[^\/]+\//.test(uri)) {
        uri = window.location.protocol + uri;
    }
    else if (!/^https?:\/\//.test(uri)) {
        uri = window.location.protocol + '//'
            + window.location.host
            + (/^\//.test(uri) ? uri : '/' + uri)
        ;
    }

    var sock = sockjs(uri || "/shoe");
    var stream = DataChannel(sock);
    stream.sock = sock;

    return stream;
};

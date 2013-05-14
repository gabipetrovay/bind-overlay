'use strict';

var Bind = require('github/jillix/bind');
var Events = require('github/jillix/events');

function processConfig(config) {
    config.options = config.options || {};

    return config;
}

module.exports = function (config) {
    config = processConfig(config);
    debugger;
};


'use strict';

var Bind = require('github/jillix/bind');
var Events = require('github/jillix/events');

module.exports = function (config) {

    var self = this;

    // process the event configuration
    Events.call(this, config);

    this.show = function(event, miid) {
        $('.modal', self.dom).modal();
    };
};


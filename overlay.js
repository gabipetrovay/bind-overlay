'use strict';

var Bind = require('github/jillix/bind');
var Events = require('github/jillix/events');

module.exports = function (config) {

    config.classes = {
        close: '',
        ok: '',
        cancel: '',
        body: ''
    };

    var self = this;

    // process the event configuration
    Events.call(this, config);

    this.show = function(event, miid) {
        $('.modal', self.dom).modal();

        var body = $('.overlay-body', self.dom);
        var waiter = $('.overlay-waiter', self.dom);

        // show busy body
        body.hide();
        waiter.show();

        // only if we find the body
        if (body.get(0)) {
            // first empty the body (from previous load)
            body.empty();
            // start loading the module
            setTimeout(function() {
                M(body.get(0), 'content', function() {
                    waiter.hide();
                    body.show();
                });
            }, 2000);
        }
    };
};


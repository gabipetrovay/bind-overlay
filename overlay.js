'use strict';

var Bind = require('github/jillix/bind');
var Events = require('github/jillix/events');

module.exports = function (config) {

    var config = processConfig(config);
    var self = this;

    // process the event configuration
    Events.call(self, config);

    self.show = function(event, miid) {

        var body = $('.' + config.classes.body, self.dom);
        var waiter = $('.' + config.classes.waiter, self.dom);
        var actionButtons = $('.' + config.classes.yes + ', .' + config.classes.no, self.dom);
        var allButtons = $('.' + config.classes.yes + ', .' + config.classes.no + ', .' + config.classes.cancel, self.dom);

        // the texts
        for (var i in config.texts) {
            $('.' + config.classes[i], self.dom).text(config.texts[i]);
        }

        allButtons.hide();

        for (var i in config.buttons) {
            $('.' + config.classes[config.buttons[i]], self.dom).show();
        }

        // show busy body
        body.hide();
        waiter.show();
        actionButtons.addClass(config.classes.disabled);

        // only if we find the body
        if (body.get(0)) {
            // first empty the body (from previous load)
            body.empty();
            // start loading the module
            setTimeout(function() {
                M(body.get(0), 'content', function() {
                    waiter.hide();
                    body.show();
                    actionButtons.removeClass(config.classes.disabled);
                });
            }, 2000);
        }

        // now show the overlay modal
        $('.modal', self.dom).modal();
    };

    self.hide = function(event) {
        $('.modal', self.dom).modal('hide');
    };

    self.yes = function() {
        self.hide();
        self.emit('yes');
    };

    self.no = function() {
        self.hide();
        self.emit('no');
    };

    self.cancel = function() {
        self.hide();
        self.emit('cancel');
    };

    // add handlers for each button
    for (var i in config.buttons) {
        if (self[config.buttons[i]]) {
            (function(i) {
                $('.' + config.classes[config.buttons[i]], self.dom).on('click', function() {
                    if (!$(this).hasClass('disabled')) {
                        self[config.buttons[i]]();
                    }
                    return false;
                });
            })(i);
        }
    }
};

function processConfig(config) {

    // defaults
    var defaultClasses = {
        title: 'overlay-title',
        body: 'overlay-body',
        waiter: 'overlay-waiter',
        yes: 'overlay-yes',
        no: 'overlay-no',
        cancel: 'overlay-cancel',
        buttons: 'overlay-buttons',
        disabled: 'disabled'
    };
    var defaultButtons = [ 'yes', 'no', 'cancel' ];
    var defaultTexts = {
        title: '',
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel'
    };

    config.classes = config.classes || {};
    for (var i in defaultClasses) {
        config.classes[i] = config.classes[i] || defaultClasses[i];
    }

    config.buttons = config.buttons || defaultButtons;

    config.texts = config.texts || defaultTexts;
    for (var i in defaultTexts) {
        config.texts[i] = config.texts[i] || defaultTexts[i];
    }

    return config;
}


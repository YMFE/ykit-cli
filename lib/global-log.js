'use strict'

require('colors');

module.exports = {
    warn: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).yellow);
    },
    info: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).blue);
    },
    infoBold: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).blue.bold);
    },
    success: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).green.bold);
    },
    error: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).red.bold);
    }
}

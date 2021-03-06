'use strict'

require('colors');

module.exports = {
    warn: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).yellow.bold);
    },
    info: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).blue.bold);
    },
    succeed: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).green.bold);
    },
    error: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).red.bold);
    },
    list: function() {
        console.info(('> ' + Array.prototype.join.call(arguments, ' ')).grey.bold);
    }
}

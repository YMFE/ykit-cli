module.exports = function() {
    global.path = require('path');
    global.fs = require('fs-extra');
    global.log = require('./global-log');
    global.VersionStore = require('./version-store');
}

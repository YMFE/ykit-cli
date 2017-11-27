const path = require('path');
const niv = require('cnpm-install-version');
const child_process = require('child_process');

const ykitModulesPath = path.join(process.env.HOME, '.ykit_modules');
let isInstalled = false;

// error handler
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
function exitHandler() {
    if(!isInstalled) {
        process.send('exit');
    }
    process.exit(1);
}

process.on('message', function(ykitPkgName) {
    niv.install(ykitPkgName, {
        quiet: true,
        destination: path.join(ykitModulesPath, ykitPkgName)
    });

    isInstalled = true;
    process.send('success');
    process.exit(0);
});

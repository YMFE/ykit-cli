const path = require('path');
const niv = require('cnpm-install-version');
const child_process = require('child_process');

const ykitModulesPath = path.join(process.env.HOME, '.ykit_modules');

process.on('message', function(ykitPkgName) {
    niv.install(ykitPkgName, {
        quiet: true,
        destination: path.join(ykitModulesPath, ykitPkgName)
    });

    process.send('success');
    process.exit(0);
});

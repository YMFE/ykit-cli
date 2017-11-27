const niv = require('cnpm-install-version');
const child_process = require('child_process');

let ykitPkgName = '';

process.on('message', function(m) {
  ykitPkgName = m;
});

niv.install(ykitPkgName, {
  destination: `../ykit_modules/${ykitPkgName}`
});

process.send('success');
process.exit();
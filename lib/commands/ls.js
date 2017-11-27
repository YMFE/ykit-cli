'use strict'
const Ora = require('ora');
const child_process = require('child_process');

module.exports = {
    pattern: 'ls',
    description: '查看已安装 YKit 版本，如 ykit-cli ls',
    alias: 'l',
    action: function() {
        const spinner = new Ora({
          text: '开始安装'
        });
        
        const ykitModulesPath = path.join(__dirname, '../../ykit_modules');
        const curVersion = VersionStore.getCurrent().version;
        const systemVersion = VersionStore.getSystem() && VersionStore.getSystem().version; // 系统版本
        curVersion && log.success('current ', 'v' + curVersion);
        fs.readdirSync(ykitModulesPath).forEach(function(dirName) {
            if (/ykit@(.+)/.test(dirName)) {
                if (dirName.split('@')[1] !== curVersion) {
                    log.list('        ', 'v' + dirName.split('@')[1]);
                }
            }
        });
        systemVersion && log.info('system  ', 'v' + systemVersion);

        // spinner.start();
        // process.nextTick(function () {
        //   spinner.color = 'yellow';
        //   spinner.text = 'Loading rainbows';
        // });

        // var n = child_process.fork(path.join(__dirname, '../child.js'));
        // n.on('message', function(m) {
        //   console.log('PARENT got message:', m);
        //   // spinner.succeed('完成');
        //    setTimeout(() => {
        //    spinner.succeed('完成');
        //   }, 2000);
        // });
        // n.send({ hello: 'world' });
        // n.send({ end: 'end'});
        
        // spinner.start();
        // // console.log('\n');
        // setTimeout(() => {
        //   spinner.color = 'yellow';
        //   spinner.text = 'Loading rainbows';
        // }, 0);
        
        // setTimeout(() => {
        //   spinner.succeed('完成');
        // }, 2000);
    }
}

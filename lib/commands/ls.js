'use strict'
const Ora = require('ora');

module.exports = {
    pattern: 'ls',
    description: '查找已安装YKit版本',
    action: function() {
        // const spinner = new Ora({
        //   text: '开始安装'
        // });
        
        // spinner.start();
        // console.log('\n');

        // setTimeout(() => {
          // spinner.color = 'yellow';
          // spinner.text = 'Loading rainbows';
        // }, 0);
        
        // setTimeout(() => {
        //   spinner.succeed();
        // }, 2000);


        const ykitModulesPath = path.join(__dirname, '../../ykit_modules');
        const curVersion = VersionStore.getCurrent().version;
        const systemVersion = VersionStore.getSystem() && VersionStore.getSystem().version;   // 系统版本
        curVersion && log.success('current ', 'v'+ curVersion);
        fs.readdirSync(ykitModulesPath).forEach(function (dirName) {
          if (/ykit@(.+)/.test(dirName)) {
            if(dirName.split('@')[1] !== curVersion) {
              log.list('        ', 'v'+ dirName.split('@')[1]);
            }
          }
        });
        systemVersion && log.info('system  ', 'v'+ systemVersion);
    }
}
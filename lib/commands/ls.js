'use strict'

module.exports = {
    pattern: 'ls',
    description: '查找已安装YKit版本',
    action: function() {
        const ykitModulesPath = path.join(__dirname, '../../ykit_modules');
        const curVersion = VersionStore.getCurrent();
        fs.readdirSync(ykitModulesPath).forEach(function (dirName) {
          if (/ykit@(.+)/.test(dirName)) {
            if(dirName.split('@')[1] === curVersion) {
              log.info('->    ', curVersion)
            } else {
              log.info('      ', dirName.split('@')[1]);
            }
          }
        });
    }
}
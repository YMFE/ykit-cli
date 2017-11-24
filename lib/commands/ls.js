'use strict'

module.exports = {
    pattern: 'ls',
    description: '查看已安装 YKit 版本，如 ykit-cli ls',
    alias: 'l',
    action: function() {
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
    }
}

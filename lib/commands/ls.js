'use strict'

module.exports = {
    pattern: 'ls',
    description: '查看已安装 YKit 版本，如 ykit-cli ls',
    alias: 'l',
    action: function() {
        const curVersion = VersionStore.getCurrent() && VersionStore.getCurrent().version;
        const systemVersion = VersionStore.getSystem() && VersionStore.getSystem().version; // 系统版本
        let versionNum = 0;

        // 打印当前版本
        if(curVersion) {
            log.success('current ', 'v' + curVersion);
        }

        // 打印 ykit_modules 中版本但不包含当前版本
        fs.readdirSync(ykitModulesPath).forEach(function(dirName) {
            versionNum += 1;
            if (/ykit@(.+)/.test(dirName)) {
                if (dirName.split('@')[1] !== curVersion) {
                    log.list('        ', 'v' + dirName.split('@')[1]);
                }
            }
        });

        // 打印系统版本
        if(systemVersion) {
            versionNum += 1;
            log.info('system  ', 'v' + systemVersion);
        }

        if(versionNum === 0) {
            log.info('当前未找到任何版本 ykit，可以使用 ykit-cli i latest 命令进行安装');
        }
    }
}

'use strict'

module.exports = {
    pattern: 'use [version]',
    description: '使用某版本，如 ykit-cli use 2.0.0',
    alias: 'u',
    action: function(version) {
        if(!version) {
            return log.error('需要指定版本，如 ykit-cli use 2.0.0');
        }

        const ykitPkgName = `ykit@${version}`;
        const versions = VersionStore.getAll();
        const willUseVersion = versions.filter(v => {
            return v.version === version
        })[0];

        if(!willUseVersion) {
            log.error(`未找到 ${ykitPkgName}\n`);
            log.info(`当前可用版本为：`);
            versions.forEach(v => {
                log.info(v.version);
            })
            return;
        }

        // 确保 ykit_modules 目录存在
        VersionStore.setCurrent(willUseVersion);
        log.success(`已使用 ${ykitPkgName}`);
    }
}
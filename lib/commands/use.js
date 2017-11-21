'use strict'

module.exports = {
    pattern: 'use [version]',
    description: '使用特定版本的 YKit',
    action: function(version) {
        const ykitPkgName = `ykit@${version}`;
        const versions = versionStore.getAll();
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
        versionStore.setCurrent(willUseVersion);
        log.success(`已使用 ${ykitPkgName}`);
    }
}

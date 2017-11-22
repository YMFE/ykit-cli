'use strict'

const child_process = require('child_process');

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
        const run = function(cmd) {
            log.info(`[running] ${cmd}`);
            child_process.execSync(cmd);
        }

        if(!willUseVersion) {
            log.error(`未找到 ${ykitPkgName}\n`);
            log.info(`当前可用版本为：`);
            versions.forEach(v => {
                log.info(v.version);
            });
            return;
        }

        const systemBinPath = child_process.execSync('which ykit', {encoding: 'utf-8'});
        run(`rm ${systemBinPath}`);
        run(`ln -s ${willUseVersion.binPath} ${systemBinPath}`);
        log.success(`已使用 ${ykitPkgName}`);
    }
}

'use strict'

const child_process = require('child_process');

module.exports = {
    pattern: 'uninstall [version]',
    description: '卸载某版本，如 ykit-cli uni 2.0.0',
    alias: 'uni',
    action: function(version) {
        const ykitPkgName = `ykit@${version}`;
        const versions = versionStore.getAll();
        const run = function(cmd) {
            log.info(`[running] ${cmd}`);
            child_process.execSync(cmd);
        }

        if(!versions.some(v => v.version === version)) {
            log.error(`卸载失败，${ykitPkgName} 不存在\n`)
            log.info(`当前版本列表：`);
            versions.forEach(v => {
                log.info(v.version);
            })
            return;
        }

        if(versionStore.getDefault().version === version) {
            // 如果是 default 版本
            run('sudo npm uni -g ykit');
        } else {
            // 非 default，卸载 ykit_modules 内版本
            const pkgPath = path.join(__dirname, '../../ykit_modules', ykitPkgName);
            run(`rm -rf ${pkgPath}`);
        }

        log.success(`${ykitPkgName} 卸载成功`)
    }
}

'use strict'

const child_process = require('child_process');

module.exports = {
    pattern: 'uninstall [version]',
    description: '卸载某版本，如 ykit-cli uninstall 2.0.0',
    alias: 'uni',
    action: function(version) {
        version = version.replace('v', '');

        if(!version) {
            return log.error('需要指定卸载版本，如 ykit-cli uninstall 2.0.0');
        }

        const ykitPkgName = `ykit@${version}`;
        const versions = VersionStore.getAll();
        const run = function(cmd) {
            log.info(`[running] ${cmd}`);
            child_process.execSync(cmd);
        }

        if(!versions.some(v => v.version === version)) {
            log.error(`卸载失败，${ykitPkgName} 不存在\n`);
            log.info(`当前版本列表：`);
            versions.forEach(v => {
                log.info(v.version);
            });
            return;
        }

        // 阻止卸载当前正在使用的版本
        if(VersionStore.getCurrent().version === version) {
            log.error(`卸载失败，当前正在使用 ${ykitPkgName} 版本，请先切换到其它版本\n`);

            log.info(`当前版本列表：`);
            versions.forEach(v => {
                log.info(v.version);
            });

            return;
        }

        if(VersionStore.getSystem() && VersionStore.getSystem().version === version) {
            // 如果是 system 版本
            run('sudo npm uni -g ykit');
        } else {
            // 非 system，ykit_modules 内版本
            const pkgPath = path.join(ykitModulesPath, ykitPkgName);
            run(`rm -rf ${pkgPath}`);
        }

        log.success(`${ykitPkgName} 卸载成功`)
    }
}

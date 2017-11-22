'use strict'

const child_process = require('child_process');

module.exports = {
    pattern: 'uninstall [version]',
    description: '卸载某版本，如 ykit-cli uninstall 2.0.0',
    alias: 'uni',
    action: function(version) {
        if(!version) {
            return log.error('需要指定卸载版本，如 ykit-cli uninstall 2.0.0');
        }

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
            });
            return;
        }

        // 如果卸载的是当前正在使用的版本，需要自动指定为另一版本
        var c = versionStore.getCurrent();
        console.log('c', c);
        process.exit(0)
        if(versionStore.getCurrent().version === version) {
            console.log('!!!');
            return ;
        }

        if(versionStore.getSystem().version === version) {
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

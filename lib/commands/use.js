'use strict'

const child_process = require('child_process');
const fs = require('fs')

module.exports = {
    pattern: 'use [version]',
    description: '使用某版本，如 ykit-cli use 2.0.0',
    alias: 'u',
    action: function(version) {
        version = version.replace('v', '');

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

        const systemBinPath = path.join(
            child_process.execSync('npm bin -g', {encoding: 'utf-8'}).trim(), 'ykit'
        );

        if(systemBinPath) {
            /**
             * 在第一次使用nvm安装node时, 系统bin目录中并没有ykit软链
             * 此时运行 rm 命令会报错(找不到文件)
             * 增加一层判断, 如果文件存在才执行删除操作
             */
            if(fs.existsSync(systemBinPath)){
                run(`rm ${systemBinPath}`);
            }
        }

        run(`ln -s ${willUseVersion.binPath} ${systemBinPath}`);

        log.succeed(`已使用 ${ykitPkgName}`);
    }
}

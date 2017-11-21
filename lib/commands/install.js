'use strict'

const niv = require('cnpm-install-version');

module.exports = {
    pattern: 'install [version]',
    description: '安装某版本，如 ykit-cli install 2.0.0',
    alias: 'i',
    action: function(version) {
        const ykitPkgName = `ykit@${version}`;

        // 确保 ykit_modules 目录存在
        fs.ensureDirSync(path.join(__dirname, '../../ykit_modules'));

        log.info(`开始安装 ${ykitPkgName}`);
        niv.install(ykitPkgName, {
            destination: `../ykit_modules/${ykitPkgName}`
        });

        log.info(`已安装 ${ykitPkgName}`);
    }
}

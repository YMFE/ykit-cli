'use strict'

module.exports = {
    pattern: 'install [version]',
    description: '安装特定版本的 YKit',
    action: function(version) {
        log.info(`开始安装 ykit@${version}`);
    }
}

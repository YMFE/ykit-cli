'use strict'

const child_process = require('child_process');
const json5 = require('json5');

module.exports = {
    pattern: 'remote',
    description: '查看远程可安装版本，如 ykit-cli remote',
    alias: 'r',
    action: function() {
        const run = function(cmd) {
            log.info(`[running] ${cmd}`);
            return child_process.execSync(cmd, {encoding: 'utf-8'});
        }

        const ykitInfo = json5.parse(run('npm view ykit --registry http://registry.npm.taobao.org'));
        log.info('ykitInfo', JSON.stringify(ykitInfo['dist-tags']));
    }
}

'use strict'

const niv = require('cnpm-install-version');
const semver = require('semver');
const json5 = require('json5');
const child_process = require('child_process');
const use = require('./use').action;

module.exports = {
    pattern: 'install [version]',
    description: '安装某版本，如 ykit-cli install 2.0.0',
    alias: 'i',
    action: function(version) {
        if(!version) {
            return log.error('需要指定安装版本，如 ykit-cli install 2.0.0');
        }

        // 处理通过 tag 安装，将 tag 转换为数字版本
        if(!semver.valid(version)) {
            const tags = json5.parse(
                child_process.execSync(
                    'npm view ykit --registry http://registry.npm.taobao.org',
                    {encoding: 'utf-8'}
                )
            )['dist-tags'];

            let tagVersion;
            Object.keys(tags).forEach((tagName, i) => {
                if(tagName === version) {
                    tagVersion = tags[tagName];
                }
            })

            if(!tagVersion) {
                log.error(`未找到 tag <${version}>\n`);
                log.info('目前 tag 列表');
                Object.keys(tags).map((tagName, i) => {
                    log.info(`<${tagName}>: ${tags[tagName]}`)
                })
                return;
            }

            version = tagVersion;
        }

        const ykitPkgName = `ykit@${version}`;

        // 确保 ykit_modules 目录存在
        const ykitModulesPath = path.join(__dirname, '../../ykit_modules');
        fs.ensureDirSync(ykitModulesPath);

        log.info(`开始安装 ${ykitPkgName} ...`);

        try {
            niv.install(ykitPkgName, {
                destination: path.join(ykitModulesPath, ykitPkgName)
            });
        } catch(e) {
            if (e.code === 'EACCES') {
                log.error('权限不足，请添加 sudo 重试');
            } else {
                log.error(e);
            }
        }

        log.info(`已安装 ${ykitPkgName}`);

        // 使用最新安装的版本
        use(version);
    }
}

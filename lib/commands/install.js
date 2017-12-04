'use strict'

const semver = require('semver');
const json5 = require('json5');
const child_process = require('child_process');
const use = require('./use').action;
const requireg = require('requireg');
const npm = requireg('npm');

module.exports = {
    pattern: 'install [version]',
    description: '安装某版本，如 ykit-cli install 2.0.0',
    alias: 'i',
    action: function(version) {
        version = version.replace('v', '');

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

        npm.load({
            loaded: false
        }, function(err) {
            const tempPath = path.join(ykitModulesPath, '.temp');
            const ykitPkgName = `ykit@${version}`;

            npm.commands.install(tempPath, [ykitPkgName], function(err, data) {
                if(err) {
                    log.error(err)
                } else {
                    log.succeed(`已安装${ykitPkgName}`);

                    // 移动 ykit
                    fs.moveSync(
                        path.join(tempPath, 'node_modules/ykit'),
                        path.join(ykitModulesPath, ykitPkgName),
                        { overwrite: true }
                    );

                    // 将 ykit 同级模块移动到 ykit/node_modules
                    const installPkgPath = path.join(ykitModulesPath, ykitPkgName, 'node_modules')
                    fs.ensureDirSync(installPkgPath);
                    fs.moveSync(
                        path.join(tempPath, 'node_modules'),
                        installPkgPath,
                        { overwrite: true }
                    );

                    fs.removeSync(tempPath);
                    use(version);
                }
            });
        });
    }
}

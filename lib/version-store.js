'use strict'

const child_process = require('child_process');

class VersionItem {
    constructor(props) {
        if(props.version && props.binPath) {
            this.version = props.version;
            this.binPath = props.binPath;
        } else {
            throw new Error('VersionItem 获取失败');
        }
    }
}

class VersionStore {
    getAll() {
        const versions = [];

        if(this.getSystem()) {
            versions.push(this.getSystem());
        }

        fs.readdirSync(ykitModulesPath).forEach((dirName) => {
            if (/ykit@(.+)/.test(dirName)) {
                versions.push(new VersionItem({
                    version: dirName.split('@')[1],
                    binPath: path.join(ykitModulesPath, dirName, 'bin/ykit')
                }))
            }
        });

        return versions;
    }

    // 获取当前系统内置 ykit 版本
    getSystem() {
        const rootPath = path.join(
            child_process.execSync('npm root -g', {encoding: 'utf-8'}).trim(),
            'ykit'
        );
        const binPath = path.join(rootPath, 'bin/ykit');

        if(fs.existsSync(binPath)) {
            const version = require(path.join(rootPath, 'package.json')).version;
            return new VersionItem({
                version,
                binPath
            });
        } else {
            return null;
        }
    }

    // 获取当前正在使用的 ykit 版本
    getCurrent() {
        let version, binPath;

        try {
            binPath = child_process.execSync(
                'readlink `which ykit`', {encoding: 'utf-8'}
            ).trim();
        } catch(e) {
            return null;
        }

        if(path.isAbsolute(binPath)) {
            // 说明在 ykit_modules 中
            version = require(
                path.join(binPath, '../../package.json')
            ).version;
        } else {
            // 说明是系统版本
            version = require(
                path.join(binPath, '../../lib/node_modules/ykit/package.json')
            ).version;
        }

        return new VersionItem({
            version,
            binPath
        });
    }
}

module.exports = new VersionStore();

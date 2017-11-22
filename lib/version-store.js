'use strict'

const child_process = require('child_process');

class YkitVerEntity {
    constructor(version, binPath) {
        this.version = version;
        this.binPath = binPath;
    }
}

class VersionStore {
    getAll() {
        const versions = [];
        const ykitModulesPath = path.join(__dirname, '../ykit_modules');
        fs.ensureDirSync(ykitModulesPath);

        if(this.getSystem()) {
            versions.push(this.getSystem());
        }

        fs.readdirSync(ykitModulesPath).forEach((dirName) => {
            if (/ykit@(.+)/.test(dirName)) {
                versions.push({
                    version: dirName.split('@')[1],
                    binPath: path.join(ykitModulesPath, dirName, 'bin/ykit')
                })
            }
        });

        return versions;
    }

    // 获取当前系统内置 ykit 版本
    getSystem() {
        const requireg = require('requireg');
        const mainPath = requireg.resolve('ykit');

        if(!mainPath) {
            return log.warn('全局环境中未找到 ykit');
        }

        const rootPath = mainPath.match(/.+node_modules[\/||\\]ykit/)[0];
        const binPath = path.join(rootPath, 'bin/ykit');
        const version = require(path.join(rootPath, 'package.json')).version;

        return {
            version,
            binPath
        };
    }

    // 获取当前正在使用的 ykit 版本
    getCurrent() {
        const binPath = child_process.execSync(
            'readlink `which ykit`', {encoding: 'utf-8'}
        ).trim();
        const version = require(path.join(binPath, '../../package.json')).version;
        return {
            version,
            binPath
        };
    }
}

module.exports = new VersionStore();

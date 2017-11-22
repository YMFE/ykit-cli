'use strict'

const child_process = require('child_process');

class VersionStore {
    constructor() {
        this.current;
        this.default;
    }

    getAll() {
        const versions = [];

        // 确保 ykit_modules 目录存在
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

    setCurrent(val) {
        const systemBinPath = child_process.execSync('which ykit', {encoding: 'utf-8'});
        this.run(`rm ${systemBinPath}`)
        this.run(`ln -s ${val.binPath} ${systemBinPath}`)
        this.current = val;
    }

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

    run(cmd) {
        log.info(`[running] ${cmd}`);
        child_process.execSync(cmd);
    }
}

module.exports = new VersionStore();

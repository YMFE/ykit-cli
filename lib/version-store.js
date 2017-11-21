'use strict'

const child_process = require('child_process');

class versionStore {
    constructor() {
        this.current;
        this.default;
    }

    getAll() {
        const versions = [];

        // 确保 ykit_modules 目录存在
        const ykitModulesPath = path.join(__dirname, '../ykit_modules');
        fs.ensureDirSync(ykitModulesPath);

        if(this.getDefault()) {
            versions.push(this.getDefault());
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

    setDefault(val) {
        this.default = val;
    }

    getDefault() {
        return this.default;
    }

    setCurrent(val) {
        const systemBinPath = child_process.execSync('which ykit', {encoding: 'utf-8'});
        this.run(`rm ${systemBinPath}`)
        this.run(`ln -s ${val.binPath} ${systemBinPath}`)
        this.current = val;
    }

    getCurrent() {
        return this.current;
    }

    run(cmd) {
        log.info(`[running] ${cmd}`);
        child_process.execSync(cmd);
    }
}

module.exports = new versionStore();

'use strict'

module.exports = function() {
    const requireg = require('requireg');
    const mainPath = requireg.resolve('ykit');

    if(!mainPath) {
        return log.warn('全局环境中未找到 ykit');
    }

    const rootPath = mainPath.match(/.+node_modules[\/||\\]ykit/)[0];
    const binPath = path.join(rootPath, 'bin/ykit');
    const version = require(path.join(rootPath, 'package.json')).version;

    versionStore.setDefault({
        version,
        binPath
    });

    const defaultYKit = versionStore.getDefault();
}

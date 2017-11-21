'use strict'

module.exports = {
    pattern: 'ls',
    description: '查找已安装YKit版本',
    action: function() {
        const dir = path.join(__dirname, '../../ykit_modules');
        // 确保 ykit_modules 目录存在
        fs.ensureDirSync(dir);
        const files = fs.readdirSync(dir);
        let versionCouter = 0;
        files.forEach(function (filename) {
          let stats = fs.statSync(path.join(dir, filename));
          if(stats.isDirectory()) {
            versionCouter ++;
            let version = filename.split('@')[1];
            log.info(version);
          }
        });
        versionCouter === 0 && log.info('没有安装ykit任何版本');
    }
}
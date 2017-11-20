module.exports = {
    pattern: 'install [version]',
    description: '安装特定版本的 YKit',
    action: function(version) {
        console.log(`开始安装 ykit@${version}`);
    }
}

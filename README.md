# ykit-cli

YKit 版本管理工具

## 安装

```shell
sudo npm i ykit-cli -g
# 或者使用 cnpm 安装
sudo npm i ykit-cli -g --registry=https://registry.npm.taobao.org
```

## 使用

### 安装并激活某版本

```shell
ykit-cli i latest # 安装最新版本
ykit-cli i 0.7.2 # 安装特定版本
ykit-cli i 0.6.0 # 安装特定版本
```

### 切换版本
```shell
ykit-cli use 0.7.0
```

### 查看当前已安装版本
```shell
ykit-cli ls
```

### 查看远端版本
```shell
ykit-cli remote
```

### 卸载某版本
```shell
ykit-cli uni 0.7.0
```

## 相关链接
[YKit](https://github.com/YMFE/ykit)

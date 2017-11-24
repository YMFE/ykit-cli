#!/usr/bin/env node

'use strict'

global.path = require('path');
global.fs = require('fs-extra');
global.log = require('./lib/global-log');
global.VersionStore = require('./lib/version-store');

const program = require('commander');
const commands = {
    install: require('./lib/commands/install'),
    uninstall: require('./lib/commands/uninstall'),
    use: require('./lib/commands/use'),
    remote: require('./lib/commands/remote'),
    ls: require('./lib/commands/ls')
}

Object.keys(commands).map(name => {
    const commandItem = commands[name];
    program
        .command(commandItem.pattern)
        .alias(commandItem.alias)
        .description(commandItem.description)
        .action(commandItem.action);
})

program
    .option('-v, --version', 'check ykit-cli version')
    .parse(process.argv);

// 没有任何命令和参数
if(process.argv[2] === '-v' || process.argv[2] === '--version') {
    console.log(require('./package.json').version);
}

// 没有任何命令和参数
if(process.argv.length === 2) {
    console.log('program', process.argv.length ,program.help());
}

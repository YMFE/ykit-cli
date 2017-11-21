#!/usr/bin/env node

'use strict'

global.path = require('path');
global.fs = require('fs-extra');
global.log = require('./lib/global-log');
global.versionStore = require('./lib/version-store');

const program = require('commander');
const commands = {
    install: require('./lib/commands/install'),
    use: require('./lib/commands/use')
    // version
    // ls
    // remove
}

Object.keys(commands).map(name => {
    const commandItem = commands[name];
    program
        .command(commandItem.pattern)
        .description(commandItem.description)
        .action(commandItem.action);
})

// FIXME 把这个移到 postinstall 中执行
require('./lib/add-system-default')();

program.parse(process.argv);

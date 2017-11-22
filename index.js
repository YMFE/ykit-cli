#!/usr/bin/env node

'use strict'

global.path = require('path');
global.fs = require('fs-extra');
global.log = require('./lib/global-log');
global.versionStore = require('./lib/version-store');

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

program.parse(process.argv);

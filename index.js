#!/usr/bin/env node

'use strict'

global.path = require('path');
global.fs = require('fs-extra');
global.log = require('./lib/global-log');

const program = require('commander');
const commands = {
    install: require('./lib/commands/install'),
    // use
    // version
    // ls
    ls: require('./lib/commands/ls')
}

Object.keys(commands).map(name => {
    const commandItem = commands[name];
    program
        .command(commandItem.pattern)
        .description(commandItem.description)
        .action(commandItem.action);
})

program.parse(process.argv);

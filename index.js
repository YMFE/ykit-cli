#!/usr/bin/env node

'use strict'

const program = require('commander');
const commands = {
    install: require('./lib/commands/install')
}

Object.keys(commands).map(name => {
    const commandItem = commands[name];
    program
        .command(commandItem.pattern)
        .description(commandItem.description)
        .action(commandItem.action);
})

program.parse(process.argv);

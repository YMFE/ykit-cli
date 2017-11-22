#!/usr/bin/env node

'use strict'

const setup = require('./lib/setup');
setup();

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

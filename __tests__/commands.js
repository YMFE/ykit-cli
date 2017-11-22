'use strict'

const setup = require('../lib/setup');
setup();

const install = require('../lib/commands/install.js');
const use = require('../lib/commands/use.js');

const prevVersion = '0.2.1';
const nextVersion = '0.2.3';

test(
    `<install ${prevVersion}> should add to ${prevVersion} list`,
    () => {
        install.action(prevVersion);
        const versions = VersionStore.getAll().map(v => v.version);
        expect(versions).toContain(prevVersion);
    }
);

test(
    `<install ${nextVersion}> should add to ${nextVersion} list`,
    () => {
        install.action(nextVersion);
        const versions = VersionStore.getAll().map(v => v.version);
        expect(versions).toContain(nextVersion);
    }
);

test(
    `<use ${prevVersion}> should set current version ${prevVersion}`,
    () => {
        use.action('0.2.1');
        expect(VersionStore.getCurrent().version).toBe('0.2.1');
    }
);

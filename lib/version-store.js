'use strict'

class versionStore {
    constructor() {
        this.versions = [];
        this.current;
    }

    get() {
        return this.versions;
    }

    set(versionData) {
        this.versions.push(versionData)
    }

    setCurrent(val) {
        this.current = val;
    }

    getCurrent() {
        return this.current;
    }
}

module.exports = new versionStore();

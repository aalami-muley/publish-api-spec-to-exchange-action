"use strict";

let core;
try {
    core = require('@actions/core');
} catch (error) {
}

module.exports = {
    "info": (core) ? core.info : console.log,
    "warn": (core) ? core.warning : console.log,
    "error": (core) ? core.error : console.log,
}
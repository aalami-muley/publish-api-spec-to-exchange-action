"use strict";

const core = require('@actions/core');

const main = async () => {
    try {
        const organizationId = core.getInput('ORGANIZATION_ID');
        const userId = core.getInput('USER_ID');
        const branch = core.getInput('BRANCH');
        const classifier = core.getInput('CLASSIFIER');
        const name = core.getInput('PROJECT_NAME');
        const spec = core.getInput('SPEC_PATH');
        const assetId = core.getInput('ASSET_ID');
        const version = core.getInput('VERSION');
        const apiVersion = core.getInput('API_VERSION');
        const token = core.getInput('TOKEN');

        await require("./publish")(name, branch, { token, organizationId, userId }, { spec, apiVersion, version, assetId, classifier });
    } catch (error) {
        core.setFailed(error.message);
    }
};

main();

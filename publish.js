"use strict";

"use strict";

const client = require("./client");
const lib = require("./lib");
const log = require("./log");

module.exports = async function (name, branch, credentials, { spec, apiVersion, version, assetId, classifier }) {
    apiVersion = apiVersion || "0.1";
    version = version || "1.0.0";
    classifier = classifier || "raml";

    const project = await lib.getProject(credentials, name);
    if (!project) {
        throw new Error(`Projet with name ${name} is not found.`);
    }
    let projectId = project.id;
    log.info(`Using project with id ${projectId}`);

    const assets = await lib.getAssets(credentials);
    const asset = assets.filter(function (asset) {
        return asset.assetId === assetId && asset.version === version && asset.versionGroup === apiVersion;
    })[0];

    if(asset) {
        throw new Error(`Asset with id ${assetId} and version ${version} and apiVersion ${apiVersion} is already created.`);
    }

    try {
        await lib.aquireLock(credentials, projectId, branch);
        log.info(`Successfully aquired a new lock.`);

        const data = { name, apiVersion, version, "tags": [], "main": spec, assetId, "groupId": credentials.organizationId, classifier, "isVisual": false, "metadata": { "projectId": projectId, "branchId": branch }, "publishList": [], "originalFormatVersion": "1.0", "status": "published" };
        (await client.get(credentials).post(`/designcenter/api-designer/projects/${projectId}/branches/${branch}/publish/exchange`, data));
        log.info(`Successfully published a new version of a project with data ${JSON.stringify(data)}.`);
        log.info(`Project successfully published to Exchange.`);
    } catch (error) {
        log.error(error);
        throw error;
    } finally {
        await lib.releaseLock(credentials, projectId, branch);
        log.info(`Lock is successfully released.`);
    }
}
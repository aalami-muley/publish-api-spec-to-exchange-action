"use strict";

"use strict";

const client = require("./client");
const lib = require("./lib");
const log = require("./log");

module.exports = async function (name, branch, credentials, { spec, apiVersion, version, assetId, groupId, classifier }) {
    apiVersion = apiVersion || "0.1";
    version = version || "1.0.0";
    classifier = classifier || "raml";

    const project = await lib.getProject(credentials, name);
    if (!project) {
        throw new Error(`Projet with name ${name} is not found.`);
    }
    let projectId = project.id;

    try {
        await lib.aquireLock(credentials, projectId, branch);
        log.info(`Successfully aquired a new lock.`);

        const data = { name, apiVersion, version, "main": spec, classifier, assetId, groupId };
        console.log(data);
        (await client.get(credentials).post(`/projects/${projectId}/branches/${branch}/publish/exchange`, data));
        log.info(`Project successfully published to Exchange.`);
    } catch (error) {
        //log.error(error);
    } finally {
        await lib.releaseLock(credentials, projectId, branch);
    }
}
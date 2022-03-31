"use strict";

const fs = require("fs");
const path = require("path");
const client = require("./client");

module.exports = {
    async getProject(credentials, name) {
        const projects = (await client.get(credentials).get("/designcenter/api-designer/projects")).data;
        return projects.filter(function (project) {
            return project.name === name;
        })[0];
    },
    async getBranch(credentials, projectId, name) {
        const branches = (await client.get(credentials).get(`/designcenter/api-designer/projects/${projectId}/branches`)).data;
        return branches.filter(function (branch) {
            return branch.name === name;
        })[0];
    },
    async releaseLock(credentials, projectId, branch) {
        (await client.get(credentials).post(`/designcenter/api-designer/projects/${projectId}/branches/${branch}/releaseLock`, {})).data;
    },
    async aquireLock(credentials, projectId, branch) {
        (await client.get(credentials).post(`/designcenter/api-designer/projects/${projectId}/branches/${branch}/acquireLock`, {})).data;
    },
    async getAssets(credentials) {
        const url = `/exchange/api/v2/assets?search=&types=api-group&types=connector&types=custom&types=data-weave-library&types=evented-api&types=example&types=extension&types=http-api&types=policy&types=raml-fragment&types=rest-api&types=soap-api&types=template&status=development&status=published&status=deprecated&domain=&organizationId=${credentials.organizationId}&masterOrganizationId=&offset=0&limit=20&sharedWithMe=`;
        return (await client.get(credentials).get(url)).data;
    }
}
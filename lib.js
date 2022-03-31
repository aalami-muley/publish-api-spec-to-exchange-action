"use strict";

const fs = require("fs");
const path = require("path");
const client = require("./client");

module.exports = {
    async getProject(credentials, name) {
        const projects = (await client.get(credentials).get("/projects")).data;
        return projects.filter(function (project) {
            return project.name === name;
        })[0];
    },
    async getBranch(credentials, projectId, name) {
        const branches = (await client.get(credentials).get(`/projects/${projectId}/branches`)).data;
        return branches.filter(function (branch) {
            return branch.name === name;
        })[0];
    },
    async releaseLock(credentials, projectId, branch) {
        (await client.get(credentials).post(`/projects/${projectId}/branches/${branch}/releaseLock`, {})).data;
    },
    async aquireLock(credentials, projectId, branch) {
        (await client.get(credentials).post(`/projects/${projectId}/branches/${branch}/acquireLock`, {})).data;
    }
}
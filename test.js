"use strict";

const token = process.argv[2];
const organizationId = "f60b1434-1059-4f0f-a28c-ccf4a9be05b2";
const userId = "612cf2dd-9f92-4a08-97ed-f6be4faf06ca";

const branch = "master";
let classifier = "raml";
let subType;

let name = "raml-pipeline-demo";
const spec = name + ".raml";

const apiVersion = "0.1";
const version = "1.0.0";
const assetId = "import-specification-action-demo";

(async function () {
    await require("./publish")(name, branch, { token, organizationId, userId }, { spec, apiVersion, version, assetId, "groupId": organizationId, classifier });
})();
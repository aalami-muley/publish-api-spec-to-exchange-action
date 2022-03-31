# Publish an asset to Exchage

This action helps to publish an asset to Exchange.

## Inputs

|Name|Desription|Required|
|---|---|---|
|ORGANIZATION_ID|The organization id|true|
|USER_ID|The user id used to create the design center project|true|
|BRANCH|The branch used to commit the specification project|true|
|CLASSIFIER|The classifier of the specification project|true|
|PROJECT_NAME|The specification project name|true|
|SPEC_PATH|The relative path of the root specification file|true|
|FILES_PATHS|The relative path of the files to import|true|
|TOKEN|The authorization token|true|
|VERSION|The asset version|true|
|API_VERSION|The api version|true|
|ASSET|The asset id|true|

## Secrets

The action uses a TOKEN secret used to authorize the actions to Anypoint Platform.

## Example usage

```yaml
uses: aalami-muley/import-api-spec-to-design-center-action@main
with:
    ORGANIZATION_ID: 'f60b1434-1059-4f0f-a28c-ccf4a9be05b2'
    USER_ID: '612cf2dd-9f92-4a08-97ed-f6be4faf06ca'
    BRANCH: 'master'
    CLASSIFIER: 'raml'
    PROJECT_NAME: 'Import Specification Action DEMO'
    SPEC_PATH: 'import-specification-action-demo.raml'
    TOKEN: '${{ secrets.TOKEN }}'
    VERSION: '1.0.2'
    API_VERSION: 'v1'
    ASSET: 'import-specification-action-demo'
```

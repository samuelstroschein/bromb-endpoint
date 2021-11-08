# bromb-endpoint
The self-hostable endpoint for the [bromb feedback widget](https://github.com/samuelstroschein/bromb). 
The repository is build to be 
- one click deployable via deno deploy
- write own integrations 
- adjust the submission categories 
- updatable by pulling from the upstream 

## Getting Started

### 1. Fork this repository
Fork this repository to adjust the [widgetConfig](https://github.com/samuelstroschein/bromb-endpoint/blob/main/widgetConfig.json), write and use integrations and deploy your endpoint. On top of that, you can constantly update your endpoint by fetching from [the upstream](https://github.com/samuelstroschein/bromb-endpoint).

<img src="https://raw.githubusercontent.com/samuelstroschein/bromb-endpoint/main/assets/fork-repository.png" width="500"/>


### 2. Run locally

1. Install deno https://deno.land/#installation
2. run `deno run --allow-net --allow-env --allow-read mod.ts`
3. open http://localhost:7600

Try out the widget. Each submission should appear in the terminal since the endpoint is using the `consoleLog` integration by default.

### 3. Deploy

1. Click the button [![image](https://user-images.githubusercontent.com/23035000/116934239-b0d4a400-ac32-11eb-83f6-0c4119d59fa8.png)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/%3CYOUR%20GITHUB%20USERNAME%3E/bromb-endpoint/main/mod.ts&env=INTEGRATION_FILE_NAME) button
2. Click deploy
3. Change <YOUR GITHUB USERNAME> in the url to yours
4. Link your github repo by copy and pasting this link `https://github.com/<YOUR GITHUB USERNAME>/bromb-endpoint/blob/main/mod.ts`
  
<img src="https://raw.githubusercontent.com/samuelstroschein/bromb-endpoint/main/assets/deno-deploy.gif" width="500"/>
  
### 4. Configure your integration 

Simply change the `INTEGRATION_FILE_NAME` to the integration you want to use. Most integrations will make use of additional env variables that you have to define as specified at the top of the integration file. 
 
<img src="https://raw.githubusercontent.com/samuelstroschein/bromb-endpoint/main/assets/env-variables.png" width="500"/>

### 5. Embed the bromb widget and point to your endpoint
  
```html
<head>
  <script 
    async 
    defer 
    src="https://cdn.jsdelivr.net/gh/samuelstroschein/bromb/packages/web/dist/widget.js"
    data-theme="light"
    data-custom-endpoint="<YOUR ENDPOINT LINK>"
  ></script>
</head>
  
```
  
## Config

You can adjust the [widgetConfig.json](https://github.com/samuelstroschein/bromb-endpoint/blob/main/widgetConfig.json) file in your fork as you wish. 
 
## Trigger the widget

Simply create an anchor in your html with a [trigger link](https://docs.bromb.co/Good-To-Know/wQs4WXa7Psb8rqWepyQJxe/Trigger-Links/tcdx5kdjtBexrDJrpGWYdC) with a configs `organizationName` and `projectName`:
```html
  <a href="https://submission.bromb.co/exampleOrganization/exampleProject">Give feedback</a>
```
  

  

# Mobilizon-typescript-SDK


This is a minimal package which allows one to interface a Mobilizon-instance.

Project structure:

- The type definitions can be found in 'Definitions'. They are generated by the graph-ql scheme found at https://framagit.org/framasoft/mobilizon/-/blob/main/schema.graphql
- Instance is the main object to interface with a Mobilizon-server and can be used as following:

```typescript

import {MobilizonInstance, AuthorizedInstance} from "./Instance";

const instance = new MobilizonInstance()

```

## NPM-scripts

- "build": builds the project
- "patch": Builds the project, moves the output to the 'bot'-package. Use this to make changes and apply them to the bot, without the need to publish
- "test": Runs unit tests
- "publish": Publishes a new version to your npm-account. Login is necessary
- "generate-interfaces": Generates new interfaces based on the graphql-schema file
 

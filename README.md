# SmoothIntegration Node.js Library

[![Version](https://img.shields.io/npm/v/@smooth-integration/sdk-node.svg)](https://www.npmjs.org/package/@smooth-integration/sdk-node)
[![Build Status](https://github.com/SmoothIntegration/sdk-node/actions/workflows/check.yml/badge.svg?branch=master)](https://github.com/SmoothIntegration/sdk-node/actions?query=branch%3Amaster)
[![Try on RunKit](https://badge.runkitcdn.com/@smooth-integration/sdk-node.svg)](https://runkit.com/npm/@smooth-integration/sdk-node)

The SmoothIntegration Node library provides convenient access to the SmoothIntegration API from
applications written in server-side JavaScript.

## Documentation

See the [`@smooth-integration/sdk-node` API docs](https://smooth-integration.com/docs) for Node.js.

## Requirements

Node 18 or higher.

## Installation

Install the package with:

```sh
npm install @smooth-integration/sdk-node
yarn add @smooth-integration/sdk-node
pnpm install @smooth-integration/sdk-node
```

## Dependencies

This library is dependency free.

If you require a lower version of Node.js, you will need to provide a shim for `fetch`.

## Usage

The package needs to be configured with your client id and client secret, which are
available in the [SmoothIntegration Dashboard](https://app.smooth-integration.com/secrets). Require it with values:

```js
const client = require('@smooth-integration/node-sdk')('<your_client_id>', '<your_client_secret>');

client.cdc
    .get({
        structure: 'normalised',
    })
    .then((events) => console.log(events))
    .catch((error) => console.error(error));
```

Or using ES modules and `async`/`await`:

```js
import Client from '@smooth-integration/node-sdk';

const client = new Client('<your_client_id>', '<your_client_secret>');

const events = await client.cdc.get({
    structure: 'normalised',
});

console.log(events);
```

## Usage with TypeScript

```ts
import Client, { CDCConfig, Event } from '@smooth-integration/node-sdk';

const client: Client = new Client('<your_client_id>', '<your_client_secret>');

const logEvents = async () => {
    const config: CDCConfig = {
        structure: 'normalised',
    };
    const events: Event[] = await client.cdc.get(config);
    console.log(events);
};
logEvents();
```

## Usage with Deno

Import using npm specifiers:

```ts
import Client from 'npm:@smooth-integration/node-sdk';
```

## Streaming Events

If you want to receive new events as they come in, we recommend to use the built-in `client.cdc.stream` rather than
polling using `client.cdc.get` yourself.

```ts
import Client, { Event } from '@smooth-integration/node-sdk';

const client: Client = new Client('<your_client_id>', '<your_client_secret>');

const onEvent = async (event: Event): Promise<void> => {
    console.log('Received event', event.event_id, event.document_id, event);
};

client.cdc.stream({
    onEvent: onEvent,
    structure: 'normalised',
    onFailure: 'log',
});
```

## Examples

We've provided some examples in the `examples` directory.

To run them, you'll need to set your client id and client secret.

Additionally, you will also need to create a DataSource in the SmoothIntegration dashboard and set the
`dataSourceId` in the examples.

| Example TS                                                                            | Description                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Minimal](https://github.com/SmoothIntegration/sdk-node/tree/master/examples/minimal) | Minimal code for OAuth of QuickBooks & retrieve live data. |

## Development

Run all tests:

```bash
$ pnpm install
$ pnpm test
```

If you do not have PNPM installed, https://pnpm.io/installation.

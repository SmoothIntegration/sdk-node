# Minimal Deno example

This example demonstrates how to use SmoothIntegration with Deno and Typescript to allow for OAuth of QuickBooks and retrieve live data.

## Installation

```bash
deno install
```

## Prerequisites

To run this demo, you will need a free Smooth Integration account. You can sign up [here](https://app.smoothintegration.com/signup).

You will need to get your Client ID and Client Secret, which can be found in the [Smooth Integration Dashboard > Secrets](https://app.smoothintegration.com/secrets).

Lastly, you will need a CompanyID of a Company on Smooth Integration, which you can create [Smooth Integration Dashboard > Companies](https://app.smoothintegration.com/companies).

## Run the Example

Update the `main.ts` file with your Client ID, Client Secret, and Company ID.

```bash
deno task start
```

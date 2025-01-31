# Payments Dashboard

This is a React front-end for the corresponding API in this project: [ms-pcm-hackday](https://github.com/tchappus/ms-pcm-hackday)

This was developed as part of a hackathon project. The concept was to create a proof-of-concept payment system using the following technologies:
* Azure Service Bus
* Azure Cosmos DB
* Redis Cache
* Docker

This dashboard subscribes to an event stream produced by the API component and updates in realtime. The updates are fed by a changefeed produced by Cosmos DB

![Screen shot](./screenshot.png)

The data depicted is fictional and purely for demonstration purposes.

## Installation and Development set-up

```
npm install
npm run dev
```
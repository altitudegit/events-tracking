# API Endpoints

Below are the available API endpoints for tracking:

Endpoint | Description
---------|------------
`POST /logs` | Logs a new event into the system
`DELETE /logs/:key?` | Deletes events in the system. If a key is provided, only events with that key will be deleted.
`POST /filter` | Queries events in the system.

The post body for the `POST /logs` endpoint is below:

Endpoint | Data Type | Description
---------|-----------|------------
`key` | string | The key of the event
`metadata` | JSON | Optional meta data for the event

The post body for the `POST /filter` endpoint is below:

Endpoint | Data Type | Description
---------|-----------|------------
`key` | string | The key of the events to be fetched
`from` | date | The endpoint will return events starting from this date
`to` | date | The endpoint will return events up to this date

## How to do a local install

After cloning this repository, simply do:

```
npm run install-packages
```

This already installs the packages both for the React frontend and the server API.

## Details about the server API

Framework used: [Express](https://expressjs.com/)

## Deployment Automation

Push to deploy is enabled; simply git push, and a deployment script will do the following:

```
# Fetch the data from the repository
git pull origin master

# Build the application for production
npm run build
# The single command above already builds both the React app and the Express app

# Restart the application with the latest code
npm run deploy
```

## Accessing the Dashboard

Simply visit the site, then log-in. You will then be able to filter the events by key, from, and to dates.

Frameworks used: [React](https://reactjs.org/), [Chart.js](https://www.chartjs.org/)
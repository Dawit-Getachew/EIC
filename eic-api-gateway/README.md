# eic-api-gateway

## How to start the backend
This service is a gateway service to both Auth and Investment Service

Only Account and User functions exist in this service

Make sure that investment-service is running and subscribed to all the queues

## API Structure

The backend is existed of three layers
1. GQL Gateway - this way everything gets parsed and specific
2. Listner Service - these are functions listening on queues
3. Model Functions - these are formatted function that contain the same structure and work over the same
rules for every schema

## Wrappers
These are code-structuring abstract functions.
They help to develop, design and validate GQL Queries and mutations

## Required Softwares
- For local db MongoDB
- For local sessions redislabs
- For microservices rabbitmq [cloudamqp.com] (localhost:15672) [guest:guest]
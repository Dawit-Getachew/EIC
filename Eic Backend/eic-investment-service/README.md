# eic-investment-service

## How to start the backend
This service is a service listening on investment related functions
Just make sure rabbitmq is running on the host

## API Structure

The backend is contained of Several functions including:
1. Investment Permit - All CRUD Operations related to investment permits
2. Investment Permit Renewal - All CRUD Operations related to investment permit renewals
3. Investment Permit Ammendment - All CRUD Operations related to investment permit ammendment
4. Investment Permit Cancellation - All CRUD Operations related to investment permit cancellation

## Wrappers
These are code-structuring abstract functions.
They help to develop, design and validate GQL Queries and mutations
# eic-work-permit-service

## How to start the backend
This service is a service listening on work permit related functions
Just make sure rabbitmq is running on the host
```$ yarn build
   $ yarn start
```

## API Structure

The backend is contained of Several functions including:
1. Work Permit - All CRUD Operations related to work permits
2. Work Permit Renewal - All CRUD Operations related to work permit renewals
3. Work Permit Ammendment - All CRUD Operations related to work permit ammendment
4. Work Permit Cancellation - All CRUD Operations related to work permit cancellation

## Wrappers
These are code-structuring abstract functions.
They help to develop, design and validate GQL Queries and mutations
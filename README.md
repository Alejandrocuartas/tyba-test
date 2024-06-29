# Backend API Documentation

Welcome to the backend API documentation for our application. For more detailed explanations and try the REST API on production, please refer to the [Postman collection](https://www.postman.com/orbital-module-geoscientist-50527574/workspace/tyba-test/collection/15967321-5c5c715a-a98f-4774-b7ee-dcafdc4bfd17?action=share&source=copy-link&creator=15967321&active-environment=1782ebaa-b4c8-4d59-8748-f35beb5196f9).

## Base URL

    https://wkw4zt3fql.execute-api.us-east-1.amazonaws.com/prod

## Endpoints

1. **POST `/v1/auth/signup`**
   - **Description:** Creates a new user.
   - **Request Body:** 
     ```json
     {
       "username": "",
       "password": ""
     }
     ```
   - **Response:**
     ```json
     {
       "token": "<token>"
     }
     ```
   - **Notes:** Validations are in place for the username and password.

2. **POST `/v1/auth/login`**
   - **Description:** Authenticates a user.
   - **Request Body:**
     ```json
     {
       "username": "",
       "password": ""
     }
     ```
   - **Response:**
     ```json
     {
       "token": "<token>"
     }
     ```
   - **Notes:** Validations are in place for the username and password.

3. **POST `/v1/transactions`**
   - **Description:** Creates a transaction.
   - **Headers:** 
     ``` 
     x-auth-token: <token>
     ```
   - **Request Body:**
     ```json
     {
       "amount": 1000,
       "type": "DEPOSIT"
     }
     ```
   - **Response:** Returns the data of the transaction.

4. **GET `/v1/transactions`**
   - **Description:** Retrieves all transactions and user balance.
   - **Headers:** 
     ``` 
     x-auth-token: <token>
     ```
   - **Response:** Returns all transactions paginated and the user balance.

5. **GET `/v1/restaurants`**
   - **Description:** Retrieves restaurants based on location.
   - **Headers:** 
     ``` 
     x-auth-token: <token>
     ```
   - **Query Parameters:**
     - `location`: Can be a city, any address, or a 'latitude,longitude' pair.
     - `next_page_token` (optional): Used for paginating the results.
   - **Response:** Returns all restaurants in the specified location and a `next_page_token`.

## Running Locally

To run the application locally, use the following command:

    docker-compose up --build


Make sure the following environment variables are set.  
Only for local purposes you can set the same values as the next ones excepting `GOOGLE_MAPS_API_KEY`:

```env
JWT_SECRET=my_secret
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=tyba_container_test_db
DB_HOST=db
DB_PORT=5432
PORT=3000
GOOGLE_MAPS_API_KEY=<your_api_key>
```

## Deploying to AWS with AWS CloudFormation

To deploy the stack, fill in the variables in the cloudformation/deploy.sh file and run `npm run deploy`. This deployment includes:

 - AWS Lambda: I used Express.js with serverless-http for serverless config.
 - AWS API Gateway: This invokes the function.
 - CI/CD with AWS CodePipeline and AWS CodeBuild: The CI/CD flow includes builds and tests each time a push is made to main branch.
 - AWS RDS PostgreSQL: I have the production database on AWS RDS

## Contributing

Ensure to run the next commands before start coding:

    npm install && npm run prepare

this ensures that project is linted and tested on each pre-commit fase thanks to Husky.


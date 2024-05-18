# Gympass Application
Application developed to do check-ins at gyms. I've learned so many concepts about JWT, Refresh Token, Middlewares, Authentication, SOLID, Integration Tests, E2E Tests, Docker, Design Patterns, Prisma, Postgres, and CI/CD.

## How to execute app on localhost:

1: Change the DATABASE_URL in your .env to: `postgresql://POSTGRESQL_USERNAME:POSTGRESQL_PASSWORD@localhost:5432/apisolid?schema=public`

2: Run the following command on CMD: `npm install && npm run dev`

## How to execute app on Docker:

1: Change the DATABASE_URL in your .env to: `postgresql://root:root@db:5432/apisolid?schema=public`

2: Run the following command on CMD: `npm install && docker-compose up -d`

3: On CMD App Root, execute these following steps: 

  3.1 - `docker exec -it api_gym /bin/sh`
  
  3.2 - `npx prisma migrate deploy`
  
  3.3 - `exit`

## Routes

### Users
- [POST] `/users`
- [POST] `/sessions`
- [PATCH] `/token/refresh`
- [GET] `/me`

### Checkins
- [GET] `/check-ins/history`
  
- [GET] `/check-ins/metrics`
  
- [POST] `/gyms/:gymId/check-ins`
  
- [PATCH] `/check-ins/:checkInId/validate`


### Gyms
- [GET] `/gyms/search`
- [GET] `/gyms/nearby`
- [POST] `/gyms`
  
## (Functional requirements)

- [x] It should be possible to sign up;
- [x] It should be possible to authenticate;
- [x] It should be possible to obtain the profile of a logged-in user;
- [x] It should be possible to get the number of check-ins made by the logged-in user;
- [x] It should be possible for the user to obtain their check-in history;
- [x] It should be possible for the user to search for gyms nearby (within 10KM);
- [x] It should be possible for the user to search for gyms by name;
- [x] It should be possible for the user to check-in at a gym;
- [x] It should be possible to validate a user's check-in;
- [x] It should be possible to register a gym.

## (Business rules)

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot do 2 check-ins on the same day;
- [x] The user cannot check in if they are not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after being created;
- [x] Check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;
      
## (Non-functional requirements)

- [x] The user's password must be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paged with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

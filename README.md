# Just Backend Exercise

## How to run


#### 1.


Set up the enviroment variables, rename .env.sample => .env


#### 2.


Next the database should be spun up:


Within the project repository run


```
docker-compose up -d
```

be sure to check port 3306 is available.

#### 3.

It takes several minutes for the database to be accessible from Node, so i reccomend waiting some time

before running:

```
npm i
npm run dev
```

Once you've done that you can reach the endpoints on localhost:3000

Example Calls

Post http://localhost:3000/trips

```
{
    "userId": 99,
    "tripStart": "2022-09-08T11:37:00.000Z",
    "tripEnd": "2022-09-08T12:40:00.000Z", 
    "distance": 85.7
}
```

#### Optional.

Testing, you can run the unit tests written for this project, but due to a bug (probably sequelize)
the tests will complete then hang.

To test run:

```
npm t
```

#### On having more time 



- Improve type saftey
- fix hardcoded table reference for user.datasource
- Better errors (put errors into classes/interfaces ext..)
- find alternative to sequlize (debugging trivial errors took ages)
- better test coverage
- better testing (first time using jest)
- interfaces for /core/interactors/\*.interactor.ts
- resolve ESlint warnings
- fix testing issues
- review code carefully
- implement e2e tests
- remove redendant interfaces
- fix output for users/:id/trips


## Description
## WeatherXM Services and API Endpoints

 **Installation & Run Application**

Docker has two images, one for the application and one for MongoDB.
Application is supposed to run after this command
``` 
docker-compose up -d --build
```
When Application starts you can open Swagger and access **WeatherXM API** 
```
http://localhost:3000/api
```
## Installation (local Environment)

```bash
$ npm install
```
## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

Main Services included in this project:
- a service that retrieves a list of public devices (/devices) from the API and saves their basic info in a db.
- in regular intervals (e.g. every 1 minute), retrieve the current_weather for every device (/deviceById) of the list && update it in a different table/collection.

**API endpoints:**
- **/devices** : Return List of devices (full struct) from the db.
- **/devices/:deviceId** : Return a single device from the db, including the basic device info and current weather.
- **/devices/:deviceId** : Update device by ID.
- **/current_weather: Return list of current weather for all devices**
- **/current_weather/:id**: Current_weather by deviceId
- **/current_weather/:id**: Update Current_weather by device by ID

**Tech Stack**: NestJS, MongoDB - Mongoose, Docker, Heroku

**Services main logic:** 
- **saveDevices**: Called on Application start once. Calling 2 main services:
  - **getWeatherDevicesFromEndpoint**: 
    - Call the endpoint of Devices provided and get the whole bunch of data from response
  - **devicesService** with its method insertBulk:
    - Insert all the data from response in bulk to DB
----

- Then and **every minute** is called the service **retrieveWeatherByDeviceId** with the main logic as described below:
  - GET all devices from DB by calling service devicesService by calling findAll method
  - Call endpoint for each device id from service **getDeviceByIdFromEndpoint**
    - If deviceID exist in DB then it updates current weather in DB in a new collection

---
**3 different environments:** env.test, env.dev, env.docker
Based on where you run the application, the application uses the corresponding variables
## License

Nest is [MIT licensed](LICENSE).

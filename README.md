# PentaFinanciero test aplication

Here is the code for PentaFinanciero job application

## Instructions to launch the app
###  With Docker
To launch the app via docker, you will need to install **Docker** and **Docker-compose** commands 

 1. Install docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
 2. Install docker-compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

After install docker commands and clone the repo, in the repo folder execute:

    docker-compose up --build

### Without Docker
To launch without docker, you will need a postgres database running and edit credentials in backend's code:
[https://github.com/pfariaz/pentafinanciero-test/blob/master/api/config/default.json#L3](https://github.com/pfariaz/pentafinanciero-test/blob/master/api/config/default.json#L3)

After that, you must execute the following commands to launch frontend and backend apps:

1. Front-end: in `/client` folder: 
	 1. via yarn:
		   `yarn install`
       `yarn start`
	 2. via npm:
		   `npm install`
       `npm start`
 
 2. Back-end: in `/api` folder: 
	 1. via yarn:
		   `yarn install`
       `yarn start`
	 2. via npm:
		   `npm install`
       `npm start`

## Access to app
to access to the app, you have to enter to [http://localhost:3000/login](http://localhost:3000/login) and the credentials are:

    user:  "superuser@pentafinanciero.cl"
    pass:  "pass123"

If you know what endpoints are in the app, you can access to swagger's URL: [http://localhost:4000/api/docs/](http://localhost:4000/api/docs/)


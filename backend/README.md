# MyMiniFactory Demo

## Environment variables

In order to run the application, rename the environment variable file `.env.sample` to `.env` and fill in the fields.

## Setting up local database

Creating the docker image:
This example uses the environment variables used in the sample.
````shell script
docker build -t demo --build-arg db_root_pw=1234 --build-arg db_name=demo --build-arg db_username=user --build-arg db_pw=1234 db
````

To start the dockerized SQL server, run the following command from the db folder of this project in the terminal:
````shell script
docker run -p 3306:3306 -d demo
````
This will run the previously created image and forward the port 3306 to the local 3306
The database however still needs to be created.

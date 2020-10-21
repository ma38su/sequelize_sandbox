# Sequelize Sandbox

Feel free to try any Sequelize features 6.0 feature with typescript(ES2019) on docker containers.

Initial models create the table, after dropping it first if it already exists. 


Run all containers:

```
docker-compose up --build -d
```

Stop all containers:

```
docker-compose down
```

Stop node container:

```
docker-compose stop node
```

Re-run node container after re-building the container:

```
docker-compose up node --build
```

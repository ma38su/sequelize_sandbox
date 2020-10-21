# Sequelize Sandbox

Feel free to try any sequelize feature with typescript on docker containers.

Initial models create the table, after dropping it first if it already exists. 


## Using both local and container environemnts

Run rdb container:

```
docker-compose up --build -d rdb
```

Run node on local:
```
bash ./run.sh
```


## Using all containers environments

Run all containers:

```
docker-compose up --build -d
```

Stop all containers:

```
docker-compose down
```


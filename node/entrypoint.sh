#!/bin/sh

until mysqladmin ping -h $RDB_HOST -P $RDB_PORT --silent --protocol=tcp; do
    echo "waiting for mysqld ($RDB_HOST:$RDB_PORT) to be connectable..."
    sleep 3
done

yarn start

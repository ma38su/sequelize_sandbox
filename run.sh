#!/bin/sh

export RDB_DIALECT=mysql
export RDB_HOST=localhost
export RDB_PORT=3306
export RDB_DATABASE=sandbox
export RDB_USER=user
export RDB_PASSWORD=pass

cd ./node
/bin/sh ./entrypoint.sh


#!/bin/bash

mysql -h localhost -u root -proot -e "CREATE DATABASE IF NOT EXISTS eventTracker;"

echo "update database"
node node_modules/db-migrate/bin/db-migrate up --config ./server/database/database.json -e dev -m ./server/database/migrations
echo "finished update database"

# run nodemon
NODE_ENV=dev nodemon -e js ./server/index.js --exec babel-node --presets es2015,stage-2 --ignore ./server/__test__/ --ignore ./frontend/ --ignore ./scripts/
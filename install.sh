#!/bin/sh

cd client && npm install

cd ../server && mkdir public/images && npm install

echo "Installed."
#!/bin/sh

cd client && rm -rf build node_modules

cd ../server && rm -rf node_modules

echo "Cleaned up.."
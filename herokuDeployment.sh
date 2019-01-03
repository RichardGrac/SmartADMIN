#!/usr/bin/env bash
#npm run build
git add .
git commit -m 'HEROKU: All Done'
git push heroku master
heroku open

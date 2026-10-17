#!/bin/bash
rsync -r --times --perms --itemize-changes --exclude=deploy.bash --exclude='.*' "$@" ./ lemon.lumeh.org:/srv/http/mykoolhomepage.com/

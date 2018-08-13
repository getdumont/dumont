#!/bin/sh

exec_collector() {
    echo "Starting Request\n"
    curl -X GET \
        http://127.0.0.1:8080/ \
        -H 'token: teston'

    echo "\nEnding Request"
    echo "Back in 1 hour"
    sleep 3600
    exec_collector
}

echo "Start in 1 hour"
sleep 4000
exec_collector
package main

import (
    "log"
    "net/http"
    "github.com/getdumont/dumont/specialist-api/utils"
)

func main() {
    utils.ConnectDB()
    router := NewRouter()
    log.Fatal(http.ListenAndServe(":8081", router))
}
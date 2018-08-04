package utils

import (
	"log"
	mgo "gopkg.in/mgo.v2"
)

var db mgo.Database

func ConnectDB() {
	log.Printf("CONNECT")
	session, err := mgo.Dial("mongodb://localhost:2017/dumont")

	if err != nil {
		log.Printf("ERROR")
		log.Fatal(err)
	}

	db = *session.DB("dumont")
}

func GetCollection(colection string) *mgo.Collection {
	return db.C(colection)
}

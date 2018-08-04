package tweets

import (
    "net/http"
    "gopkg.in/mgo.v2/bson"

    "github.com/gorilla/mux"
    . "github.com/getdumont/dumont/specialist-api/utils"
)

// var model = GetCollection("tweets")

func List(w http.ResponseWriter, r *http.Request) {
    var tweets Tweets
	err := GetCollection("tweets").Find(bson.M{}).All(&tweets)

    if err != nil {
        RespondWithJson(w, 200, tweets)
    } else {
        RespondWithJson(w, 500, err)
    }
}

func Detail(w http.ResponseWriter, r *http.Request) {
    var tweet Tweet
    id := mux.Vars(r)["tweetId"]
	err := GetCollection("tweets").FindId(bson.ObjectIdHex(id)).One(&tweet)

    if err != nil {
        RespondWithJson(w, 200, tweet)
    } else {
        RespondWithJson(w, 500, err)
    }
}

package tweets

import (
    "gopkg.in/mgo.v2/bson"
)

type Tweet struct {
    Id        bson.ObjectId `json:"_id", bson:"_id"`
    Text      string        `json:"text", bson:"text"`
}

type Tweets []Tweet
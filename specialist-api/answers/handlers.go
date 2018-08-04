package answers

import (
    "encoding/json"
    "net/http"

    . "github.com/getdumont/dumont/specialist-api/utils"
)

var model = GetCollection("answers")

func Insert(w http.ResponseWriter, r *http.Request) {
    var asnwer Answer
    decode_err := json.NewDecoder(r.Body).Decode(&asnwer)

    if decode_err != nil {
        RespondWithJson(w, 500, decode_err)
    } else if insert_err := model.Insert(asnwer); insert_err != nil {
        RespondWithJson(w, 500, insert_err)
    } else {
        RespondWithJson(w, 200, asnwer)
    }
}
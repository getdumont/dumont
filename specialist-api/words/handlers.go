package words

import (
    "encoding/json"
    "net/http"

    . "github.com/getdumont/dumont/specialist-api/utils"
)

var model = GetCollection("words")

func Insert(w http.ResponseWriter, r *http.Request) {
    var word Words
    decode_err := json.NewDecoder(r.Body).Decode(&word)

    if decode_err != nil {
        RespondWithJson(w, 500, decode_err)
    } else if insert_err := model.Insert(word); insert_err != nil {
        RespondWithJson(w, 500, insert_err)
    } else {
        RespondWithJson(w, 200, word)
    }
}
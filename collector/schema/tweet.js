const emojinator = require('emojinator')
const { normalizeTxt } = require('../utils');

module.exports = ({
    id,
    id_str,
    created_at,
    text,
    user,
    entities
}) => ({
    id,
    id_str,
    created_at,
    entities,
    user_id: user.id,
    ...emojinator.fullObject(normalizeTxt(text)),
});

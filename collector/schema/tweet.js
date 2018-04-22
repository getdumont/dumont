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
    text: text.replace(/\n|\r/g, ""),
    entities,
    user_id: user.id,
});

module.exports = ({
    created_at,
    text,
    user,
    entities
}) => ({
    created_at,
    text,
    entities,
    user_id: user.id,
});

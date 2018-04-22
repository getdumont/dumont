module.exports = ({
    id,
    id_str,
    screen_name,
    description,
    protected,
    followers_count,
    friends_count,
    created_at,
    favourites_count,

    profile_link_color,
    profile_sidebar_border_color,
    profile_sidebar_fill_color,
    profile_text_color,
}) => ({
    id,
    id_str,
    screen_name,
    description,
    protected,
    followers_count,
    friends_count,
    created_at,
    favourites_count,
    colors: JSON.stringify({
        text: profile_text_color,
        link: profile_link_color,
        sidebar: {
            border: profile_sidebar_border_color,
            fill: profile_sidebar_fill_color
        }
    })
});
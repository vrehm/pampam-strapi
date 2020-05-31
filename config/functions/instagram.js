/* stylelint-disable */
const axios = require('axios')

module.exports = async() => {
    // const feeds = []
    // let loading = true
    // const count = 50
    // const mediatypes = "['IMAGE', 'CAROUSEL_ALBUM']"
    const searchToken = await strapi.query('insta-token').find()
    const searchUser = await strapi.query('insta-user').find()
    const { access_token } = searchToken[0]
    const { ig_user_id } = searchUser[0]
    const fields = "media_url,media_type,caption,permalink,timestamp,username"
    const endpoint = 'https://graph.instagram.com/' + ig_user_id + '/media'
    const fullPath = endpoint + "?access_token=" + access_token + "&fields=" + fields

    const { data: { data } } = await axios.get(fullPath)
        .catch(function(error) {
            console.log(error.toJSON());
        });

    for (let index = 0; index < data.length; index++) {
        const post = data[index]
        const search = await strapi.query('instagram-posts').findOne({ ig_id_contains: post.id })

        if (search === null) {
            await strapi.query('instagram-posts').create({
                ig_id: post.id,
                caption: post.caption,
                media_type: post.media_type,
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp,
                username: post.username
            })
        } else {
            await strapi.query('instagram-posts').update({ ig_id: post.id }, {
                caption: post.caption,
                media_type: post.media_type,
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp,
                username: post.username
            })
        }
    }

    strapi.log.info('Import for last 25 Instagram posts is done')
}
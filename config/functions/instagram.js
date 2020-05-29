/* stylelint-disable */
const axios = require('axios')

module.exports = async() => {
    // const feeds = []
    // let loading = true
    // const count = 50
    // const mediatypes = "['IMAGE', 'CAROUSEL_ALBUM']"
    const { access_token } = await strapi.query('insta-token').findOne({ id: 1 });
    const { ig_user_id } = await strapi.query('insta-user').findOne({ id: 1 });
    const fields = "media_url,media_type,caption,children"
    const endpoint = 'https://graph.instagram.com/' + ig_user_id + '/media'

    const { data: { data } } = await axios.get(endpoint, {
        params: { access_token, fields: fields }
    })

    for (let index = 0; index < data.length; index++) {
        const post = data[index]
        const search = await strapi.query('instagram-posts').findOne({ ig_id_contains: post.id })

        if (search === null) {
            await strapi.query('instagram-posts').create({
                ig_id: post.id,
                caption: post.caption,
                media_type: post.media_type,
                media_url: post.media_url
            })
        } else {
            await strapi.query('instagram-posts').update({ ig_id: post.id }, {
                caption: post.caption,
                media_type: post.media_type,
                media_url: post.media_url
            })
        }
    }

    console.log('Import for last 25 Instagram posts is done')
}
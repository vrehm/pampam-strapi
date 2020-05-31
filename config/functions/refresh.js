/* stylelint-disable */
const axios = require('axios')

module.exports = async() => {
    const searchToken = await strapi.query('insta-token').find()
    let access_token = ''

    if (searchToken.length > 0) {
        access_token = searchToken[0]['access_token']
    } else {
        access_token = process.env.IG_TOKEN
    }

    const endpoint = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token"

    const { data } = await axios.get(endpoint, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { access_token }
    })

    await strapi.query('insta-token').update({ id: 1 }, {
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in
    })

    strapi.log.info('Refresh Instagram Access Token is done')
}
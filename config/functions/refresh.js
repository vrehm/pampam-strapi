/* stylelint-disable */
const axios = require('axios')

module.exports = async() => {
    const IG_TOKEN = process.env.IG_TOKEN
    const endpoint = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token"

    const { data } = await axios.get(endpoint, {
        params: { access_token: IG_TOKEN }
    })

    await strapi.query('insta-token').update({ id: 1 }, {
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in
    })

    console.log('Refresh Instagram Access Token is done')
}
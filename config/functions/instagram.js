/* stylelint-disable */
const axios = require('axios')

module.exports = async() => {
    // const feeds = []
    // let loading = true
    // const count = 50
    // const mediatypes = "['IMAGE', 'CAROUSEL_ALBUM']"
    const IG_TOKEN = process.env.IG_TOKEN
    const IG_USER_ID = process.env.IG_USER_ID
    const fields = "media_url,media_type,caption,children"
    const endpoint = 'https://graph.instagram.com/' + IG_USER_ID + '/media'

    const { data: { data } } = await axios.get(endpoint, {
        params: { access_token: IG_TOKEN, fields: fields }
    })

    for (let index = 0; index < data.length; index++) {
        const post = data[index]

        await strapi.query('instagram-posts').create({
            ig_id: post.id,
            caption: post.caption,
            media_type: post.media_type,
            media_url: post.media_url
        })
    }

    console.log('Import is done')

    // await strapi.query('instagram-posts').create({
    //     ig_id: data[0].id,
    //     caption: data[0].caption,
    //     media_type: data[0].media_type,
    //     media_url: data[0].media_url
    // })

    // .then((response) => {
    //     loading = false

    //     if (response.status === 400) error = response.error.message

    //     if (response.status === 200) {
    //         for (const n in response.data.data) {
    //             if (mediatypes.includes(response.data.data[n].media_type)) {
    //                 if (feeds.length >= count) {
    //                     return
    //                 }

    //                 const data = response.data.data[n]

    //                 if (data.children) {
    //                     // feeds.push({ id: 'reserved' })
    //                     // const caption = data.caption
    //                     // const children = data.children.data
    //                     // delete data.children
    //                     // for (let index = 0; index < children.length; index++) {
    //                     //     const child = children[index].id
    //                     //     const endpoint = 'https://graph.instagram.com/' + child

    //                     //     await axios
    //                     //         .get(endpoint, {
    //                     //             params: {
    //                     //                 access_token: IG_TOKEN,
    //                     //                 fields: 'media_url,media_type'
    //                     //             }
    //                     //         })
    //                     //         .then((response) => {
    //                     //             const igChild = response.data
    //                     //             if (igChild.media_type === 'IMAGE') {
    //                     //                 igChild.caption = caption
    //                     //                 feeds.push(igChild)
    //                     //             }
    //                     //         })
    //                     //         .catch((error) => {
    //                     //             throw error
    //                     //         })
    //                     // }
    //                 } else {
    //                     feeds.push(data)
    //                         // const create = strapi.query('instagram-posts').create({
    //                         //     ig_id: data.id,
    //                         //     caption: 'toto',
    //                         //     media_type: 'toto',
    //                         //     media_url: 'toto'
    //                         // })
    //                     console.log(data)
    //                 }
    //             }
    //         }
    //     }
    // })
    // .catch((error) => {
    //     throw error
    // })

    // for (let index = 0; index < data.length; index++) {
    //     const post = data[index];
    //     console.log(post);

    //     // await strapi.query('instagram-posts').create({
    //     //         ig_id: post.id,
    //     //         caption: 'toto',
    //     //         media_type: post.media_type,
    //     //         media_url: post.media_url
    //     //     })
    //     //     .catch((error) => {
    //     //         throw error
    //     //     });
    // }
    // console.log(test);
    // console.log(first, create, data)
}
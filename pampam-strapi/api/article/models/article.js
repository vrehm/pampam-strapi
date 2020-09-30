'use strict';

const slugify = require('slugify');

/**
 * Lifecycle callbacks for the `article` model.
 */

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            if (data.title) {
                data.slug = slugify(data.title, { lower: true });
            }

            const today = new Date();
            data.published_at = today
        },
        async beforeUpdate(params, data) {
            if (data.title) {
                data.slug = slugify(data.title, { lower: true });
            }
        },
    },
};
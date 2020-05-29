'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
    // So let's execute these functions everyday at 2am.
    '0 2 * * *': () => {
        strapi.config.functions.refresh();
        strapi.config.functions.instagram();
    },
};
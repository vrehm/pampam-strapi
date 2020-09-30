module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    admin: {
        auth: {
            secret: env('ADMIN_JWT_SECRET', 'a5bef8d2e3886c1f382c54e244795727'),
        },
    },
    "cron": {
        "enabled": true
    },
});
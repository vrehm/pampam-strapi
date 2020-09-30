module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
        default: {
            connector: 'bookshelf',
            settings: {
                client: 'postgres',
                host: env('POSTGRESQL_ADDON_HOST', '127.0.0.1'),
                port: env.int('POSTGRESQL_ADDON_PORT', 5432),
                database: env('POSTGRESQL_ADDON_NAME', 'pampam-strapi'),
                username: env('DEV_USER'),
                password: env('DEV_PASSWORD'),
                ssl: env.bool('POSTGRESQL_ADDON_SSL', false),
            }
        },
    },
});
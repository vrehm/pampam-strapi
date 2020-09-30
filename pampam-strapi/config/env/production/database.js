module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
        default: {
            connector: 'bookshelf',
            settings: {
                client: 'postgres',
                host: env('POSTGRESQL_ADDON_HOST'),
                port: env.int('POSTGRESQL_ADDON_PORT'),
                database: env('POSTGRESQL_ADDON_NAME'),
                username: env('POSTGRESQL_ADDON_USERNAME'),
                password: env('POSTGRESQL_ADDON_PASSWORD'),
                ssl: env.bool('POSTGRESQL_ADDON_SSL', false),
            },
            options: {
                "options": {
                    "debug": false,
                    "pool": {
                        "min": 0,
                        "max": 5
                    }
                }
            }
        },
    },
});
module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
        default: {
            connector: 'bookshelf',
            settings: {
                client: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                database: 'pampam-strapi',
                username: env('DEV_USER'),
                password: env('DEV_PASSWORD'),
                ssl: false,
            }
        },
    },
});
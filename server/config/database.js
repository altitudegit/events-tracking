import env from './env';
import knex from 'knex';
const settings = {
    dev: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'eventTracker'
    },
    production:  {
        host: 'localhost',
        user: 'forge',
        password: process.env.DB_PASSWORD,
        database: 'eventTracker'
    }
}

const db = knex({
    client: 'mysql',
    connection: settings[env.name],
    debug: env.name === 'dev'
});

export default db;
// Update with your config settings.
require("dotenv").config();
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './database/migrations/dev.sqlite3',
    },
    pool: {
      min: 2,
      max: 10
    },

      migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    }
  }

};

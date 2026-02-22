// Configuración para Sequelize CLI (usa variables de entorno; cargar .env antes de migrar)
const dbConfig = {
  username: process.env.POSTGRES_USER || 'mindvault_user',
  password: process.env.POSTGRES_PASSWORD || 'mindvault_password',
  database: process.env.POSTGRES_DB || 'mindvault_db',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5434,
  dialect: 'postgres',
};

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

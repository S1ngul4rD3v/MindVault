// Setup global para Jest - configurar variables de entorno antes de importar módulos
process.env.PORT_MINDVAULT = process.env.PORT_MINDVAULT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// create the Environment variables
// ============================
//  PORT
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Environment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Token Expiration
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED authentication
// ============================
process.env.SEED = process.env.SEED || 'this-is-the-seed-dev';

// ============================
//  Database
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/acunetiz';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

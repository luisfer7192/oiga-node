require('../server/config/config');
const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function(done){

    // Connect to mongodb
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.URLDB, { useNewUrlParser: true });
    mongoose.connection.once('open', function(){
        console.log('Connection has been made, now make fireworks...');
        done();
    }).on('error', function(error){
        console.log('Connection error:', error);
    });

});

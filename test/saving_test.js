const assert = require('assert');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../server/models/user');

describe('Saving users with mongodb', function() {
  // Drop the users collection before each test
  beforeEach(function(done){
      // Drop the collection
      mongoose.connection.collections.users.drop(function(){
        done();
      });
  });

  // Create user
  it('Saves a user to the database', function(done){
    let user = new User({
        name: 'User',
        email: 'user@acunetiz.com',
        password: bcrypt.hashSync('123456', 10)
    });

    user.save((err, userDB) => {
        // we are going to create a USER_ROLE
        assert(userDB.role === 'USER_ROLE');
        done();
    });
  });

  // Create user
  it('Saves a admin to the database', function(done){
    let user = new User({
        name: 'Admin',
        email: 'admin@acunetiz.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'ADMIN_ROLE'
    });

    user.save((err, userDB) => {
        // we are going to create a USER_ROLE
        assert(userDB.role === 'ADMIN_ROLE');
        done();
    });
  });


});

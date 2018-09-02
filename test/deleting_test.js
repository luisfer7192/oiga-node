const assert = require('assert');
const bcrypt = require('bcrypt');

const User = require('../server/models/user');

// Describe our tests
describe('Deleting records with mongodb', function(){
  // Add a character to the db before each tests
  beforeEach(function(done){
    const user = new User({
        name: 'adminDelete',
        email: 'adminDelete@acunetiz.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'ADMIN_ROLE'
    });
    user.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Deletes a record from the database', function(done){
    User.findOneAndRemove({email: 'adminDelete@acunetiz.com'}).then(function(){
      User.findOne({email: 'adminDelete@acunetiz.com'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

});

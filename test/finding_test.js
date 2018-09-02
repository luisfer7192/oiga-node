const assert = require('assert');
const bcrypt = require('bcrypt');

const User = require('../server/models/user');

// Describe our tests
describe('Finding records with mongodb', function(){
  var user;
  // Add a character to the db before each tests
  beforeEach(function(done){
    User.findOneAndRemove({email: 'adminFinding@acunetiz.com'}).then(function(){
      user = new User({
          name: 'adminFinding',
          email: 'adminFinding@acunetiz.com',
          password: bcrypt.hashSync('123456', 10),
          role: 'ADMIN_ROLE'
      });
      user.save().then(function(){
        done();
      });
    });

  });

  // Create tests
  it('Finds a record from the database', function(done){
    User.findOne({email: 'adminFinding@acunetiz.com'}).then(function(result){
      assert(result.email === 'adminFinding@acunetiz.com');
      done();
    });
  });

  it('Finds a record by unique id', function(done){
    User.findOne({_id: user._id}).then(function(result){
      assert(result._id.toString() === user._id.toString());
      done();
    });
  });
});

const mongoose = require('mongoose');
const User = require('../../models/User');

beforeEach(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(
    'mongodb://admin:password1@ds253243.mlab.com:53243/biblitest',
    { useNewUrlParser: true }
  );
});

afterEach(async () => {
  await mongoose.connection.collections.users.drop();
});

test('saves a new user to the test db', async () => {
  const user = await new User({
    name: 'jim',
    email: 'k@k.com',
    password: 'password'
  });

  await user.save();
  expect(user.name).toEqual('jim');
});



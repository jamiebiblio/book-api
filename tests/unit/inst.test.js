const mongoose = require('mongoose');
const Institution = require('../../models/Institution');

beforeEach(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(
    'mongodb://admin:password1@ds253243.mlab.com:53243/biblitest',
    { useNewUrlParser: true }
  );
});

afterEach(async () => {
  await mongoose.connection.collections.institutions.drop();
});

test('saves a new institution to the test db', async () => {
    const institution = await new Institution({
        name: 'acme',
        URL: 'www.acme.com',
        emailDomain: 'acme.com'
      });

  await institution.save();
  expect(institution.name).toEqual('acme');
});
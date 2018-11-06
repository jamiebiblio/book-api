const mongoose = require('mongoose');
const Book = require('../../models/Book');

beforeEach(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(
    'mongodb://admin:password1@ds253243.mlab.com:53243/biblitest',
    { useNewUrlParser: true }
  );
});

afterEach(async () => {
  await mongoose.connection.collections.books.drop();
});

test('saves a new book to the test db', async () => {
    const book = await new Book({
        ISBN: '101',
        title: 'Psychology 101',
        author: 'Richard Richardson III'
    });

  await book.save();
  expect(book.ISBN).toEqual('101');
});
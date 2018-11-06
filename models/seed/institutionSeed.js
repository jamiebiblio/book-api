const Institution = require('../Institution');
const mongoose = require('mongoose');
const config = require('../../config');

//DB setup
mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true }
)
mongoose.connection
.once("open", () => {
  const acme = new Institution({
    name: 'acme',
    URL: 'www.acme.com',
    emailDomain: 'acme.com'
  });
  
  acme
    .save()
    .then(() => mongoose.disconnect())
    .catch(err => console.log(err));
});
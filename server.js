const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
require('dotenv').config();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.send('working');
});

// houses table
// users table
// bills table
// bills_by_users
// chores
// bulletins
// bulletins_by_users
// grocery_lists
// grocery_items
// events


app.listen(app.get('port'), () => {
  console.log(`Tribe2 is running on ${app.get('port')}.`);
});

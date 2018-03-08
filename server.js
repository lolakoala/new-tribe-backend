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
// get with query params
// get house associated with user email
app.get('/api/v1/houses', (request, response) => {
  const { email } = request.query;
  database('users').where('email', email).select()
    // .then(user => user.json())
    .then(user => {
      console.log('user', user)
      if (user.length) {
        return user[0].house_key;
      } else {
        return response.status(404).json({ error: 'There is no user associated with this email address.'})
      }
    })
    .then(key => database('houses').where('id', key).select()
      .then(house => {
        if (house.length) {
          return response.status(200).json(house[0]);
        } else {
          return response.status(404).json({ error: 'You have not yet joined a house. Please join or create a house.'})
        }
      })
      .catch(error => response.status(500).json({ error })))
    .catch(error => response.status(500).json({ error }));
});

// post
// patch

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

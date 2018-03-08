
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(() => knex('grocery_items').del())
    .then(() => knex('grocery_lists').del())
    .then(() => knex('bulletins_by_users').del())
    .then(() => knex('bulletins').del())
    .then(() => knex('chores').del())
    .then(() => knex('bills_by_users').del())
    .then(() => knex('bills').del())
    .then(() => knex('users').del())
    .then(() => knex('houses').del())
    .then(function () {
      // Inserts seed entries
      return knex('houses').insert([
        {
          id: 1,
          name: 'New House',
          secret_key: 'abcdef',
          members: 5
        }
      ])
        .then(() => {
          return knex('users').insert([
            {
              id: 1,
              name: 'Lola',
              email: 'lo@lo.com',
              house_key: 1
            }
          ]);
        })
        .then(() => {
          return knex('bills').insert([
            {
              id: 1,
              name: 'electric',
              description: 'hot fire',
              all_paid: false,
              total: '100',
              split_type: 'equal',
              house_key: 1
            }
          ]);
        })
        .then(() => {
          return knex('bills_by_users').insert([
            {
              id: 1,
              amount: '20',
              user_key: 1,
              bill_key: 1,
              paid: false
            }
          ]);
        })
        .then(() => {
          return knex('chores').insert([
            {
              id: 1,
              name: 'Sweep',
              description: 'sweep the kitchen',
              done: false
            }
          ]);
        })
        .then(() => {
          return knex('bulletins').insert([
            {
              id: 1,
              title: 'Announcement',
              description: 'so important',
              all_read: false,
              posted_by: 1,
              house_key: 1
            }
          ]);
        })
        .then(() => {
          return knex('bulletins_by_users').insert([
            {
              id: 1,
              user_key: 1,
              bulletin_key: 1,
              read: false
            }
          ]);
        })
        .then(() => {
          return knex('grocery_lists').insert([
            {
              id: 1,
              store: 'Kings',
              house_key: 1
            }
          ]);
        })
        .then(() => {
          return knex('grocery_items').insert([
            {
              id: 1,
              item: 'cheese',
              quantity: 100,
              user_key: 1,
              list_key: 1
            }
          ]);
        })
        .then(() => {
          return knex('events').insert([
            {
              id: 1,
              name: 'Party',
              description: 'Lola birthday',
              date_and_time: '2017-03-19',
              house_key: 1
            }
          ]);
        });
    });
};

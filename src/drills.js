require('dotenv').config()

const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})


// search and show 
function searchByName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('SEARCH TERM', { searchTerm })
      console.log(result)
    })
}
// searchByName('con')
// searchByItemName('urger')

function paginateItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

// paginateItems(2)

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
}
// productsAddedDaysAgo(30)

/*
    The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.
*/

// INSERT INTO shopping_list (name, price, category, checked, date_added)
function costPerCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result)
    })
}
costPerCategory();


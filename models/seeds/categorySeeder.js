if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const CategoryModel = require('../category')
const db = require('../../config/mongoose')

const { SEED_CATEGORIES } = require('../../seeds.json')

db.once('open', () => {
  Promise.all(Array.from(
    { length: SEED_CATEGORIES.length },
    (_, i) => {
      return CategoryModel.create(SEED_CATEGORIES[i])
    }
  ))
  .then(()=>{
    console.log('categorySeeder done')
    process.exit()
  })
})
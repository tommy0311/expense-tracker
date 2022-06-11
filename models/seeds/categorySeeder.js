if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const CategoryModel = require('../category')
const db = require('../../config/mongoose')

const SEED_CATEGORIES = [
  {
    "id": 1,
    "name": "家居物業"
  },
  {
    "id": 2,
    "name": "交通出行"
  },
  {
    "id": 3,
    "name": "休閒娛樂"
  },
  {
    "id": 4,
    "name": "餐飲食品"
  },
  {
    "id": 5,
    "name": "其他"
  },
]

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
const lodash = require('lodash');
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const UserModel = require('../user')
const CategoryModel = require('../category')
const RecordModel = require('../record')

const db = require('../../config/mongoose');
const user = require('../user');

const { SEED_USERS } = require('../../seeds.json')
const { SEED_RECORDS } = require('../../seeds.json')

function getCategorys() {
  return new Promise((resolve, reject) => {
    CategoryModel
    .find()
    .lean()
    .sort( { id:'asc' })
    .then((categorys) =>{
      console.log('getCategorys done')
      resolve(categorys)
    })
    .catch( error => {
      console.log('getCategorys error')
      reject(error)
    })
  });
}

function createUsers() {
  let users = []
  return new Promise((resolve, reject) => {
    for (const [index, seed] of SEED_USERS.entries()) {
      bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(seed.password, salt)
      })
      .then(hash => { 
        return UserModel.create({
          id: seed.id,
          name: seed.name,
          email: seed.email,
          password: hash})
        }
      )
      .then((user) => {
        users.push(user)
        if (users.length === SEED_USERS.length) {
          console.log('createUsers done')
          resolve(users)
        }
      })
      .catch( error => {
        console.log('createUsers error')
        reject(error)
      })
    }
  });
}

db.once('open', () => {
  let users = []
  let records = []

  createUsers()
  .then( _users => {
    users = lodash.cloneDeep(_users)

    return Promise.all(Array.from(
      { length: users.length },
      (_, i) => {
        const result = SEED_RECORDS.filter(obj => Number(obj.userId) === users[i].id)
        for (const record of result) {
          record.userId = users[i]._id;
          records.push(record)
        }
      }
    ))
  })
  .then(()=>{
    return RecordModel.create(records)
  })
  .then(()=>{
    console.log('recordSeeder done')
    process.exit()
  })
  .catch( error => {
    console.log(error)
    process.exit()
  })
})
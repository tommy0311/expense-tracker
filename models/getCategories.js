const CategoryModel = require('./category')

 let getCategories = ()=> {
  return new Promise((resolve, reject) => {
    CategoryModel
    .find()
    .lean()
    .sort( { id:'asc' })
    .then((categories) =>{
      resolve(categories)
    })
    .catch( error => {
      reject(error)
    })
  });
}

module.exports = getCategories
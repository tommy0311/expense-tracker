const CategoryModel = require('./category')

 let getCategorys = ()=> {
  return new Promise((resolve, reject) => {
    CategoryModel
    .find()
    .lean()
    .sort( { id:'asc' })
    .then((categorys) =>{
      resolve(categorys)
    })
    .catch( error => {
      reject(error)
    })
  });
}

module.exports = getCategorys
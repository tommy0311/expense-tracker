const express = require('express')
const router = express.Router()
const lodash = require('lodash');

const CategoryModel = require('../../models/category')
const RecordModel = require('../../models/record')

router.get("/", (req, res) => {
  const userId = req.user._id
  let category = undefined
  const categoryMenu = req.query.categoryMenu ? Number(req.query.categoryMenu) : 0
  const findObj = categoryMenu ? { userId, "categoryId": categoryMenu } : { userId }
  const allCategories = req.app.get('allCategories')

  CategoryModel.findOne({ "id": categoryMenu })
  .lean()
  .then( obj => {
    if(obj){
      category = lodash.cloneDeep(obj)
    }
  })
  .then(() => {
    return RecordModel.find( findObj )
    .lean()
    .sort({ date: 'desc' })
    .then( records => {
      let totalAmount = 0
      for (const [index, record] of records.entries()){
        totalAmount = totalAmount + record.amount
      }
      res.render("index", { records, allCategories, category, totalAmount})
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
});

module.exports = router
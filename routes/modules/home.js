const express = require('express')
const router = express.Router()
const lodash = require('lodash');

const CategoryModel = require('../../models/category')
const RecordModel = require('../../models/record')

router.get("/", (req, res) => {
  const userId = req.user._id
  let category = {
    "id": 0,
    "name":  "全部"
  }
  const categoryId = req.query.categoryId ? Number(req.query.categoryId) : 0
  const findObj = categoryId ? { userId, categoryId } : { userId }

  CategoryModel.findOne({ "id": categoryId })
  .lean()
  .then( obj => {
    if(obj){
      category = lodash.cloneDeep(obj)
    }
  })
  .then(() => {
    return RecordModel.find( findObj )
    .lean()
    .sort({ date: 'asc' })
    .then( records => {
      let totalAmount = 0
      for (const [index, record] of records.entries()){
        totalAmount = totalAmount + record.amount
      }
      res.render("index", { records, category, totalAmount})
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
  
});

module.exports = router
const express = require('express')
const router = express.Router()

const CategoryModel = require('../../models/category')
const RecordModel = require('../../models/record')

router.get("/", (req, res) => {
  let findObj
  let categoryTitle
  const userId = req.user._id
  const categoryId = req.query.categoryId ? Number(req.query.categoryId) : 0

  console.log("cate:" + categoryId)
  if( categoryId > 0) {
    findObj = { userId, categoryId } 
  } 
  else {
    findObj = { userId }
  }

  CategoryModel.findOne({ "id": categoryId })
  .then( category => {
    category ? categoryTitle = category.name : categoryTitle = "全部"
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
      res.render("index", { records, categoryTitle, totalAmount})
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
  
});

module.exports = router
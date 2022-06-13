const express = require('express')
const router = express.Router()

const RecordModel = require('../../models/record')

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const categoryId = req.query.categoryId ? Number(req.query.categoryId) : 0

  return RecordModel.findOne({ id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/?categoryId=' + categoryId))
    .catch(error => {
      console.log(error)
      res.redirect('/?categoryId=' + categoryId)
    })
})

module.exports = router
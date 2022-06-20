const express = require('express')
const router = express.Router()

const RecordModel = require('../../models/record')

router.get('/new', (req, res) => {
  const allCategories = req.app.get('allCategories')
	return res.render('new', {allCategories})
})

router.post('/new', (req, res) => {
  const allCategories = req.app.get('allCategories')
  const userId = req.user._id
  let maxId = 1;

  const { name, date, categoryId, amount } = req.body
  const errors = []
  if (!name || !date || !categoryId || !amount) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (errors.length) {
    return res.render('new', {allCategories, errors})
  }

  return RecordModel.findOne()
  .sort('-id')
  .lean()
  .then((lastRecord) => {
    if(lastRecord) {
      maxId = Number(lastRecord.id) + 1;
    }
  })
  .then(() => {
    const record = {
      "id": maxId,
      "name": req.body.name,
      "date": req.body.date,
      "categoryId": req.body.categoryId,
      "amount": req.body.amount,
      "userId" : userId
    }

    RecordModel.create(record)     
      .then(() => res.redirect('/')) 
      .catch(error => console.log(error))
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = Number(req.params.id)
  const allCategories = req.app.get('allCategories')

  return RecordModel.findOne({ id, userId })
  .lean()
  .then((record) => {
    const result = allCategories.filter(obj => Number(obj.id) === record.categoryId)
    res.render('edit', { record, allCategories, "category":result[0] })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
})

router.put('/:id/edit', (req, res) => {
  const allCategories = req.app.get('allCategories')
  const userId = req.user._id
  const id = Number(req.params.id)

  const { name, date, categoryId, amount } = req.body
  const errors = []
  if (!name || !date || !categoryId || !amount) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (errors.length) {
    const record = { id, name, date, categoryId, amount}
    const result = allCategories.filter(obj => Number(obj.id) === Number(record.categoryId))

    return  res.render('edit', {
      allCategories,
      errors,
      record, 
      "category":result[0] 
    })
  }

  return RecordModel.findOne({ id, userId })
  .then((record) => {
    record.name = req.body.name
    record.date = req.body.date
    record.categoryId = req.body.categoryId
    record.amount = req.body.amount
    return record.save()
  })
  .then(() => res.redirect('/'))
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })

})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id

  return RecordModel.findOne({ id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

module.exports = router
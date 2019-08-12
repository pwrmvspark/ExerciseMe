const router = require('express').Router()

let Exercise = require('../models/exercise.model')

router.route('/').get((req, res) => {
  Exercise.find()
  .then (exercises => res.json(exercises))
  .catch(err => res.status(400).json('Cannot get exercise info, error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = Date.parse(req.body.date)

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  })

  newExercise.save()
  .then(() => res.json('Exercise has been added!'))
  .catch(err => res.status(400).json('Cannot add exercise, error: ' + err))
})

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Cannot get specific exercise: ' + err))
})

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id) 
  .then(() => res.json('Exercise deleted!'))
  .catch(err => res.status(400).json('Error deleting exercise: ' + err))
})

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    exercise.username = req.body.username
    exercise.description = req.body.description 
    exercise.duration = Number(req.body.duration)
    exercise.data = Date.parse(req.body.date)

    exercise.save()
    .then(() => res.json('Exercise has been udpated!'))
    .catch(err => res.status(400).json('Error saving exercise: ' + err))
  })
  .catch(err => res.status(400).json('Error updating exercise: ' + err))
})

module.exports = router
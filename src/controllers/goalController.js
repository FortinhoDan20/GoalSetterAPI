const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')


const getGoals = asyncHandler(async(req, res) => {

    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt : -1 })

    res.status(200).json(goals)
} )


const setGoal = asyncHandler(async(req, res) => {
  try{
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add text field')
    }
    const goal = new Goal({...req.body, user: req.user._id })

    await goal.save()

    res.status(201).json(goal)
  }catch(e){
    res.status(400).send({ message: e.message })
  }


})

const updateGoal = asyncHandler(async(req, res) => {
  try{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
      res.status(400).json({ message: "Goal not found"} )
    }
    await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  }catch(e){
    res.status(500).json({
      message: e.message
    })
  }
})

const deleteGoal = asyncHandler(async(req, res) => {
  try{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
      res.status(400).json({ message: "Goal not found"} )
    }
    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Updated successfully '})
  }catch(e){
    res.status(400).json({ message: e.message })
  }
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }

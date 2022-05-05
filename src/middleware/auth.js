const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {

  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    req.user = user
    //console.log(req.user._id)
    next()

  }catch(e){
    console.log(e.message)
    res.status(401).json({ message: "Not Authorization"})
  }
})

module.exports = { protect }
